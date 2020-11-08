const MAX_SECONDS_THRESHOLD = 10;

const gpsAveraging = ({ onCalculated }) => {
  let locationEntries = [];

  const __findAveragePosition = () => {
    const now = parseInt(+new Date() / 1000, 10);
    
    locationEntries = locationEntries.filter(({ time }) => Boolean(
      now - MAX_SECONDS_THRESHOLD < time
    ));

    if (locationEntries.length > 0) {
      let sumLat = 0;
      let sumLng = 0;

      locationEntries.forEach(({ lat, lng }) => {
        sumLat = sumLat + lat;
        sumLng = sumLng + lng;
      });

      onCalculated({
        lat: sumLat / locationEntries.length,
        lng: sumLng / locationEntries.length
      });
    }
  };

  const __feed = ({ lat, lng }) => {
    console.log('Feed', {lat,lng});
    if (!lat || !lng) {
      console.error('Missing coordinates', { lat, lng });
      return;
    }

    locationEntries.push({ lat, lng, time: parseInt(+new Date() / 1000, 10) });
    __findAveragePosition();
  };

  return {
    feed: ({ lat, lng }) => {
      __feed({ lat, lng });
      __findAveragePosition();
    }
  };
};

export default gpsAveraging;