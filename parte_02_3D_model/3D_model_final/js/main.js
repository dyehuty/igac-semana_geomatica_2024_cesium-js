import { geoJsonArboles } from './coordenadas.js';
import { createModel } from './funciones.js';
// FROM: https://cesium.com/learn/cesiumjs/ref-doc/Cartesian3.html?classFilter=Cartesian3
//Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3MDlhZTgyYi0yYThlLTQwZjMtYTJjOS1kNWI1NTUzZDllMjUiLCJpZCI6MjQ2MzkyLCJpYXQiOjE3MjgyOTk0MTZ9.t_U2w7IepkCqkfUfKEevoDSJPIZeBUBdEmTXkP8kaf8';
// Inicializar el visor de Cesium en el elemento HTML con el ID `cesiumContainer`.
// Se pasa como segundo parámetro un objeto de configuración, en este caso especificando
// que se utilice el terreno global de Cesium (World Terrain).
const viewer = new Cesium.Viewer('cesiumContainer',{
  terrain: Cesium.Terrain.fromWorldTerrain(),  // Cargar el terreno global
});

// Crear un modelo 3D para cada árbol en el GeoJSON
const url = '3d_models/fox.glb';
geoJsonArboles.features.forEach((feature) => {
  const coords = feature.geometry.coordinates;
  createModel(viewer, url, coords[0], coords[1], 2570);
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

