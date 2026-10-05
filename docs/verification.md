# Verificación de JCH 3D

Fecha: 5 de octubre de 2026. Ampliación de dos salones: Encanto y Espejos. Incluye render bajo demanda del editor y esperas de carga independientes de los cuadros de animación.

La ampliación usa las fotografías inventariadas en docs/salon-espejos.md y docs/espejos-reference-audit.json. Se ejecutaron controles reales de la interfaz mediante Playwright y Chromium 131 con WebGL/SwiftShader. El primer recorrido de Espejos también pasó en Chromium 147. Se incluyeron contextos de escritorio y móvil emulado, gestos táctiles y un contexto sin conexión que abrió el HTML descargado desde archivo.

| Suite | Comprobaciones aprobadas |
| --- | ---: |
| Editor, geometría, exportaciones y móvil | 52 |
| Gestos táctiles y teclado | 5 |
| Importaciones de JSON anteriores | 13 |
| Visor compartido y HTML offline | 36 |
| Sillas y organización del evento | 30 |
| Selector, modelo Espejos, datos separados, encuadre y exportación | 38 |
| **Total** | **174** |

Se verificó que el editor no dibuja cuadros en reposo y vuelve a dibujar al cambiar la cubierta. Esto evita trabajo gráfico innecesario cuando se abre la presentación en otra pestaña. Se prueban además pulsaciones cortas con ratón y teclado en el recorrido interior.

No hubo excepciones JavaScript en los flujos válidos de las suites que capturan errores. Se comprobó que nombres con etiquetas HTML se muestran como texto y que los enlaces inválidos presentan un error legible.

Casos centrales: borrar/importar mesas con IDs no consecutivos; cuatro sillas en un lado rectangular; cantidades por lado; mover y rotar una silla; giro del conjunto; arcos circulares; edición global; deshacer/rehacer; restauración de invitados por ID; avisos de exceso de capacidad; respaldo e importación del evento; programa y pagos; enlace inmutable; presentación sin datos operativos; HTML autónomo sin peticiones HTTP; PNG y GLB válidos; recorrido reproducible y con pausa.

Las verificaciones validan esos escenarios, no todos los navegadores o dispositivos físicos. La organización se almacena localmente; no hay sincronización multiusuario. El montaje arquitectónico conserva las aproximaciones indicadas en el editor.

GitHub Actions conserva las pruebas y capturas de cada ejecución. El despliegue de Vercel se vincula a main de M1gu3hb/JCH-3D.

Casos de dos salones: cambio sin pérdida de distribución/administración, recarga del salón activo, evento guardado del otro salón, importación de respaldo entre salones, JSON antiguo sin venue, medidas estimadas ajustables y rechazo atómico de dimensiones inválidas, niveles de mesas/sillas, arrastre elevado, pista de madera, render con techo y reflejos, presentación compartida y HTML offline de Espejos, y encuadre completo del recinto en móvil.
