---
title: "GenAI analytics chatbot"
client: "A US advertising measurement and media analytics company"
summary: "Architected and delivered a greenfield GenAI chatbot for a US advertising measurement and media analytics company, leading a 6-person group within a team of more than 25 to a production system showcased at CES 2025."
highlights:
  - "Led a 6-person group within a team of more than 25, from system design to a production-ready system showcased at CES 2025."
  - "Served 100 active users under constant load at launch."
  - "Built the orchestration layer using LangGraph and LangChain, combining dynamic SQL queries in Snowflake with semantic retrieval over document data."
  - "Reached 95% code coverage on the backend with PyTest unit tests."
  - "Built A/B testing modules that try prompt changes safely without affecting the stable behavior."
---

### The client and the problem

The client is a US advertising measurement and media analytics company. Its platform unifies audience viewership across linear TV, connected TV and digital video, and its data lives in Snowflake.

### What I built

I architected and delivered a greenfield GenAI chatbot that answers user questions by running dynamic queries in Snowflake. I led a 6-person group within a team of more than 25, from system design to a production-ready system.

- **Orchestration.** I built the orchestration layer using LangGraph and LangChain for tool usage, retrieval pipelines and multi-step reasoning.
- **Answers from two sources.** The chatbot writes and runs SQL queries in Snowflake on the fly, and combines their results with semantic retrieval over document data.

### Hands-on work

The frontend and backend servers run on a Kubernetes cluster, log to Datadog and talk to each other over gRPC.

- **Backend.** I developed backend services in Python with gRPC, and designed the request and response schemas in gRPC proto files.
- **AWS Bedrock and Snowflake.** I integrated AWS Bedrock through the boto3 library, and Snowflake through the official snowflake-connector-python library.
- **Caching.** I built caching modules for Snowflake queries whose results rarely change, with a scheduled refresh.
- **Experiments.** I built A/B testing modules, so prompt changes can be evaluated safely without affecting the stable behavior.
- **Charts.** I added visualizations of Snowflake results to the frontend, using Go, Templ and Tailwind CSS.
- **Tooling and quality.** I wrote scripts with command line options for querying the server across environments and endpoints, reviewed Python and Go changes across teams, and reached 95% code coverage with PyTest.

### Results

- Showcased at CES 2025.
- Served 100 active users under constant load at launch.
