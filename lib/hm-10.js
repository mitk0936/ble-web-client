const hm10 = function ({ onDisconnect }) {
  // validate if BLE allowed
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder("utf-8");

  const rxTxServiceId = '0000ffe0-0000-1000-8000-00805f9b34fb';
  const characteristicId = '0000ffe1-0000-1000-8000-00805f9b34fb';

  let service, characteristic;

  return function requestDevice() {
    return navigator.bluetooth.requestDevice({
      filters: [{
        services: [rxTxServiceId]
      }]
    }).then(device => device.gatt.connect()).then(server => server.getPrimaryService(rxTxServiceId)).then(service => service.getCharacteristic(characteristicId)).then(characteristic => {
      return {
        write: function (data) {
          characteristic.writeValue(encoder.encode(data));
        },
        subscribe: function (onMessage) {
          characteristic.startNotifications().then(char => {
            char.addEventListener('characteristicvaluechanged', response => {
              console.log(response.currentTarget.value.byteLength);

              onMessage(decoder.decode(response.currentTarget.value));
            });
          });
        }
      };
      console.log('Notifications have been started.');
    }).catch(err => alert(err));
  };
};

export default hm10;