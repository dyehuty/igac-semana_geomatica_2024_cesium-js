// GeoJson Editor Online: https://geojson.io/#map=9.54/4.7888/-74.3416
// FROM: https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html?classFilter=ImageryLayer
// FROM: https://cesium.com/learn/cesiumjs/ref-doc/WebMapServiceImageryProvider.html?classFilter=webmap

const viewer = new Cesium.Viewer('cesiumContainer',{
  terrain: Cesium.Terrain.fromWorldTerrain(),  // Cargar el terreno global
});



