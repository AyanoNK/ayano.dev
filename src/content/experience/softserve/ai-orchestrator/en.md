---
title: "AI orchestrator platform"
client: "SoftServe (internal)"
summary: "Developed an internal SoftServe AI orchestrator platform that generates and coordinates autonomous agents, reducing token usage by 15%."
highlights:
  - "Reduced token usage by 15% by introducing skills and caching."
  - "Measured input and output token consumption across the orchestrator and its subagents to calculate the savings."
  - "Split the platform from a monolith into three services in their own repositories, with full CI/CD using GitHub Actions, release-please and Towncrier."
  - "Added guardrails to configurable agents to scope and control the solutions they propose."
  - "Built tools that let agents talk to each other through a shared AWS EFS file system."
---

### The client and the problem

This was an internal SoftServe initiative to build a platform that can generate and coordinate autonomous agents. The focus was on explainability, modularity and managing the full lifecycle of each AI agent.

### What I built

I developed the AI orchestrator platform. It is self-healing and self-managing, and it mimics the full software development life cycle. Every decision and action an agent takes is visible and explained, and new agents and tools can be added to the system easily.

To control its cost, I measured input and output token consumption across the orchestrator and its subagents, then introduced skills and caching so the agents send fewer tokens for the same work.

### How it is built

The platform has three services: a React frontend, an API written with FastAPI, and a Python service that spawns, runs and evaluates agents on AWS in several processes through a queue. It is deployed on AWS with Terraform. I worked on it in a team of 16.

- **Three services.** I split the services out of a monolith into their own repositories, each with full CI/CD using GitHub Actions, release-please for releases and Towncrier for changelogs, deploying to AWS.
- **Guardrails.** I integrated guardrails into the configurable agents, to scope and control the solutions they propose.
- **Agent-to-agent communication.** I added tools that let agents exchange work through a shared AWS EFS file system.

### Results

- Token usage reduced by 15%.
