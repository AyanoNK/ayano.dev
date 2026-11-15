---
title: "Dashboard de costos en la nube"
client: "Una firma global de servicios profesionales y consultoría tecnológica"
summary: "Lideré la creación de un dashboard financiero para una firma global de servicios profesionales y consultoría tecnológica, que muestra 1M USD de gasto en la nube en más de 100 cuentas."
highlights:
  - "Visualicé el inventario y el uso de costos en la nube para 1M USD de gasto en más de 100 cuentas, con filtros y agrupación por etiquetas."
  - "Construí pipelines diarios entre S3 y Databricks usando Python y PySpark, procesando cerca de 1 GB de datos por día."
  - "Mantuve los tiempos de carga del dashboard por debajo de 10 segundos con un backend en Go y un micro frontend en React."
  - "Reduje el tiempo de despliegue de días a horas aprovisionando el pipeline y el backend con Terraform."
---

## El cliente y el problema

El cliente es una firma global de servicios profesionales y consultoría tecnológica. Sus usuarios necesitaban un solo lugar para ver su inventario en la nube y cuánto cuesta, en más de 100 cuentas y 1M USD de gasto en la nube.

## Lo que construí

Lideré la iniciativa desde el descubrimiento del diseño hasta producción.

- **Pipelines de datos.** Construí pipelines que recuperan datos de los entornos en la nube de los usuarios y los cruzan entre S3, donde llegan los datos crudos, y Databricks. Usé Python y PySpark para transformar las dos entradas en tablas bronze, silver y gold, de datos crudos a limpios a listos para el dashboard. Se actualizan a diario y procesan cerca de 1 GB de datos por día.
- **Backend y dashboard.** Desarrollé el servicio backend usando Go para exponer las tablas curadas al frontend, y construí el dashboard usando React como micro frontend, con filtros y agrupación por etiquetas.
- **Infraestructura.** Aprovisioné el pipeline de Databricks y el despliegue del servicio backend usando Terraform como infraestructura como código.

## Resultados

- 1M USD de gasto en la nube en más de 100 cuentas visible en un solo dashboard.
- Tiempos de carga del dashboard por debajo de 10 segundos.
- Tiempo de despliegue reducido de días a horas.
