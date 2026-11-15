---
title: "Google Cloud commitment tooling"
client: "A software company that helps businesses manage their IT assets and cloud costs"
summary: "Built tools that help businesses buy Google Cloud commitments and track their savings, identifying potential cost reductions of up to 30% and writing about 65% of the code changes in the team's main pipeline."
highlights:
  - "Identified potential cost reductions of up to 30% with a pipeline that predicts savings from purchasing Google Cloud Committed Use Discounts."
  - "Built the first API that buys Google Cloud commitments, with keyless Google sign-in, across 36 regions."
  - "Cut a cost calculation's memory limit 8x, from 32 GiB to 4 GiB, by moving it from Python into BigQuery."
  - "Built the calculations for Google's new billing export, mandatory from January 2026, matching the old results to within 0.001."
  - "Wrote about 65% of the code changes in the team's main Airflow pipeline over ten months."
---

### The client and the problem

The client is a software company that helps businesses manage their IT assets and cloud costs. Google Cloud offers Committed Use Discounts: a business commits to a level of usage for one or three years and pays less for it. The client's customers needed help choosing how much to commit to, buying the commitments, and seeing what they saved.

### What I built

- **Savings prediction.** I owned the creation of a pipeline that predicts the potential savings from purchasing Committed Use Discounts, using Google Cloud billing exports and recommendations for the data engineering and the predictive modeling.
- **Buying commitments.** I researched how to buy commitments through Google's API and built the first purchase API, with keyless Google sign-in and support for 36 regions. Teammates later built spend-based buying, splitting, merging and extending on top of it. I also fixed machine types and regions that could not be bought.
- **Daily savings.** I built the daily cost and savings calculation for each commitment and the load of its results into the database. When a whole month of billing ran out of memory on a 16 GiB worker, I changed it to process one day at a time.
- **Google's new billing export.** Google made a new billing export format mandatory in January 2026. I co-wrote the design, separated the two kinds of discount maths, and added the maths for the new format, with results matching the old ones to within 0.001.
- **Lower memory.** By December 2025 one cost calculation, written in Python with Polars, needed a 32 GiB limit on its own machine. I moved it into BigQuery and removed about 1,000 lines. It now runs at 4 GiB on shared machines.
- **Commitment details.** I wrote the design and the tickets for loading commitment details into the platform, and built four of the five tickets.
- **Production fixes.** I fixed two versions of the pipeline that reported different billing totals for the same month, fixed load failures for every customer, and limited production jobs to paying customers to save compute.

### Results

- Potential cost reductions of up to 30% identified from Committed Use Discounts.
- Commitments can be bought through an API in 36 regions.
- Memory limit for a cost calculation cut 8x, from 32 GiB to 4 GiB.
- The new billing export matches the old results to within 0.001.
