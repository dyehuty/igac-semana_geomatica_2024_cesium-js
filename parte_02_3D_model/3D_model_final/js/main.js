import { geoJsonArboles } from './coordenadas.js';
import { createModel } from './funciones.js';

// Inicializar el visor de Cesium en el elemento HTML con el ID `cesiumContainer`.
// Se pasa como segundo parámetro un objeto de configuración, en este caso especificando
// que se utilice el terreno global de Cesium (World Terrain).
const viewer = new Cesium.Viewer('cesiumContainer');
//Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwYjk3YjExMi1kOTNiLTRlZTEtYjViYi1jYzBlZmEyNDc2M2EiLCJpZCI6MTkxNTA0LCJpYXQiOjE3MTA2NzE0OTR9.wsqpfLYl8M3mNIw3j__yiru6cEUXno_EyXq8Cyt7jLU';
// Crear un modelo 3D para cada árbol en el GeoJSON
const url = '3d_models/fox.glb';
geoJsonArboles.features.forEach((feature) => {
  const coords = feature.geometry.coordinates;
  createModel(viewer, url, coords[0], coords[1], 0);
});


viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-74.074688,4.637823,3000), // Coordenadas en grados
  orientation: {
    heading: Cesium.Math.toRadians(-90.0),  // Dirección hacia el norte
    pitch: Cesium.Math.toRadians(-30.0),  // Ángulo de inclinación de 30 grados hacia abajo
  }
});

