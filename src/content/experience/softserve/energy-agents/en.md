---
title: "Autonomous ticketing agents"
client: "A Fortune 500 US energy company"
summary: "Directing an automation initiative for a Fortune 500 US energy company that replaces its ServiceNow ticketing bureaucracy with governance-driven autonomous AI agents. The first MVP shipped in two months, and the agents have run in production since August 2026."
highlights:
  - "Delivered the first MVP of the agent pipeline in two months, live in production since August 2026."
  - "Architected an AI agent pipeline that files about 200 ServiceNow requests on its own, with a median of 8.6 minutes from submission to the first ticket."
  - "Built the Terraform agent, which opens reviewed pull requests for dev, stage and prod 12 to 23 minutes after a plan is approved, and has opened 345 of them."
  - "Built human-in-the-loop gates, guardrails, skills and tools that connect every agent, using Databricks as their source of truth. 98.3% of hand-offs between agents succeed."
  - "Created a Claude skills marketplace that hosts 93 skills, using an LLM-as-a-judge CI pipeline that reduced bad submissions reaching the marketplace by 100%."
---

### The client and the problem

The client is a Fortune 500 US energy company. When a team there wants to build a new AI agent, the request goes through a ServiceNow ticketing process with a lot of bureaucracy. People raised the governance tickets by hand: AI risk, cloud architecture review, cloud access, LLM access and platform setup. Then someone wrote the Terraform for the cloud resources by hand.

### What I am building

I am directing an ongoing initiative that replaces this process with governance-driven, autonomous AI agents. After a team submits a request, every step is done by an agent, and people only approve. I use Google's Agent Development Kit (ADK) for the agents, which run on Google Cloud Run.

- **Agent pipeline.** I architected and lead the development of a pipeline of four agents. An orchestrator decides which agent acts next. A ServiceNow agent files the governance tickets and reads the approvals. A planner agent turns the approved tickets into a cloud resource plan for each environment. A Terraform agent turns the approved plan into pull requests.
- **Terraform agent.** I designed it and wrote most of its code. It fills approved templates, checks the result with `terraform fmt` and `validate`, has an LLM judge review every change, and opens the pull requests. It keeps them up to date with the main branch, and keeps one pull request per environment with one commit per request.
- **Changes by chat.** The planner and the Terraform agent answer in the comment threads where people already review their work. A reviewer asks for a change in plain words, and the agent applies it or says why it can't. Guardrails decide which: a change that breaks the governance rules never reaches the plan or the code.
- **Governance.** The pipeline has human-in-the-loop gates where a person approves each important step, and guardrails that keep the agents from derailing. Every step writes an event to Databricks, so the whole path of a request can be audited.
- **Context and tools.** Skills feed each agent the context of the deliverable it works on, and tools connect all the agents, using Databricks as their source of truth. I wrote 12 of the 13 skills the planner and the Terraform agent load at runtime. A skill fix changes production behavior with no redeploy.
- **Skills marketplace.** For the same client, I created a custom Claude skills marketplace that hosts 93 skills. An LLM-as-a-judge CI pipeline reviews every contribution and rejects duplicate submissions, governance violations and malicious skills.
- **Support.** I traced about 40 production and test incidents to their root cause, each with a fix or a named owner, and wrote the support runbook with 23 troubleshooting guides.

### Results

- The first MVP was delivered in two months, and the agents have run in production since August 2026.
- About 200 ServiceNow requests filed automatically, with a median of 8.6 minutes from submission to the first ticket.
- 345 infrastructure pull requests opened by the Terraform agent, 12 to 23 minutes after a plan is approved.
- 98.3% of the 630 hand-offs between agents in production succeed.
- The marketplace hosts 93 skills, and bad submissions reaching it were reduced by 100%.
