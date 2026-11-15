---
title: "Cloud inventory and cost dashboard"
client: "A software company that helps businesses manage their IT assets and cloud costs"
summary: "Led a new cloud inventory product from discovery to release: a dashboard that lists a business's cloud resources with their cost, showing 1M USD in cloud spend across more than 100 accounts."
highlights:
  - "Led a new cloud inventory product from discovery and the UI design spec to three released pages, showing 1M USD in cloud spend across more than 100 accounts."
  - "Designed the pipeline tables (9 for AWS, 12 with Azure) and built daily pipelines between S3 and Databricks with Python and PySpark, processing about 1 GB of data per day."
  - "Kept dashboard load times under 10 seconds with a Go backend and a React micro frontend."
  - "Reduced deployment time from days to hours by provisioning the pipeline and the backend with Terraform."
  - "Added about 680 tests, and released CSV export, a second filter API and inventory for child organizations."
---

### The client and the problem

The client is a software company that helps businesses manage their IT assets and cloud costs. Its users needed one place to see their cloud resources and what each one costs, across more than 100 accounts and 1M USD in cloud spend.

### What I built

I led the product from the first discovery work to production, and wrote the designs and tickets that other engineers built from.

- **Discovery.** I chose the three-page layout, listed the fields each cloud service needs, and wrote the UI design spec. A coverage check showed that 39 of the 88 fields the reports need were in the collected data (44%). I named an API source for every missing field.
- **Data pipelines.** I designed the bronze, silver and gold tables, from raw to cleaned to ready for the dashboard: 9 finished tables for AWS, 12 with Azure. Each daily run replaces only one organization's day, so a re-run is safe. The pipelines cross the raw data in S3 with Databricks using Python and PySpark, refresh daily, and process about 1 GB of data per day.
- **Backend and API.** I developed the Go backend that exposes the finished tables, with date ranges, grouping and filters. The public API now has 17 methods and covers 12 service types (10 AWS, 2 Azure). The second version of the filter API went live in three production regions on 2026-09-22.
- **Dashboard.** I built all three pages as a React micro frontend: a summary, a table per service and a resource detail page, with filters and dates that carry across them. They went live on 2026-08-27.
- **Managed service providers.** Child organizations of providers used to see an empty page. I ran them through the pipeline, released on 2026-10-06 for the 59 child organizations in scope.
- **CSV export and saved filters.** I designed the CSV export: a download link valid for 5 minutes, which can be downloaded again for 24 hours. I built its storage and API, and it was released on 2026-11-04. I also designed saved filters and built the first part.
- **Lower pipeline cost.** I designed and built a setup that runs the pipeline for several organizations on one shared Databricks cluster, forecast to cut pipeline compute cost by 67 to 83%. It is not turned on in production yet.
- **Infrastructure.** I provisioned the Databricks pipeline and the backend deployment with Terraform.

### Results

- 1M USD in cloud spend across more than 100 accounts visible in one dashboard.
- Dashboard load times under 10 seconds.
- Deployment time reduced from days to hours.
- About 680 tests added.
- Released: the dashboard, a second filter API in three production regions, inventory for child organizations and CSV export.
