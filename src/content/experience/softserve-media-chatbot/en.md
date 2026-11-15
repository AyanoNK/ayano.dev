---
title: "GenAI analytics chatbot"
client: "A US advertising measurement and media analytics company"
summary: "Architected and delivered a greenfield GenAI chatbot for a US advertising measurement and media analytics company, leading a 6-person team to a production system showcased at CES 2025."
highlights:
  - "Led a 6-person team from system design to a production-ready system showcased at CES 2025."
  - "Served 100 active users under constant load at launch."
  - "Built the orchestration layer using LangGraph and LangChain, combining dynamic SQL queries in Snowflake with semantic retrieval over document data."
---

## The client and the problem

The client is a US advertising measurement and media analytics company. Its users wanted to ask questions about their data in plain language, without writing queries against the company's Snowflake data warehouse themselves.

## What I built

I architected and delivered a greenfield GenAI chatbot that answers user questions by running dynamic queries in Snowflake. I led a 6-person team from system design to a production-ready system.

- **Orchestration.** I built the orchestration layer using LangGraph and LangChain for tool usage, retrieval pipelines and multi-step reasoning.
- **Answers from two sources.** The chatbot writes and runs SQL queries in Snowflake on the fly, and combines their results with semantic retrieval over document data.

## Results

- Showcased at CES 2025.
- Served 100 active users under constant load at launch.
