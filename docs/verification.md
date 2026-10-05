# Verificación de JCH 3D

Fecha: 5 de octubre de 2026. Revisión de rendimiento: `b9b783d`. Incluye render bajo demanda del editor y esperas de carga independientes de los cuadros de animación.

Se ejecutaron controles reales de la interfaz mediante Playwright y Chromium 131 con WebGL/SwiftShader. Se incluyeron contextos de escritorio y móvil emulado, gestos táctiles y un contexto sin conexión que abrió el HTML descargado desde archivo.

| Suite | Comprobaciones aprobadas |
| --- | ---: |
| Editor, geometría, exportaciones y móvil | 52 |
| Gestos táctiles y teclado | 5 |
| Importaciones de JSON anteriores | 13 |
| Visor compartido y HTML offline | 35 |
| Sillas y organización del evento | 30 |
| **Total** | **135** |

Se verificó que el editor no dibuja cuadros en reposo y vuelve a dibujar al cambiar la cubierta. Esto evita trabajo gráfico innecesario cuando se abre la presentación en otra pestaña.

No hubo excepciones JavaScript en los flujos válidos de las suites que capturan errores. Se comprobó que nombres con etiquetas HTML se muestran como texto y que los enlaces inválidos presentan un error legible.

Casos centrales: borrar/importar mesas con IDs no consecutivos; cuatro sillas en un lado rectangular; cantidades por lado; mover y rotar una silla; giro del conjunto; arcos circulares; edición global; deshacer/rehacer; restauración de invitados por ID; avisos de exceso de capacidad; respaldo e importación del evento; programa y pagos; enlace inmutable; presentación sin datos operativos; HTML autónomo sin peticiones HTTP; PNG y GLB válidos; recorrido reproducible y con pausa.

Las verificaciones validan esos escenarios, no todos los navegadores o dispositivos físicos. La organización se almacena localmente; no hay sincronización multiusuario. El montaje arquitectónico conserva las aproximaciones indicadas en el editor.

GitHub Actions conserva las pruebas y capturas de cada ejecución. El despliegue de Vercel se vincula a main de M1gu3hb/JCH-3D.
