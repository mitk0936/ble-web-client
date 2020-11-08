import hm10 from './hm-10';

const positioningReg = new RegExp(/LA([0-9]{2}.[0-9]*)LO([0-9]{2}.[0-9]+)\|/gm);

let updateViewInterval = null;
let lastFix = null;

const updateView = ({ domContainer }) => {
  const currentTime = parseInt(Date.now() / 1000, 10);

  const fixTime = lastFix ?
    `${Number(currentTime - lastFix)} seconds ago` :
    'no fix';

  domContainer.innerHTML = [
    `<p>BLE Last Fix: ${fixTime}`
  ].join('');
};

export default ({ domContainer, onPosition }) => {
  let buffer = '';

  updateViewInterval = setInterval(() => {
    updateView({ domContainer });
  }, 1000);

  hm10({
    onReading: (str) => {
      buffer = buffer + str;
      buffer = buffer.split(' ').join('');

      const matches = buffer.match(positioningReg);

      if (matches && matches.length > 0) {
        buffer = '';

        matches.forEach((positionStr) => {
          const [whole, lat, lng] = positioningReg.exec(positionStr);

          if (lat && lng) {
            lastFix = parseInt(Date.now() / 1000, 10);
            // bug with NMEA parser on the device
            onPosition({ lat: lng, lng: lat });
          }
        });
      }
    },
    onError: (err) => {
      alert(err);
      window.location.reload();
    },
    onDisconnect: () => {
      alert('Ble disconnected');
      window.location.reload();
    }
  });

  domContainer.innerHTML = '';
};