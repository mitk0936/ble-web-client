import gpsControl from './gps';
import mapControl, { arrowIcon } from './map';

console.log(STATIC_MAPS_FOLDERS);

window.onload = function() {
  let map = null;
  let bleMarker = null;

  const mapSelect = document.getElementById('map-select');
  const loadButton = document.getElementById('load-button');
  const bleButton = document.getElementById('ble-start-button');
  
  STATIC_MAPS_FOLDERS.forEach((mapName) => {
  	const option = document.createElement("option");
    option.value = mapName;
    option.text = mapName;
    mapSelect.appendChild(option);
  });

  loadButton.onclick = function () {
    const mapPath = `/maps/${mapSelect.value}`;

    fetch(`${mapPath}/metadata.json`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('map').innerHTML = '';

        map = mapControl({
          domContainer: document.getElementById('map'),
          mapPath,
          bounds: data.bounds,
          minzoom: parseInt(data.minzoom, 10),
          maxzoom: parseInt(data.maxzoom, 10)
        });

        
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to load map metadata');
      });
  }

  bleButton.onclick = function () {
    gpsControl({
      domContainer: document.getElementById('gps'),
      onPosition: ({ lat, lng }) => {
        if (!map) {
          return;
        }

        if (!bleMarker) {
          bleMarker = new google.maps.Marker({ map, icon: { ...arrowIcon, fillColor: '#3944bc'} });
        }
        
        bleMarker.setPosition({ lat: Number(lng), lng: Number(lat) });
      }
    });
  }
};