// FROM: https://cesium.com/learn/cesiumjs/ref-doc/ImageryLayer.html?classFilter=ImageryLayer
// FROM: https://cesium.com/learn/cesiumjs/ref-doc/WebMapServiceImageryProvider.html?classFilter=webmap

// Crear una instancia del visor de Cesium dentro del contenedor HTML con el ID 'cesiumContainer'
const viewer = new Cesium.Viewer('cesiumContainer', {
  // Configurar la capa base del visor utilizando imágenes del mundo de Cesium con etiquetas aéreas
  baseLayer: Cesium.ImageryLayer.fromWorldImagery({
    style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
  }),
  // Desactivar el selector de capa base para que los usuarios no puedan cambiar la capa base
  baseLayerPicker: false,
});

// =========== Adicionar servicio WMS Ortofoto Bogotá
// Crear una nueva capa de imágenes utilizando un proveedor de imágenes de servicio de mapas web (WMS)
const layerOrtofotoBogota = new Cesium.ImageryLayer(
  new Cesium.WebMapServiceImageryProvider({
    // URL del servicio WMS que proporciona la ortofoto de Bogotá
    url: "https://serviciosgis.catastrobogota.gov.co/arcgis/services/imagenes/Ortho2017/MapServer/WMSServer",
    // Especificar la capa a utilizar del servicio WMS
    layers: "0",
    // Configurar parámetros adicionales para el proveedor de imágenes WMS
    parameters: {
      // Hacer que las imágenes sean transparentes
      transparent: true,
      // Formato de la imagen a utilizar
      format: "image/png",
    },
  }),
);
// Añadir la capa de ortofoto de Bogotá a la colección de capas de imágenes del visor
viewer.imageryLayers.add(layerOrtofotoBogota);

// =========== Adicionar una imagen estática y tamaño fijo
// Añadir una entidad de cartelera (billboard) al visor
viewer.entities.add({
  // Especificar la posición de la cartelera en coordenadas geográficas (longitud, latitud)
  position: Cesium.Cartesian3.fromDegrees(-75.59777, 4.03883),
  // Configurar la imagen de la cartelera
  billboard: {
    // Ruta de la imagen a mostrar en la cartelera
    image: "assets/banner_semana_geomatica_2024.png",
    // Ancho de la cartelera en píxeles
    width: 100,
    // Altura de la cartelera en píxeles
    height: 49,
  },
});


// =========== Adicionar una imagen estática con recorte geográfico
// Definir un rectángulo que especifica los límites geográficos donde se mostrará la imagen estática
const defaultImageryLayerCutout = Cesium.Rectangle.fromDegrees(
  -74.2880766101149,  // Oeste (longitud mínima)
  4.867255730919226,  // Sur (latitud mínima)
  -73.75002786968979, // Este (longitud máxima)
  5.101980593438881   // Norte (latitud máxima)
);

// Crear una capa de imágenes a partir de un proveedor de imágenes de un solo mosaico (SingleTileImageryProvider)
const logo = Cesium.ImageryLayer.fromProviderAsync(
  Cesium.SingleTileImageryProvider.fromUrl("assets/banner_semana_geomatica_2024.png", {
    // Especificar el rectángulo donde se mostrará la imagen
    rectangle: defaultImageryLayerCutout,
  }),
);
// Añadir la capa de imagen estática (logo) a la colección de capas de imágenes del visor
viewer.imageryLayers.add(logo);