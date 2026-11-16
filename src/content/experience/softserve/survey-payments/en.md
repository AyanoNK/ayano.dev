---
title: "Legacy payments modernization"
client: "A leading US online survey platform"
summary: "Modernized a 20-year-old legacy invoice payments system for a leading US online survey platform using Stripe Payments, reducing fraudulent credit card transactions by 80%."
highlights:
  - "Reduced fraudulent credit card transactions by 80% by using Stripe Payments for secure transaction handling in a 20-year-old invoicing system."
  - "Migrated 20% of marketing and subscription renewal emails from an in-house service to a consumer-producer architecture."
  - "Recovered thousands in tax funds from flawed transactions through careful financial analysis."
---

### The client and the problem

The client is a leading US online survey platform. Parts of its platform are 20 years old, including the system that handles invoice payments, and it needed maintenance and a revamp to meet the demands of the industry today. Businesses use the platform to create surveys, collect anonymized answers from chosen audiences and analyze the results, paying through subscription plans and audience credits.

### What I did

I worked on the maintenance and revamp of these 20-year-old systems, and on migrating legacy parts to microservices and event-driven architectures.

- **Payments.** I modernized the legacy invoice payments system, using Stripe Payments for secure transaction handling.
- **Emails.** I migrated 20% of the marketing and subscription renewal emails from an in-house service to a consumer-producer architecture, where one service queues the emails and another sends them.
- **Tax funds.** Through careful financial analysis, I found flawed transactions and recovered thousands in tax funds.

### How it is built

The platform runs as microservices built with Python (Pyramid), React and Java on AWS, using AWS SQS and Kafka for events and Terraform for deploying to Kubernetes. I worked on it in a team of more than 30.

- **Microservices.** I developed and maintained microservices in Python with Pyramid on AWS, and designed backend APIs and cloud integrations for them.
- **Email queues.** The emails moved to the new setup now go through AWS SQS and Kafka.

### Results

- 80% fewer fraudulent credit card transactions.
- Thousands in tax funds recovered.
