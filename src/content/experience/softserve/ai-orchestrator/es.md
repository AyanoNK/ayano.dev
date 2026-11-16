---
title: "Plataforma orquestadora de IA"
client: "SoftServe (interno)"
summary: "Desarrollé una plataforma interna de SoftServe que genera y coordina agentes autónomos de IA, reduciendo el uso de tokens en un 15%."
highlights:
  - "Reduje el uso de tokens en un 15% introduciendo skills y caché."
  - "Medí el consumo de tokens de entrada y salida del orquestador y sus subagentes para calcular los ahorros."
  - "Separé la plataforma de un monolito en tres servicios con sus propios repositorios, con CI/CD completo usando GitHub Actions, release-please y Towncrier."
  - "Añadí guardrails a los agentes configurables para delimitar y controlar las soluciones que proponen."
  - "Construí herramientas para que los agentes se comuniquen entre sí a través de un sistema de archivos compartido en AWS EFS."
---

### El cliente y el problema

Fue una iniciativa interna de SoftServe para construir una plataforma capaz de generar y coordinar agentes autónomos. El enfoque estaba en la explicabilidad, la modularidad y la gestión de todo el ciclo de vida de cada agente de IA.

### Lo que construí

Desarrollé la plataforma orquestadora de IA. Se repara y se gestiona a sí misma, e imita todo el ciclo de vida del desarrollo de software. Cada decisión y acción de un agente es visible y está explicada, y se pueden agregar nuevos agentes y herramientas al sistema con facilidad.

Para controlar su costo, medí el consumo de tokens de entrada y salida del orquestador y sus subagentes, y luego introduje skills y caché para que los agentes envíen menos tokens por el mismo trabajo.

### Cómo está construida

La plataforma tiene tres servicios: un frontend en React, una API escrita con FastAPI y un servicio en Python que crea, ejecuta y evalúa agentes en AWS en varios procesos a través de una cola. Se despliega en AWS con Terraform. Trabajé en ella en un equipo de 16 personas.

- **Tres servicios.** Separé los servicios de un monolito en sus propios repositorios, cada uno con CI/CD completo usando GitHub Actions, release-please para las versiones y Towncrier para los registros de cambios, con despliegue en AWS.
- **Guardrails.** Integré guardrails en los agentes configurables para delimitar y controlar las soluciones que proponen.
- **Comunicación entre agentes.** Añadí herramientas para que los agentes intercambien trabajo a través de un sistema de archivos compartido en AWS EFS.

### Resultados

- El uso de tokens se redujo en un 15%.
