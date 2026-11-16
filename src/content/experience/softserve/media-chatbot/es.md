---
title: "Chatbot de analítica con IA generativa"
client: "Una empresa estadounidense de medición publicitaria y analítica de medios"
summary: "Diseñé y entregué desde cero un chatbot de IA generativa para una empresa estadounidense de medición publicitaria y analítica de medios, liderando un grupo de 6 personas dentro de un equipo de más de 25 hasta un sistema en producción presentado en CES 2025."
highlights:
  - "Lideré un grupo de 6 personas dentro de un equipo de más de 25, desde el diseño del sistema hasta un sistema listo para producción presentado en CES 2025."
  - "Atendí a 100 usuarios activos bajo carga constante en el lanzamiento."
  - "Construí la capa de orquestación usando LangGraph y LangChain, combinando consultas SQL dinámicas en Snowflake con recuperación semántica sobre documentos."
  - "Alcancé un 95% de cobertura de código en el backend con pruebas unitarias en PyTest."
  - "Construí módulos de pruebas A/B que prueban cambios en los prompts de forma segura sin afectar el comportamiento estable."
---

### El cliente y el problema

El cliente es una empresa estadounidense de medición publicitaria y analítica de medios. Su plataforma unifica la audiencia de televisión lineal, televisión conectada y video digital, y sus datos están en Snowflake.

### Lo que construí

Diseñé y entregué desde cero un chatbot de IA generativa que responde las preguntas de los usuarios ejecutando consultas dinámicas en Snowflake. Lideré un grupo de 6 personas dentro de un equipo de más de 25, desde el diseño del sistema hasta un sistema listo para producción.

- **Orquestación.** Construí la capa de orquestación usando LangGraph y LangChain para el uso de herramientas, los pipelines de recuperación y el razonamiento en varios pasos.
- **Respuestas desde dos fuentes.** El chatbot escribe y ejecuta consultas SQL en Snowflake al momento, y combina sus resultados con recuperación semántica sobre documentos.

### Trabajo práctico

Los servidores de frontend y backend corren en un clúster de Kubernetes, registran sus logs en Datadog y se comunican por gRPC.

- **Backend.** Desarrollé servicios de backend en Python con gRPC, y diseñé los esquemas de solicitudes y respuestas en archivos proto de gRPC.
- **AWS Bedrock y Snowflake.** Integré AWS Bedrock con la librería boto3, y Snowflake con la librería oficial snowflake-connector-python.
- **Caché.** Construí módulos de caché para las consultas de Snowflake cuyos resultados casi no cambian, con una actualización programada.
- **Experimentos.** Construí módulos de pruebas A/B para evaluar cambios en los prompts de forma segura sin afectar el comportamiento estable.
- **Gráficos.** Añadí visualizaciones de los resultados de Snowflake en el frontend, usando Go, Templ y Tailwind CSS.
- **Herramientas y calidad.** Escribí scripts con opciones de línea de comandos para consultar el servidor en distintos entornos y endpoints, revisé cambios en Python y Go de varios equipos y alcancé un 95% de cobertura de código con PyTest.

### Resultados

- Presentado en CES 2025.
- Atendió a 100 usuarios activos bajo carga constante en el lanzamiento.
