# Salón de los Espejos

Reconstrucción del 5 de octubre de 2026 basada en el repositorio público de la misma cuenta: [M1gu3hb/jardines-club-hipico](https://github.com/M1gu3hb/jardines-club-hipico).

Se revisaron las 209 imágenes originales del catálogo mediante hojas de contacto, las 20 fotos asociadas al salón en `src/data/site-data.json`, 45 candidatos adicionales a resolución original y 24 fotogramas de sus dos videos. `espejos-reference-audit.json` registra rutas y hashes de los originales consultados. Las variantes de resolución del sitio son derivados de esas mismas fotos.

## Elementos observados y representados

| Referencias | Detalle |
| --- | --- |
| GqNFCgG, q5hBmrM, bzohmTK, LrtwYEZ | Muro lateral de espejos, zócalo y cornisa curva de madera, friso de cascadas y plantas |
| GqNFCgG, q5hBmrM, LrtwYEZ, OoMjnAm | Columnas con revestimiento de espejo, madera, pantallas y luminarias |
| bzohmTK, LrtwYEZ, XTHL647, q5hBmrM | Loseta clara en nivel elevado, madera inferior y acceso mediante peldaños |
| 9JCYX0D, q5hBmrM, WJxhev8, DC5DttY | Ventanales, cortinas blancas recogidas, alfombra y muebles lounge |
| YVHuwPU, OVVYNcO | Arco blanco interior y escalera a su derecha |
| WPHVZ6S, 1RPrf68, oz3NIjf, xa0MONI | Barra, estantes, botellas y celosías decorativas de ramas |
| LYb2wYX, 9JCYX0D, IxvKC6G | Escenario junto a ventanales y equipos de sonido |

La orientación adoptada mira desde el arco hacia el salón: espejos a la derecha, ventanas y zona de madera a la izquierda. El modelo organiza las vistas en un recinto consistente, sin copiar montajes o personas de un evento concreto.

Los acabados de madera, piedra y cascadas se muestrean de GqNFCgG, fotografía del mismo sitio. El emblema del arco usa el logotipo real aMxWuH8 del sitio. Loseta, parquet, cortinas, celosías y mobiliario se generan en geometría y texturas locales. Los reflejos usan una captura del entorno del modelo; son aproximados, no un cálculo óptico de cada espejo plano.

## Escala pendiente de confirmar

El repositorio del sitio dice expresamente que no hay metros cuadrados ni medidas de pistas por espacio (`rediseño-sitio-web/15-PREGUNTAS-ABIERTAS.md`, «NINGUNA MEDIDA»). No se han inferido medidas confirmadas a partir de la capacidad comercial del salón.

La base inicial de Espejos es **16 × 28 m**, con pista **5.8 × 12 m**, exclusivamente como proporciones estimadas para editar. Ancho y fondo del salón, ancho y largo de la pista son ajustables en el panel Espacio. Los niveles iniciales de 0.40 m y 0.65 m, alturas, columnas y posiciones arquitectónicas también son aproximaciones visuales. Hace falta un levantamiento para cerrar un montaje a escala exacta. Esta condición aparece en la interfaz y en los metadatos del GLB.

La propuesta de ejemplo contiene 21 mesas y 210 sillas Tiffany; no constituye una capacidad máxima ni un montaje aprobado del salón.

## Datos entre salones

Se conserva `version: 1`. Los JSON antiguos sin `venue` siguen siendo Encanto. Espejos añade `venue: "espejos"`, `hallW`, `hallD`, `floorW`, `floorD`. Validación, cámara, colisiones, alturas de mobiliario, pista y exportación consultan las mismas métricas del salón.

El selector guarda y recupera distribuciones por salón. Metadatos y administración tienen claves independientes. Mis eventos puede contener ambos salones. Los enlaces de presentación y el HTML autónomo transportan el salón correcto, texturas y materiales; invitados y presupuesto quedan fuera de la presentación pública.
