// Inicializar el visor de Cesium en el elemento HTML con el ID `cesiumContainer`.
// Se pasa como segundo parámetro un objeto de configuración, en este caso especificando
// que se utilice el terreno global de Cesium (World Terrain).
const viewer = new Cesium.Viewer('cesiumContainer',{
  terrain: Cesium.Terrain.fromWorldTerrain(),  // Cargar el terreno global
});


  // Agrega una entidad de caja 3D al visor de Cesium
  viewer.entities.add({
    // Nombre de la entidad
    name: 'Caja 3D',
    // Posición de la entidad en coordenadas geográficas (longitud, latitud, altura por encima del elipsoide)
    position: Cesium.Cartesian3.fromDegrees(-74.074688, 4.637823, 2595),
    // Definición de la caja
    box: {
      // Dimensiones de la caja (x, y, z)
      dimensions: new Cesium.Cartesian3(50.0, 50.0, 30.0),
      // Material de la caja (color azul)
      material: Cesium.Color.BLUE
    }
  }); 


viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-74.074688,4.637823,3000), // Coordenadas en grados
  orientation: {
    heading: Cesium.Math.toRadians(-90.0),  // Dirección hacia el norte
    pitch: Cesium.Math.toRadians(-30.0),  // Ángulo de inclinación de 30 grados hacia abajo
  }
});

