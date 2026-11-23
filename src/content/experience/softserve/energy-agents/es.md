---
title: "Agentes autónomos para tickets"
client: "Una empresa de energía estadounidense del Fortune 500"
summary: "Dirijo una iniciativa de automatización para una empresa de energía estadounidense del Fortune 500 que reemplaza la burocracia de tickets en ServiceNow con agentes de IA autónomos guiados por gobernanza. El primer MVP se entregó en dos meses, y los agentes funcionan en producción desde agosto de 2026."
highlights:
  - "Entregué el primer MVP del pipeline de agentes en dos meses, en producción desde agosto de 2026."
  - "Diseñé un pipeline de agentes de IA que crea por sí solo unas 200 solicitudes en ServiceNow, con una mediana de 8,6 minutos entre el envío y el primer ticket."
  - "Construí el agente de Terraform, que abre pull requests revisados para dev, stage y prod entre 12 y 23 minutos después de aprobar un plan, y ya ha abierto 345."
  - "Construí puntos de aprobación humana, guardrails, skills y herramientas que conectan a todos los agentes, usando Databricks como su fuente de verdad. El 98,3% de los traspasos entre agentes salen bien."
  - "Creé un marketplace de skills de Claude con 93 skills, usando un pipeline de CI con LLM como juez que redujo en un 100% las contribuciones defectuosas que llegaban al marketplace."
---

### El cliente y el problema

El cliente es una empresa de energía estadounidense del Fortune 500. Cuando un equipo quiere construir un nuevo agente de IA, la solicitud pasa por un proceso de tickets en ServiceNow con mucha burocracia. Las personas creaban a mano los tickets de gobernanza: riesgo de IA, revisión de arquitectura en la nube, acceso a la nube, acceso a LLM y configuración de la plataforma. Después alguien escribía a mano el Terraform de los recursos en la nube.

### Lo que estoy construyendo

Dirijo una iniciativa en curso que reemplaza este proceso con agentes de IA autónomos guiados por gobernanza. Después de que un equipo envía una solicitud, cada paso lo hace un agente, y las personas solo aprueban. Uso el Agent Development Kit (ADK) de Google para los agentes, que corren en Google Cloud Run.

- **Pipeline de agentes.** Diseñé y lidero el desarrollo de un pipeline de cuatro agentes. Un orquestador decide qué agente actúa después. Un agente de ServiceNow crea los tickets de gobernanza y lee las aprobaciones. Un agente planificador convierte los tickets aprobados en un plan de recursos en la nube para cada ambiente. Un agente de Terraform convierte el plan aprobado en pull requests.
- **Agente de Terraform.** Lo diseñé y escribí la mayor parte de su código. Llena plantillas aprobadas, revisa el resultado con `terraform fmt` y `validate`, hace que un LLM juez revise cada cambio y abre los pull requests. Los mantiene al día con la rama principal, con un pull request por ambiente y un commit por solicitud.
- **Cambios por chat.** El planificador y el agente de Terraform responden en los hilos de comentarios donde las personas ya revisan su trabajo. Un revisor pide un cambio en palabras simples, y el agente lo aplica o explica por qué no puede. Los guardrails deciden: un cambio que rompe las reglas de gobernanza nunca llega al plan ni al código.
- **Gobernanza.** El pipeline tiene puntos de aprobación donde una persona aprueba cada paso importante, y guardrails que evitan que los agentes se desvíen. Cada paso escribe un evento en Databricks, así que se puede auditar todo el recorrido de una solicitud.
- **Contexto y herramientas.** Los skills le dan a cada agente el contexto del entregable en el que trabaja, y las herramientas conectan a todos los agentes, usando Databricks como su fuente de verdad. Escribí 12 de los 13 skills que el planificador y el agente de Terraform cargan al ejecutarse. Un arreglo en un skill cambia el comportamiento en producción sin volver a desplegar.
- **Marketplace de skills.** Para el mismo cliente, creé un marketplace propio de skills de Claude con 93 skills. Un pipeline de CI con LLM como juez revisa cada contribución y rechaza duplicados, violaciones de gobernanza y skills maliciosos.
- **Soporte.** Encontré la causa raíz de unos 40 incidentes en producción y en pruebas, cada uno con un arreglo o un responsable asignado, y escribí el runbook de soporte con 23 guías para resolver problemas.

### Resultados

- El primer MVP se entregó en dos meses, y los agentes funcionan en producción desde agosto de 2026.
- Unas 200 solicitudes creadas automáticamente en ServiceNow, con una mediana de 8,6 minutos entre el envío y el primer ticket.
- 345 pull requests de infraestructura abiertos por el agente de Terraform, entre 12 y 23 minutos después de aprobar un plan.
- El 98,3% de los 630 traspasos entre agentes en producción salen bien.
- El marketplace tiene 93 skills, y las contribuciones defectuosas que llegaban a él se redujeron en un 100%.
