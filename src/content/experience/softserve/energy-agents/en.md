---
title: "Autonomous ticketing agents"
client: "A Fortune 500 US energy company"
summary: "Directing an automation initiative for a Fortune 500 US energy company that replaces its ServiceNow ticketing bureaucracy with governance-driven autonomous AI agents, delivering the first MVP in two months."
highlights:
  - "Delivered the first MVP of the agent pipeline in two months."
  - "Architected an AI agent pipeline that creates tickets in ServiceNow and proposes resource creation changes in Terraform for GenAI initiatives."
  - "Built human-in-the-loop gates, guardrails, skills and tools that connect every agent, using Databricks as their source of truth."
  - "Created a Claude skills marketplace that hosts 93 skills, using an LLM-as-a-judge CI pipeline that reduced bad submissions reaching the marketplace by 100%."
---

### The client and the problem

The client is a Fortune 500 US energy company. Its GenAI initiatives run through a ServiceNow ticketing process with a lot of bureaucracy.

### What I am building

I am directing an ongoing initiative that replaces this ticketing bureaucracy with governance-driven, autonomous AI agents. I use Google's Agent Development Kit (ADK) for building the agents.

- **Agent pipeline.** I architected and lead the development of an AI agent pipeline that creates tickets in ServiceNow and proposes resource creation changes in Terraform for GenAI initiatives.
- **Governance.** The pipeline has human-in-the-loop gates where a person approves each important step, and guardrails that keep the agents from derailing.
- **Context and tools.** Skills feed each agent the context of the deliverable it works on, and tools connect all the agents, using Databricks as their source of truth.
- **Skills marketplace.** For the same client, I created a custom Claude skills marketplace that hosts 93 skills. An LLM-as-a-judge CI pipeline reviews every contribution and rejects duplicate submissions, governance violations and malicious skills.

### Results

- The first MVP was delivered in two months.
- The marketplace hosts 93 skills, and bad submissions reaching it were reduced by 100%.
