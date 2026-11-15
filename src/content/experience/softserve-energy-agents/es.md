---
title: "Agentes autónomos para tickets"
client: "Una empresa de energía estadounidense del Fortune 500"
summary: "Dirijo una iniciativa de automatización para una empresa de energía estadounidense del Fortune 500 que reemplaza la burocracia de tickets en ServiceNow con agentes de IA autónomos guiados por gobernanza, con el primer MVP entregado en dos meses."
highlights:
  - "Entregué el primer MVP del pipeline de agentes en dos meses."
  - "Diseñé un pipeline de agentes de IA que crea tickets en ServiceNow y propone cambios de creación de recursos en Terraform para iniciativas de IA generativa."
  - "Construí puntos de aprobación humana, guardrails, skills y herramientas que conectan a todos los agentes, usando Databricks como su fuente de verdad."
  - "Creé un marketplace de skills de Claude con 93 skills, usando un pipeline de CI con LLM como juez que redujo en un 100% las contribuciones defectuosas que llegaban al marketplace."
---

## El cliente y el problema

El cliente es una empresa de energía estadounidense del Fortune 500. Sus iniciativas de IA generativa pasan por un proceso de tickets en ServiceNow con mucha burocracia.

## Lo que estoy construyendo

Dirijo una iniciativa en curso que reemplaza esta burocracia de tickets con agentes de IA autónomos guiados por gobernanza. Uso el Agent Development Kit (ADK) de Google para construir los agentes.

- **Pipeline de agentes.** Diseñé y lidero el desarrollo de un pipeline de agentes de IA que crea tickets en ServiceNow y propone cambios de creación de recursos en Terraform para iniciativas de IA generativa.
- **Gobernanza.** El pipeline tiene puntos de aprobación donde una persona aprueba cada paso importante, y guardrails que evitan que los agentes se desvíen.
- **Contexto y herramientas.** Los skills le dan a cada agente el contexto del entregable en el que trabaja, y las herramientas conectan a todos los agentes, usando Databricks como su fuente de verdad.
- **Marketplace de skills.** Para el mismo cliente, creé un marketplace propio de skills de Claude con 93 skills. Un pipeline de CI con LLM como juez revisa cada contribución y rechaza duplicados, violaciones de gobernanza y skills maliciosos.

## Resultados

- El primer MVP se entregó en dos meses.
- El marketplace tiene 93 skills, y las contribuciones defectuosas que llegaban a él se redujeron en un 100%.
