---
title: "Datos de costos para proveedores de servicios gestionados"
client: "Una empresa de software que ayuda a otras empresas a gestionar sus activos de TI y sus costos en la nube"
summary: "Hice que las organizaciones cliente de los proveedores de servicios gestionados reciban los datos de costos compartidos con ellas, aumentando las organizaciones que los reciben de 45 a 467 en EE. UU."
highlights:
  - "Aumenté las organizaciones que reciben datos de costos compartidos en 31 días de 45 a 467 en EE. UU., de 2 a 32 en Europa y de 10 a 42 en Asia-Pacífico."
  - "Añadí cerca de 390 tablas de costos por organización a lo compartido en tres regiones de producción."
  - "Corregí un paso del pipeline que leía solo la primera organización de una escritura que contenía muchas, aumentando las organizaciones leídas en staging de 68 a 126."
  - "Escribí el diseño de mapeo de columnas, de 3,400 palabras, para mover una exportación de costos de inteligencia de negocios al nuevo pipeline de datos."
---

### El cliente y el problema

El cliente es una empresa de software que ayuda a otras empresas a gestionar sus activos de TI y sus costos en la nube. Algunos de sus clientes son proveedores de servicios gestionados: empresas que administran cuentas en la nube para sus propios clientes. En la plataforma, un proveedor es una organización padre, y pasa parte de su factura de la nube a organizaciones hijas, una por cliente.

El pipeline solo compartía tablas de costos con las organizaciones que tenían sus propios archivos de inventario. Las organizaciones hijas no tenían ninguno, así que quedaban por fuera y no veían datos de costos.

### Lo que construí

- **Investigación.** Rastreé qué organizaciones se compartían y por qué faltaban las organizaciones hijas.
- **Compartir organizaciones hijas.** Cambié el pipeline para compartir los datos de costos de una organización hija cuando su padre tiene inventario.
- **Leer todas las organizaciones.** Una escritura en las tablas de costos puede contener muchas organizaciones. Un paso leía solo la primera, así que las demás nunca se compartían. Hice que las leyera todas.
- **Lanzamiento.** Activé el cambio en las tres regiones de producción el 2026-09-29.
- **Otro trabajo.** Escribí el diseño de mapeo de columnas para mover una exportación de costos de inteligencia de negocios al nuevo pipeline, y un diseño para incorporar una sola factura de AWS para varias cuentas.

### Resultados

- Organizaciones que reciben datos de costos compartidos en 31 días: de 45 a 467 en EE. UU., de 2 a 32 en Europa, de 10 a 42 en Asia-Pacífico.
- Cerca de 390 tablas de costos por organización añadidas a lo compartido.
- Organizaciones leídas de escrituras con varias organizaciones en staging: de 68 a 126.
