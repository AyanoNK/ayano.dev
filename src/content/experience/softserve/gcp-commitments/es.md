---
title: "Herramientas para compromisos de Google Cloud"
client: "Una empresa de software que ayuda a otras empresas a gestionar sus activos de TI y sus costos en la nube"
summary: "Construí herramientas que ayudan a las empresas a comprar compromisos de Google Cloud y seguir sus ahorros, identificando reducciones de costos potenciales de hasta un 30% y escribiendo cerca del 65% de los cambios de código del pipeline principal del equipo."
highlights:
  - "Identifiqué reducciones de costos potenciales de hasta un 30% con un pipeline que predice los ahorros de comprar Committed Use Discounts de Google Cloud."
  - "Construí la primera API que compra compromisos de Google Cloud, con inicio de sesión de Google sin llaves, en 36 regiones."
  - "Reduje 8 veces el límite de memoria de un cálculo de costos, de 32 GiB a 4 GiB, moviéndolo de Python a BigQuery."
  - "Construí los cálculos para la nueva exportación de facturación de Google, obligatoria desde enero de 2026, con resultados iguales a los anteriores con una diferencia máxima de 0.001."
  - "Escribí cerca del 65% de los cambios de código del pipeline principal de Airflow del equipo durante diez meses."
---

### El cliente y el problema

El cliente es una empresa de software que ayuda a otras empresas a gestionar sus activos de TI y sus costos en la nube. Google Cloud ofrece Committed Use Discounts: una empresa se compromete a un nivel de uso por uno o tres años y paga menos por él. Los clientes de la empresa necesitaban ayuda para decidir cuánto comprometer, comprar los compromisos y ver cuánto ahorraban.

### Lo que construí

- **Predicción de ahorros.** Fui responsable de crear un pipeline que predice los ahorros potenciales de comprar Committed Use Discounts, usando las exportaciones de facturación y las recomendaciones de Google Cloud para la ingeniería de datos y el modelado predictivo.
- **Compra de compromisos.** Investigué cómo comprar compromisos con la API de Google y construí la primera API de compra, con inicio de sesión de Google sin llaves y soporte para 36 regiones. Mis compañeros construyeron después sobre ella la compra por gasto, la división, la unión y la extensión. También corregí tipos de máquina y regiones que no se podían comprar.
- **Ahorros diarios.** Construí el cálculo diario de costos y ahorros por compromiso y la carga de sus resultados a la base de datos. Cuando un mes completo de facturación se quedaba sin memoria en un worker de 16 GiB, lo cambié para procesar un día a la vez.
- **Nueva exportación de facturación de Google.** Google hizo obligatorio un nuevo formato de exportación de facturación en enero de 2026. Coescribí el diseño, separé los dos tipos de cálculo de descuentos y añadí los cálculos para el nuevo formato, con resultados iguales a los anteriores con una diferencia máxima de 0.001.
- **Menos memoria.** Para diciembre de 2025, un cálculo de costos escrito en Python con Polars necesitaba un límite de 32 GiB en una máquina propia. Lo moví a BigQuery y eliminé cerca de 1,000 líneas. Ahora corre con 4 GiB en máquinas compartidas.
- **Detalles de los compromisos.** Escribí el diseño y los tickets para cargar los detalles de los compromisos en la plataforma, y construí cuatro de los cinco tickets.
- **Correcciones en producción.** Corregí dos versiones del pipeline que reportaban totales de facturación distintos para el mismo mes, corregí fallas de carga para todos los clientes y limité los trabajos de producción a los clientes que pagan para ahorrar cómputo.

### Resultados

- Reducciones de costos potenciales de hasta un 30% identificadas con Committed Use Discounts.
- Los compromisos se pueden comprar mediante una API en 36 regiones.
- Límite de memoria de un cálculo de costos reducido 8 veces, de 32 GiB a 4 GiB.
- La nueva exportación de facturación coincide con los resultados anteriores con una diferencia máxima de 0.001.
