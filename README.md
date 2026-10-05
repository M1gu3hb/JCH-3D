# JCH 3D

Estudio de eventos de Jardines Club Hípico. Proyecto de **Miguel Huerta Bautista (@M1gu3hb)**.

Editor: https://jch3d.vercel.app/ · Propuesta: https://jch3d.vercel.app/presentacion/

## Diseñar y organizar

- Salón Encanto a escala: pista móvil de 7.30 × 5 m, escenario izquierdo de 20 × 3 m, rampa, acceso tipo trajinera y texturas de pasto sintético y mural.
- Mesas redondas, rectangulares y cuadradas. Tamaño, altura, giro, mantel y sillas Tiffany editables individualmente, al crearlas o en todas a la vez.
- Numeración M1…MN según las mesas presentes. Los IDs internos se conservan para importaciones, deshacer y asignaciones.
- Sillas alrededor, en un lado, dos lados opuestos o con cantidades por lado. Arcos circulares. Posición X/fondo y giro de cada silla mediante selector y diagrama.
- Arrastre de mesas y pista, navegación con ratón y dos dedos, planta, entrada, cotas y avisos de cruces de huellas.
- Deshacer/rehacer, duplicar, PNG, GLB, JSON y lista CSV.
- Invitados por grupo, confirmaciones, asignación a lugares libres, exceso de capacidad, buscador, CSV y lista para imprimir/PDF.
- Programa y pendientes con hora, presupuesto con pagos, invitados esperados y notas de montaje.
- Mis eventos y respaldo completo para llevar distribución y organización a otro dispositivo.

## Presentaciones

**Compartir** crea una instantánea del montaje. El visor muestra esa versión aunque posteriormente se edite la distribución. Conserva posiciones manuales, números, luces, sombras y texturas. Invitados, notas y presupuesto **no se incluyen** en el enlace.

El enlace codifica datos validados y comprimidos en el fragmento #jch=…; no requiere base de datos ni transmite ese fragmento al servidor. Se limita el tamaño descomprimido y del enlace. Para montajes demasiado grandes, usa el visor HTML.

**Descargar visor HTML offline** incorpora Three.js, GLB, texturas, estilos y controles en un archivo. Se abre sin solicitudes de red. Incluye zoom, vistas, luz, sombras, corte horizontal, recorrido automático, navegación interior, captura y descarga GLB. Las animaciones respetan movimiento reducido.

El visor web guarda recursos visitados mediante service worker para reabrirlos cuando estén en caché. Para una entrega offline completa utiliza el HTML autónomo.

## Datos y compatibilidad

Eventos y organización se guardan **en este navegador/dispositivo**. Actualmente no hay sincronización multiusuario ni servidor de invitados. Descarga respaldos para conservarlos y transferirlos. Se mantiene la clave anterior salon-encanto-maqueta-v1.

Se importan JSON anteriores de Encanto3D. La distribución mantiene version: 1; los campos nuevos de sillas son opcionales. El respaldo añade _jch con metadatos y organización. Las versiones anteriores recuperan la distribución compatible, pero no conocen los ajustes nuevos.

La propuesta original tiene **23 mesas y 226 sillas**. El GLB y sus texturas se conservan íntegros en public/assets/models/encanto-propuesta.glb.gz. Extracción: gzip -dk public/assets/models/encanto-propuesta.glb.gz. El JSON editable está junto al modelo. **Abrir propuesta en el editor** carga ese montaje.

Las dimensiones principales provienen del encargo. Alturas, rampa, cubierta, acceso y posiciones arquitectónicas aproximan las fotografías; el modelo no sustituye un levantamiento.

## Desarrollo y pruebas

Requiere Node.js 22 o superior.

1. npm ci
2. npm run dev
3. Abre http://localhost:4173/

Se usa JavaScript y Three.js locales, sin CDN durante la ejecución. El build es un script de Node.

Verificación:

1. npm run check
2. npm run build
3. npx playwright install --with-deps chromium
4. npm test

Las pruebas levantan su servidor y verifican WebGL, controles, gestos, JSON anteriores, presentaciones compartidas, HTML offline y organización. CHROMIUM_PATH permite usar otro Chromium instalado. Reportes y capturas: artifacts/. GitHub Actions ejecuta la misma secuencia en cada push y PR.

Vercel construye dist/ con npm run build; vercel.json configura cabeceras y caché. Rama de producción: main de M1gu3hb/JCH-3D.

## Estructura y expansión

| Ruta | Responsabilidad |
| --- | --- |
| src/model.js | Validación, geometría compartida, Tiffany, números y GLB |
| src/editor.js | Selección, edición, movimientos, colisiones y persistencia |
| src/editor-ui.js | Eventos guardados, historial, metadatos y compartir |
| src/event-tools.js | Sillas y organización |
| src/share.js | Codec y generador HTML autónomo |
| src/viewer.* | Presentación, luces y recorrido |
| scripts/ | Build y servidor |
| public/assets/ | Three.js, modelo y texturas |
| docs/editor-original.html | Editor anterior íntegro de producción |
| docs/editor-legacy-v1.html | Versión inicial para pruebas |
| tests/ | Regresión y flujos con Playwright |

Para otro salón incorpora constructor y esquema por venue, añade selector y extiende la validación. No se incluyen recintos aún sin modelar. Mantén la geometría compartida entre editor, GLB y presentación.

Three.js conserva su licencia MIT. Modelo y fotografías son los recursos proporcionados para este proyecto. Véase THIRD_PARTY_NOTICES.md.
