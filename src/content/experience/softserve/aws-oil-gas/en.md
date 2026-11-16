---
title: "Oil and gas production prediction agent"
client: "Amazon Web Services (AWS)"
summary: "Led the end-to-end development of an agent-based AI system for Amazon Web Services that predicts oil and gas production across the United States, reaching 70% accuracy within a 4 to 5 month delivery window."
highlights:
  - "Reached 70% accuracy in production data extraction and prediction within a 4 to 5 month delivery window."
  - "Converted more than 500 PDF scans into structured Markdown and YAML using AWS Textract."
  - "Cut vector search costs by 70% by migrating from AWS Bedrock Knowledge Bases to Pinecone."
  - "Improved result accuracy by 20% using LangFuse, DeepEval and Phoenix for tracing and benchmarking agent performance."
  - "Rewrote the production and regulation agents from TypeScript to Python with LangChain, FastAPI and RAG over PostgreSQL, and deployed the whole stack to AWS with the AWS CDK."
---

### The client and the problem

Amazon Web Services (AWS) needed an AI system that predicts oil and gas production throughout the United States. The data behind those predictions lives in many places, from structured tables to hundreds of scanned PDF reports.

### What I built

I led the end-to-end development of an agent-based AI system, using AWS Bedrock for LLM inference and RAG architectures for retrieval over structured and unstructured data.

- **Document processing.** I implemented pipelines that use AWS Textract for converting more than 500 PDF scans into structured Markdown and YAML, so the agents can search them and later analytics can use them.
- **Vector search.** I designed and integrated vector search using Pinecone for semantic retrieval across different data sources. It replaced AWS Bedrock Knowledge Bases and cut vector search costs by 70%.
- **Evaluation and tracing.** I implemented LLM evaluation and observability using LangFuse, DeepEval and Phoenix for tracing and benchmarking agent performance, which improved result accuracy by 20%.

### More of what I built

I worked on it in a team of 6.

- **Agents in Python.** I rewrote the production and regulation agents from TypeScript to Python, using LangChain for the agents, FastAPI for the API, and RAG over PostgreSQL for the structured data. The agents can also call AWS Lambda functions.
- **Chat interface.** I developed the full frontend with React for talking to the agents, including charts such as line and pie charts drawn from their answers.
- **Deployment.** I deployed the whole stack to AWS ECS Fargate with the AWS CDK in Python.
- **Testing.** I tested all four agents with LangFuse, measuring accuracy, truthfulness, context awareness and other performance metrics.

### Results

- 70% accuracy in production data extraction and prediction.
- Delivered within a 4 to 5 month window.
- 70% lower vector search costs and 20% better result accuracy.
