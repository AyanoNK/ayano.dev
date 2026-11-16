---
title: "Agente de predicción de producción de petróleo y gas"
client: "Amazon Web Services (AWS)"
summary: "Lideré de principio a fin el desarrollo de un sistema de IA basado en agentes para Amazon Web Services que predice la producción de petróleo y gas en Estados Unidos, alcanzando un 70% de precisión en un plazo de 4 a 5 meses."
highlights:
  - "Alcancé un 70% de precisión en la extracción y predicción de datos de producción en un plazo de entrega de 4 a 5 meses."
  - "Convertí más de 500 PDF escaneados en Markdown y YAML estructurados usando AWS Textract."
  - "Reduje los costos de búsqueda vectorial en un 70% migrando de AWS Bedrock Knowledge Bases a Pinecone."
  - "Mejoré la precisión de los resultados en un 20% usando LangFuse, DeepEval y Phoenix para trazar y medir el rendimiento de los agentes."
  - "Reescribí los agentes de producción y regulación de TypeScript a Python con LangChain, FastAPI y RAG sobre PostgreSQL, y desplegué todo el sistema en AWS con AWS CDK."
---

### El cliente y el problema

Amazon Web Services (AWS) necesitaba un sistema de IA que predijera la producción de petróleo y gas en todo Estados Unidos. Los datos detrás de esas predicciones están en muchos lugares, desde tablas estructuradas hasta cientos de informes PDF escaneados.

### Lo que construí

Lideré de principio a fin el desarrollo de un sistema de IA basado en agentes, usando AWS Bedrock para la inferencia de LLM y arquitecturas RAG para la recuperación sobre datos estructurados y no estructurados.

- **Procesamiento de documentos.** Implementé pipelines que usan AWS Textract para convertir más de 500 PDF escaneados en Markdown y YAML estructurados, para que los agentes puedan buscarlos y los análisis posteriores puedan usarlos.
- **Búsqueda vectorial.** Diseñé e integré búsqueda vectorial usando Pinecone para la recuperación semántica entre distintas fuentes de datos. Reemplazó a AWS Bedrock Knowledge Bases y redujo los costos de búsqueda vectorial en un 70%.
- **Evaluación y trazabilidad.** Implementé evaluación y observabilidad de LLM usando LangFuse, DeepEval y Phoenix para trazar y medir el rendimiento de los agentes, lo que mejoró la precisión de los resultados en un 20%.

### Más de lo que construí

Trabajé en él en un equipo de 6 personas.

- **Agentes en Python.** Reescribí los agentes de producción y regulación de TypeScript a Python, usando LangChain para los agentes, FastAPI para la API y RAG sobre PostgreSQL para los datos estructurados. Los agentes también pueden llamar funciones de AWS Lambda.
- **Interfaz de chat.** Desarrollé todo el frontend con React para conversar con los agentes, incluyendo gráficos de líneas y de torta generados a partir de sus respuestas.
- **Despliegue.** Desplegué todo el sistema en AWS ECS Fargate con AWS CDK en Python.
- **Pruebas.** Probé los cuatro agentes con LangFuse, midiendo la precisión, la veracidad, el manejo del contexto y otras métricas de desempeño.

### Resultados

- 70% de precisión en la extracción y predicción de datos de producción.
- Entregado en un plazo de 4 a 5 meses.
- 70% menos en costos de búsqueda vectorial y 20% más de precisión en los resultados.
