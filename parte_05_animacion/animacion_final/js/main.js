// GeoJson Editor Online: https://geojson.io/#map=9.54/4.7888/-74.3416
// 3D viewer Online: https://3dviewer.net/
// FROM: https://cesium.com/learn/cesiumjs/ref-doc/JulianDate.html?classFilter=JulianDate
// FROM: https://cesium.com/learn/cesiumjs/ref-doc/Clock.html?classFilter=clock
// FROM: https://cesium.com/learn/cesiumjs/ref-doc/Timeline.html?classFilter=timeline
// FROM: https://cesium.com/learn/cesiumjs/ref-doc/EntityCollection.html


// Inicializa el visor de Cesium en el contenedor HTML con el ID `cesiumContainer`.
const viewer = new Cesium.Viewer("cesiumContainer");


// Establece los límites del tiempo de simulación
// `start` define la fecha y hora de inicio de la simulación (25 de febrero de 2015 a las 16:00).
const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
// `stop` define el tiempo final de la simulación, que es 120 segundos después de `start`.
const stop = Cesium.JulianDate.addSeconds(start, 120, new Cesium.JulianDate());

// Configura el reloj del visor para que comience desde la hora definida en `start`.
viewer.clock.startTime = start.clone();
// Define la hora en que la simulación debe detenerse (120 segundos después de `start`).
viewer.clock.stopTime = stop.clone();
// Establece la hora actual de la simulación a `start`, es decir, la simulación comenzará en este punto temporal.
viewer.clock.currentTime = start.clone();
// Define que el reloj debe volver al inicio (`LOOP_STOP`) cuando alcance el tiempo final, en lugar de detenerse o avanzar.
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
// Define la velocidad de la simulación, en este caso, 1 segundo del reloj simulado es igual a 1 segundo real.
viewer.clock.multiplier = 1;
// Establece que el reloj debe animarse automáticamente.
viewer.clock.shouldAnimate = true;
// Ajusta la línea de tiempo del visor para que cubra el intervalo entre `start` y `stop`.
viewer.timeline.zoomTo(start, stop);

// Define la primera posición geográfica (Bogotá) 
// `fromDegrees` convierte las coordenadas geográficas (longitud, latitud) en un vector cartesiano 3D utilizado por Cesium.
const pos1 = Cesium.Cartesian3.fromDegrees(-74.079269, 4.634728);
// Define la segunda posición geográfica (Bogotá), que será el destino del objeto en movimiento.
const pos2 = Cesium.Cartesian3.fromDegrees(-74.067803, 4.632570);
// Crea una propiedad de posición muestreada (SampledPositionProperty), que permite definir la trayectoria del objeto
// a lo largo del tiempo. Este objeto será usado para interpolar entre múltiples posiciones.
const position = new Cesium.SampledPositionProperty();
// Agrega una muestra de la posición inicial al objeto `position`, en el tiempo `start`.
position.addSample(start, pos1);
// Agrega una muestra de la posición final al objeto `position`, en el tiempo `stop`.
// Cesium interpolará entre estas posiciones para crear un movimiento suave del objeto.
position.addSample(stop, pos2);

// Añade una entidad (el objeto 3D) al visor. Este objeto será visible y estará disponible
// durante el intervalo de tiempo definido por `start` y `stop`.
const entity = viewer.entities.add({
  // Define la disponibilidad de la entidad, es decir, durante qué periodo de tiempo estará presente.
  availability: new Cesium.TimeIntervalCollection([
    new Cesium.TimeInterval({ start: start, stop: stop }),
  ]),
  
  // Especifica el modelo 3D que se va a utilizar (en este caso, un camión de leche de ejemplo).
  model: {
    uri: "3d_model/CesiumMilkTruck.glb", // Ruta al archivo del modelo 3D.
    minimumPixelSize: 40, // Tamaño mínimo del modelo en pantalla (en píxeles).
  },
  
  // Define una vista predeterminada desde la cual seguir la entidad (en este caso, 100 metros detrás del objeto).
  viewFrom: new Cesium.Cartesian3(-100.0, 0.0, 70.0),
  
  // Establece la propiedad de posición para la entidad, que se moverá a lo largo de la trayectoria definida en `position`.
  position: position,
  
  // Define la orientación de la entidad en función de su velocidad, de modo que el objeto mire hacia la dirección
  // en la que se está moviendo.
  orientation: new Cesium.VelocityOrientationProperty(position),
});

// Establece el seguimiento de la entidad en movimiento, es decir, la cámara del visor seguirá al objeto 3D durante su movimiento.
viewer.trackedEntity = entity;
