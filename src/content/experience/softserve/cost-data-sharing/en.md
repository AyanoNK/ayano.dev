---
title: "Cost data for managed service providers"
client: "A software company that helps businesses manage their IT assets and cloud costs"
summary: "Made sure the customer organizations of managed service providers receive the cost data shared with them, growing the organizations that receive it from 45 to 467 in the US."
highlights:
  - "Grew the organizations receiving shared cost data over 31 days from 45 to 467 in the US, 2 to 32 in Europe and 10 to 42 in Asia-Pacific."
  - "Added about 390 per-organization cost tables to the share across three production regions."
  - "Fixed a pipeline step that read only the first organization in a write that held many, raising the organizations read in staging from 68 to 126."
  - "Wrote the 3,400-word column mapping design for moving a business intelligence cost export to the new data pipeline."
---

### The client and the problem

The client is a software company that helps businesses manage their IT assets and cloud costs. Some of its customers are managed service providers: companies that run cloud accounts for their own customers. In the platform, a provider is a parent organization, and it passes part of its cloud bill to child organizations, one per customer.

The pipeline only shared cost tables with organizations that had their own inventory files. Child organizations had none, so they were left out and saw no cost data.

### What I built

- **Investigation.** I traced which organizations were shared and why child organizations were missing.
- **Sharing child organizations.** I changed the pipeline to share a child organization's cost data when its parent has inventory.
- **Reading every organization.** One write to the cost tables can hold many organizations. A step read only the first one, so the others were never shared. I made it read all of them.
- **Release.** I turned the change on in all three production regions on 2026-09-29.
- **Other work.** I wrote the column mapping design for moving a business intelligence cost export to the new pipeline, and a design for onboarding a single AWS bill for several accounts.

### Results

- Organizations receiving shared cost data over 31 days: 45 to 467 in the US, 2 to 32 in Europe, 10 to 42 in Asia-Pacific.
- About 390 per-organization cost tables added to the share.
- Organizations read from multi-organization writes in staging: 68 to 126.
