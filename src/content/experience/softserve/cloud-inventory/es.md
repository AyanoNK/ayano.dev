---
title: "Inventario en la nube y dashboard de costos"
client: "Una empresa de software que ayuda a otras empresas a gestionar sus activos de TI y sus costos en la nube"
summary: "Lideré un nuevo producto de inventario en la nube desde el descubrimiento hasta el lanzamiento: un dashboard que lista los recursos en la nube de una empresa con su costo, y muestra 1M USD de gasto en la nube en más de 100 cuentas."
highlights:
  - "Lideré un nuevo producto de inventario en la nube desde el descubrimiento y la especificación de diseño de la UI hasta tres páginas lanzadas, que muestran 1M USD de gasto en la nube en más de 100 cuentas."
  - "Diseñé las tablas del pipeline (9 para AWS, 12 con Azure) y construí pipelines diarios entre S3 y Databricks con Python y PySpark, procesando cerca de 1 GB de datos por día."
  - "Mantuve los tiempos de carga del dashboard por debajo de 10 segundos con un backend en Go y un micro frontend en React."
  - "Reduje el tiempo de despliegue de días a horas aprovisionando el pipeline y el backend con Terraform."
  - "Añadí cerca de 680 pruebas y lancé la exportación a CSV, una segunda API de filtros y el inventario para organizaciones hijas en tres regiones de producción."
---

### El cliente y el problema

El cliente es una empresa de software que ayuda a otras empresas a gestionar sus activos de TI y sus costos en la nube. Sus usuarios necesitaban un solo lugar para ver sus recursos en la nube y cuánto cuesta cada uno, en más de 100 cuentas y 1M USD de gasto en la nube.

### Lo que construí

Lideré el producto desde el primer trabajo de descubrimiento hasta producción, y escribí los diseños y los tickets con los que otros ingenieros construyeron.

- **Descubrimiento.** Elegí el diseño de tres páginas, listé los campos que necesita cada servicio en la nube y escribí la especificación de diseño de la UI. Una revisión de cobertura mostró que 39 de los 88 campos que necesitan los reportes estaban en los datos recolectados (44%). Nombré una fuente de API para cada campo faltante.
- **Pipelines de datos.** Diseñé las tablas bronze, silver y gold, de datos crudos a limpios a listos para el dashboard: 9 tablas finales para AWS, 12 con Azure. Cada ejecución diaria reemplaza solo el día de una organización, así que volver a ejecutarla es seguro. Los pipelines cruzan los datos crudos en S3 con Databricks usando Python y PySpark, se actualizan a diario y procesan cerca de 1 GB de datos por día.
- **Backend y API.** Desarrollé el backend en Go que expone las tablas finales, con rangos de fechas, agrupación y filtros. La API pública tiene hoy 17 métodos y cubre 12 tipos de servicio (10 de AWS, 2 de Azure). La segunda versión de la API de filtros salió en tres regiones de producción el 2026-09-22.
- **Dashboard.** Construí las tres páginas como un micro frontend en React: un resumen, una tabla por servicio y una página de detalle por recurso, con filtros y fechas que se mantienen entre ellas. Salieron el 2026-08-27.
- **Proveedores de servicios gestionados.** Las organizaciones hijas de los proveedores veían una página vacía. Las pasé por el pipeline, y el inventario llegó a 59 organizaciones hijas el 2026-10-06.
- **Exportación a CSV y filtros guardados.** Diseñé la exportación a CSV: un enlace de descarga válido por 5 minutos, que se puede volver a descargar durante 24 horas. Construí su almacenamiento y su API, y se lanzó el 2026-11-04. También diseñé los filtros guardados y construí la primera parte.
- **Menor costo del pipeline.** Diseñé y construí una configuración que ejecuta el pipeline para varias organizaciones en un solo clúster compartido de Databricks, con un pronóstico de reducir el costo de cómputo del pipeline entre un 67 y un 83%. Aún no está activada en producción.
- **Infraestructura.** Aprovisioné el pipeline de Databricks y el despliegue del backend con Terraform.

### Resultados

- 1M USD de gasto en la nube en más de 100 cuentas visible en un solo dashboard.
- Tiempos de carga del dashboard por debajo de 10 segundos.
- Tiempo de despliegue reducido de días a horas.
- Cerca de 680 pruebas añadidas.
- Lanzado en tres regiones de producción: el dashboard, una segunda API de filtros, el inventario para organizaciones hijas y la exportación a CSV.
