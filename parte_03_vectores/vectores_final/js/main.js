// FROM: https://cesium.com/learn/cesiumjs/ref-doc/GeoJsonDataSource.html?classFilter=GeoJsonDataSource
// const viewer = new Cesium.Viewer('cesiumContainer');

const viewer = new Cesium.Viewer('cesiumContainer',{
  terrain: Cesium.Terrain.fromWorldTerrain(),  // Cargar el terreno global
});

// Ejercicio 1. Cliclovias de Bogotá
viewer.dataSources.add(Cesium.GeoJsonDataSource.load('https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/recreaciondeporte/recreacion/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Meter&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson', {
  clampToGround: true, // Fijar la geometría al terreno
  stroke: Cesium.Color.HOTPINK, // Color de la línea
  strokeWidth: 3 // Grosor de la línea
}));

// Ejercicio 2. Localidades de Bogotá
Cesium.GeoJsonDataSource.load('https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/desarrolloeconomico/poblacioneconomicamenteactiva/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson',
  {
    clampToGround: true, // Fijar la geometría al terreno
  })
  .then((dataSource) => {
    viewer.dataSources.add(dataSource);
    // Cambiar el color de las localidades
    const entities = dataSource.entities.values;
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      entity.polygon.material = Cesium.Color.fromRandom({ alpha: 1 });// asignar un color aleatorio a cada localidad
      entity.polygon.outline = false; // Ocultar el contorno
      // extruir el poligono basado en la Población económicamente activa 2017 - PEA2017
      entity.polygon.extrudedHeight = entity.properties.PEA2017 * 0.1; // Altura de la extrusión
    }
  })

// Volar la cámara a Villanueva Casanare - (4.608313, -72.927871), especificando la longitud, latitud y altura en el método `flyTo`.
// `destination` define las coordenadas en grados, con una altura de 3000 metros sobre el nivel del mar.
// `orientation` controla la dirección de la cámara: `heading` (rotación horizontal) 
// y `pitch` (inclinación hacia abajo)
// 
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-72.927871,4.608313,100000), // Coordenadas en grados
  orientation: {
    heading: Cesium.Math.toRadians(-90.0),  // Dirección hacia el norte
    pitch: Cesium.Math.toRadians(-30.0),  // Ángulo de inclinación de 30 grados hacia abajo
  }
});

