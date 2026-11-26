import type { YearMonth } from "@/lib/cv/format";

/** One job or project. Bullets may hold `[text](url)` links. */
export interface CvEntry {
  title: string;
  /** The employer. Shown as the link text, so an ATS can read it. */
  company?: string;
  start: YearMonth;
  end: YearMonth | null;
  location?: string;
  tech?: string;
  link: string;
  description: string;
  bullets: string[];
}

export interface CvSkillGroup {
  title?: string;
  tags: string[];
}

export interface CvStrength {
  icon: "leader" | "gears";
  title: string;
  description: string;
}

export interface CvEducation {
  degree: string;
  institution: string;
  start: YearMonth;
  end: YearMonth;
  location: string;
  gpa: string;
  maxGpa: string;
}

export interface CvCertification {
  title: string;
  issuer: string;
}

export interface CvLanguage {
  name: string;
  label: string;
}

export interface CvReference {
  name: string;
  role: string;
  email: string;
  phone?: string;
}

export interface Cv {
  name: string;
  title: string;
  /** A short overview printed above the columns. */
  summary?: string;
  contact: { email: string; site: string; linkedin: string; location: string };
  experience: CvEntry[];
  projects: CvEntry[];
  skills: CvSkillGroup[];
  strengths: CvStrength[];
  education: CvEducation;
  certifications: CvCertification[];
  languages: CvLanguage[];
  references: CvReference[];
}

const softserve: CvEntry = {
  title: "AI Engineer / Senior Software Engineer",
  start: { year: 2023, month: 8 },
  end: null,
  location: "Remote - Texas, US",
  tech: "Python, TypeScript, Go, AWS, GCP, Databricks",
  company: "SoftServe",
  link: "https://www.softserveinc.com/",
  description:
    "Tech lead for greenfield AI agent systems and cloud cost data platforms, for clients in energy, cloud cost management, media analytics and online surveys.",
  bullets: [
    "Architected and led AI agents that replace ServiceNow ticketing for a Fortune 500 energy company. Shipped the MVP in two months, live since August 2026, filing about 200 requests at an 8.6-minute median to the first ticket.",
    "Led a 6-engineer group within a team of more than 25, from system design to production, on a GenAI analytics chatbot over Snowflake. Showcased at CES 2025, with 100 active users at launch.",
    "Led end-to-end delivery of an AWS agent system that predicts US oil and gas production at 70% accuracy in 5 months, built on more than 500 scanned PDFs turned into structured data with AWS Textract.",
  ],
};

const verblio: CvEntry = {
  title: "Senior Software Engineer",
  start: { year: 2022, month: 8 },
  end: { year: 2023, month: 6 },
  location: "Remote - Colorado, US",
  tech: "JavaScript, Ruby, Python, Heroku",
  company: "Verblio",
  link: "https://www.verblio.com/",
  description:
    "Extended a decade-old Ruby on Rails platform for a new business model.",
  bullets: [
    "Migrated 70% of customers to a new business line without breaking existing features in the legacy code.",
    "Built behavioral and rule-based fraud detection, cutting active fraudulent accounts by 95%.",
    "Documented price list and in-app credit lifecycles, cutting questions to the development team by 50%.",
  ],
};

const icomm: CvEntry = {
  title: "Full Stack Software Engineer",
  start: { year: 2020, month: 8 },
  end: { year: 2022, month: 8 },
  location: "Remote - Bogotá, Colombia",
  tech: "Python, JavaScript, Go, AWS",
  company: "I-Comm Solutions",
  link: "https://i-comm.co/",
  description:
    "Built custom SaaS products for fintech and goods delivery clients in Latin America.",
  bullets: [
    "Automated 100% of [Factcil](https://www.factcil.com/)'s billing workflow by introducing electronic invoicing.",
    "Launched subscriptions and recurring payments for [Factcil](https://www.factcil.com/) with Stripe, including MRR and churn reporting.",
    "Deployed clients' services to AWS with Kubernetes and Elastic Load Balancing, with CI/CD through GitHub Actions.",
  ],
};

const kimon: CvEntry = {
  title: "Kimon",
  start: { year: 2023, month: 7 },
  end: null,
  link: "https://kimon.app",
  description:
    "Web game for learning kanji through Japanese music, built with Next.js and Supabase. The video pauses at a blanked-out lyric and you pick the kanji you heard.",
  bullets: [],
};

const bankManager: CvEntry = {
  title: "Bank Manager",
  start: { year: 2024, month: 9 },
  end: null,
  link: "https://github.com/AyanoNK/bank-sms-manager",
  description:
    "AI agent that automatically syncs and organizes personal Colombian financial information to fill out tax forms. Features budgeting, spending alerts, and monthly tips to lower yearly taxes.",
  bullets: [],
};

const birdRecognizer: CvEntry = {
  title: "Mobile Bird Recognizer",
  start: { year: 2023, month: 4 },
  end: { year: 2023, month: 6 },
  link: "https://github.com/AyanoNK/atlapetes-blancae",
  description:
    "Android mobile application for the Colombian Humboldt Institute that uses a phone's camera to recognize endangered tropical birds in the wilderness.",
  bullets: [],
};

/** The general software engineer CV. The other variants start from it. */
export const cv: Cv = {
  name: "Sebastian Correa",
  title: "Software Engineer",
  summary:
    "Senior software engineer and tech lead with 6 years of experience shipping production systems for enterprise clients in the US and Latin America, from AI agent systems and cloud cost data pipelines to payments and SaaS platforms. Works in Python, TypeScript and Go on AWS and GCP, and leads teams from system design to release.",
  contact: {
    email: "seb.correa.wilches@gmail.com",
    site: "ayano.dev/",
    linkedin: "linkedin.com/in/ayanonk/",
    location: "Bogotá, Colombia",
  },
  experience: [softserve, verblio, icomm],
  projects: [kimon, bankManager],
  skills: [
    {
      title: "Technologies",
      tags: [
        "LangGraph",
        "Google ADK",
        "MCP",
        "FastAPI",
        "Databricks",
        "React",
      ],
    },
    { tags: ["Python", "TypeScript", "SQL", "Go"] },
    { tags: ["AWS", "GCP", "Terraform", "Docker"] },
  ],
  strengths: [
    {
      icon: "leader",
      title: "Technical leadership",
      description:
        "Lead engineering groups from design to production, and set the CI/CD, review and release practices teams adopt.",
    },
    {
      icon: "gears",
      title: "System design",
      description:
        "Design AI agent, data pipeline and service architectures that hold up in production for enterprise clients.",
    },
  ],
  education: {
    degree: "Software Engineering",
    institution: "Universidad Manuela Beltrán",
    start: { year: 2017, month: 1 },
    end: { year: 2021, month: 12 },
    location: "Bogotá, Colombia",
    gpa: "4.2",
    maxGpa: "5.0",
  },
  certifications: [
    {
      title: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services (AWS)",
    },
    { title: "Associate Accelerated Data Science", issuer: "NVIDIA" },
    {
      title: "JLPT N2",
      issuer: "JLPT - Japanese Language Proficiency Test",
    },
  ],
  languages: [
    { name: "English", label: "Native" },
    { name: "Spanish", label: "Native" },
    { name: "Japanese", label: "Proficient" },
  ],
  references: [
    {
      name: "Oksana Brylevska",
      role: "SoftServe ─ Senior Project Manager",
      email: "obryle@softserveinc.com",
    },
    {
      name: "Greg Levow",
      role: "Verblio ─ COO/CTO",
      email: "greg@verblio.com",
      phone: "+1 (650)248-0717",
    },
  ],
};

const aiEngineer: Cv = {
  ...cv,
  title: "AI Engineer",
  summary:
    "AI engineer and tech lead with 6 years of software experience, building production AI agent systems for enterprise clients. Shipped autonomous ServiceNow agents for a Fortune 500 energy company and a GenAI analytics chatbot showcased at CES 2025. Works in Python with LangGraph, Google ADK and MCP on AWS and GCP.",
  experience: [
    {
      ...softserve,
      tech: "Python, LangGraph, Google ADK, MCP, AWS Bedrock, GCP",
      description:
        "Tech lead for greenfield AI agent systems, for clients in energy, media analytics and cloud cost management.",
      bullets: [
        softserve.bullets[0],
        softserve.bullets[1],
        "Led end-to-end delivery of an AWS agent system that predicts US oil and gas production at 70% accuracy in 5 months, and raised accuracy by 20% with LangFuse, DeepEval and Phoenix tracing.",
      ],
    },
    verblio,
    icomm,
  ],
  projects: [bankManager, birdRecognizer],
  skills: [
    {
      title: "Technologies",
      tags: [
        "LangGraph",
        "LangChain",
        "Google ADK",
        "MCP",
        "AWS Bedrock",
        "LangFuse",
      ],
    },
    { tags: ["Python", "TypeScript", "SQL", "RAG"] },
    { tags: ["AWS", "GCP", "Terraform", "Docker"] },
  ],
};

const dataEngineer: Cv = {
  ...cv,
  title: "Data Engineer",
  summary:
    "Data engineer and tech lead with 6 years of software experience, building cloud cost data pipelines for a company that helps businesses manage IT assets and cloud costs. Builds batch pipelines in Python, PySpark and SQL on Databricks, BigQuery and Airflow, provisioned with Terraform.",
  experience: [
    {
      ...softserve,
      tech: "Python, PySpark, SQL, Databricks, BigQuery, Airflow",
      description:
        "Tech lead for cloud cost data platforms and pipelines, for a company that helps businesses manage IT assets and cloud costs.",
      bullets: [
        "Led a new cloud inventory product from discovery to release, giving customers one view of 1M USD in cloud spend across more than 100 accounts, fed by daily Databricks and PySpark pipelines.",
        "Grew the managed service provider customers receiving their shared cost data in 31 days, from 45 to 467 organizations in the US, 2 to 32 in Europe and 10 to 42 in Asia-Pacific.",
        "Built a BigQuery and Airflow pipeline that finds up to 30% in potential savings on Google Cloud commitments, and kept customer cost reports correct through Google's mandatory 2026 billing export change.",
      ],
    },
    verblio,
    icomm,
  ],
  projects: [bankManager, kimon],
  skills: [
    {
      title: "Technologies",
      tags: [
        "Databricks",
        "PySpark",
        "BigQuery",
        "Airflow",
        "Snowflake",
        "PostgreSQL",
      ],
    },
    { tags: ["Python", "SQL", "Go"] },
    { tags: ["AWS", "GCP", "Terraform", "Docker"] },
  ],
};

/** Every CV variant, keyed by the last part of its URL. */
export const cvVariants = {
  swe: cv,
  aie: aiEngineer,
  de: dataEngineer,
} satisfies Record<string, Cv>;
