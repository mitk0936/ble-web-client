import gpsControl from './gps';
import deviceGps from './gps/device';
import gpsAveraging from './gps/gps-averaging';
import mapControl, { arrowIcon } from './map';

window.onload = function() {
  let map = null;
  let bleMarker = null;
  let deviceMarker = null;
  let prognosisMarker = null;
  let deviceAccuracyCircle = null;

  const mapSelect = document.getElementById('map-select');
  const loadButton = document.getElementById('load-button');
  const bleButton = document.getElementById('ble-start-button');
  
  STATIC_MAPS_FOLDERS.forEach((mapName) => {
  	const option = document.createElement("option");
    option.value = mapName;
    option.text = mapName;
    mapSelect.appendChild(option);
  });

  const { feed } = gpsAveraging({
    onCalculated: ({ lat, lng }) => {
      if (!map) {
        return;
      }

      if (!prognosisMarker) {
        prognosisMarker = new google.maps.Marker({ map, icon: { ...arrowIcon, fillColor: '#ff0000'} });
      }
      
      prognosisMarker.setPosition({ lat, lng });
    }
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
        feed({ lat, lng });

        if (!map) {
          return;
        }

        if (!bleMarker) {
          bleMarker = new google.maps.Marker({ map, icon: { ...arrowIcon, fillColor: '#3944bc'} });
        }
        
        bleMarker.setPosition({ lat: Number(lat), lng: Number(lng) });
      }
    });
  }

  deviceGps({
    onSuccess: ({ coords: { latitude: lat, longitude: lng, accuracy: acc } }) => {

      feed({ lat, lng });

      if (!map) {
        return;
      }

      if (!deviceMarker) {
        deviceMarker = new google.maps.Marker({ map, icon: arrowIcon });
      }

      if (!deviceAccuracyCircle) {
        deviceAccuracyCircle = new google.maps.Circle({
          strokeColor: "#fefe99",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#fefe99",
          fillOpacity: 0.1,
          map
        });

      }

      deviceAccuracyCircle.setCenter({ lat, lng });
      deviceAccuracyCircle.setRadius(acc);

      deviceMarker.setPosition({ lat, lng });
    },
    onError: err => alert(`Error: ${err.code || err.message}`)
  })
};