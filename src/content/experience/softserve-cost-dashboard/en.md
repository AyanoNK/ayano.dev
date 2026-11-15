---
title: "Cloud cost dashboard"
client: "A global professional services and technology consulting firm"
summary: "Led the creation of a financial dashboard for a global professional services and technology consulting firm, showing 1M USD in cloud spend across more than 100 accounts."
highlights:
  - "Visualized cloud inventory and cost usage for 1M USD in cloud spend across more than 100 accounts, with filtering and grouping by tags."
  - "Built daily pipelines between S3 and Databricks using Python and PySpark, processing about 1 GB of data per day."
  - "Kept dashboard load times under 10 seconds with a Go backend and a React micro frontend."
  - "Reduced deployment time from days to hours by provisioning the pipeline and the backend with Terraform."
---

## The client and the problem

The client is a global professional services and technology consulting firm. Its users needed one place to see their cloud inventory and what it costs, across more than 100 accounts and 1M USD in cloud spend.

## What I built

I led the initiative from the design spec discoveries to production.

- **Data pipelines.** I built pipelines that recover data from users' cloud environments and cross it between S3, where the raw data lands, and Databricks. I used Python and PySpark for transforming the two inputs into bronze, silver and gold tables, from raw to cleaned to ready for the dashboard. They refresh daily and process about 1 GB of data per day.
- **Backend and dashboard.** I developed the backend service using Go for exposing the curated tables to the frontend, and built the dashboard using React as a micro frontend, with filtering and grouping by tags.
- **Infrastructure.** I provisioned the Databricks pipeline and the backend service deployment using Terraform for infrastructure as code.

## Results

- 1M USD in cloud spend across more than 100 accounts visible in one dashboard.
- Dashboard load times under 10 seconds.
- Deployment time reduced from days to hours.
