export const arrowIcon = {
  path: 'M -1.1500216e-4,0 C 0.281648,0 0.547084,-0.13447 0.718801,-0.36481 l 17.093151,-22.89064 c 0.125766,-0.16746 0.188044,-0.36854 0.188044,-0.56899 0,-0.19797 -0.06107,-0.39532 -0.182601,-0.56215 -0.245484,-0.33555 -0.678404,-0.46068 -1.057513,-0.30629 l -11.318243,4.60303 0,-26.97635 C 5.441639,-47.58228 5.035926,-48 4.534681,-48 l -9.06959,0 c -0.501246,0 -0.906959,0.41772 -0.906959,0.9338 l 0,26.97635 -11.317637,-4.60303 c -0.379109,-0.15439 -0.812031,-0.0286 -1.057515,0.30629 -0.245483,0.33492 -0.244275,0.79809 0.0055,1.13114 L -0.718973,-0.36481 C -0.547255,-0.13509 -0.281818,0 -5.7002158e-5,0 Z',
  strokeColor: 'black',
  strokeOpacity: 1,
  strokeWeight: 1,
  fillColor: '#fefe99',
  fillOpacity: 1,
  rotation: 0,
  scale: 1.0
};

export default ({ domContainer, mapPath, bounds, minzoom, maxzoom }) => {
  const [aCoord, bCoord, cCoord, dCoord] = bounds;

  let map;

  const mapBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(bCoord, aCoord),
      new google.maps.LatLng(dCoord, cCoord));

  const mapMinZoom = minzoom;
  const mapMaxZoom = maxzoom;

  const maptiler = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) { 
        const proj = map.getProjection();
        const z2 = Math.pow(2, zoom);
        const tileXSize = 256 / z2;
        const tileYSize = 256 / z2;
        const tileBounds = new google.maps.LatLngBounds(
            proj.fromPointToLatLng(new google.maps.Point(coord.x * tileXSize, (coord.y + 1) * tileYSize)),
            proj.fromPointToLatLng(new google.maps.Point((coord.x + 1) * tileXSize, coord.y * tileYSize))
        );

        const x = coord.x >= 0 ? coord.x : z2 + coord.x
        const y = coord.y;

        if (mapBounds.intersects(tileBounds) && (mapMinZoom <= zoom) && (zoom <= mapMaxZoom)) {
          return mapPath + '/' + zoom + "/" + x + "/" + y + ".png";
        } else {
          return "https://www.maptiler.com/img/none.png";            
        }
    },
    tileSize: new google.maps.Size(256, 256),
    isPng: true,
    name: "Rendered with MapTiler Desktop <https://www.maptiler.com/desktop/>",
    alt: "Rendered with MapTiler Desktop",

    opacity: 1.0
  });

  const opts = {
    tilt: 0,
    streetViewControl: false,
    center: new google.maps.LatLng(
      bCoord + (dCoord - bCoord) / 2,
      aCoord + (cCoord - aCoord) / 2,
    ),
    zoom: maxzoom
  };

  map = new google.maps.Map(domContainer, opts);
  map.setMapTypeId('satellite');
  map.overlayMapTypes.insertAt(0, maptiler);

  return map;
};