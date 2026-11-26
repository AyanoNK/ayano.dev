import type { YearMonth } from "@/lib/cv/format";

/** One job or project. Bullets may hold `[text](url)` links. */
export interface CvEntry {
  title: string;
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
  /** 1 to 5. */
  level: number;
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

export const cv: Cv = {
  name: "Sebastian Correa",
  title: "Software Engineer",
  contact: {
    email: "seb.correa.wilches@gmail.com",
    site: "ayano.software/",
    linkedin: "linkedin.com/in/ayanonk/",
    location: "Bogotá, Colombia",
  },
  experience: [
    {
      title: "AI Engineer / Senior Software Engineer",
      start: { year: 2023, month: 8 },
      end: null,
      location: "Remote - Texas, US",
      tech: "Python, JavaScript, Java, Go, AWS, GCP",
      link: "https://www.softserveinc.com/",
      description:
        "Led projects in the Data Analysis and Cloud industries by leading greenfield solutions that leverage AI systems, and legacy systems migrations.",
      bullets: [
        "Directed the automation initiative for a ticketing system in an AI company that replaced ticketing bureaucracy with governance-driven, autonomous AI agents. Delivered an MVP in two months.",
        "Led a 6 people team in building a greenfield GenAI chatbot that answers users' questions by running dynamic queries in Snowflake. Featured in CES 2025.",
        "Owned the development of an AI agent for a big tech client to predict oil and gas production throughout the United States.",
        "Owned the creation of a pipeline using Google Cloud's billing exports and recommendations to predict potential savings by purchasing Committed Use Discounts.",
      ],
    },
    {
      title: "Senior Software Engineer",
      start: { year: 2022, month: 8 },
      end: { year: 2023, month: 6 },
      location: "Remote - Colorado, US",
      tech: "JavaScript, Ruby, Python, Heroku",
      link: "https://www.verblio.com/",
      description:
        "Contributed to a development team tasked with maintaining a decade-old web platform and implementing new features for a novel business model.",
      bullets: [
        "Executed a seamless transition of 70% of customers into a new, reimagined business line.",
        "Successfully implemented a robust fraud detection system, resulting in a 95% reduction in active fraudulent accounts.",
        "Documented complex technical processes about price lists and in-app credits' lifecycles, reducing questions to the development team by 50%.",
      ],
    },
    {
      title: "Full Stack Software Engineer",
      start: { year: 2020, month: 8 },
      end: { year: 2022, month: 8 },
      location: "Remote - Bogotá, Colombia",
      tech: "Python, JavaScript, Go, AWS",
      link: "https://i-comm.co/",
      description:
        "Led the development and ownership of multiple features for clients in the fintech and goods delivery sectors, providing innovative SaaS solutions.",
      bullets: [
        "Automated the entire billing workflow for [Factcil](https://www.factcil.com/) by introducing electronic invoicing, achieving 100% automation efficiency.",
        "Pioneered the implementation of subscriptions and recurring payment options for [Factcil](https://www.factcil.com/)'s web platform.",
        "Created 50% of [Factcil](https://www.factcil.com/)'s previous landing page based on designer Figma mocks.",
      ],
    },
  ],
  projects: [
    {
      title: "Bank Manager",
      start: { year: 2024, month: 9 },
      end: null,
      link: "https://github.com/AyanoNK/bank-sms-manager",
      description:
        "AI agent that automatically syncs and organizes personal Colombian financial information to fill out tax forms. Features budgeting, spending alerts, and monthly tips to lower yearly taxes.",
      bullets: [],
    },
    {
      title: "Mobile Bird Recognizer",
      start: { year: 2023, month: 4 },
      end: { year: 2023, month: 6 },
      link: "https://github.com/AyanoNK/atlapetes-blancae",
      description:
        "Android mobile application for the Colombian Humboldt Institute that uses a phone's camera to recognize endangered tropical birds in the wilderness.",
      bullets: [],
    },
    {
      title: "Artist Portfolio Website",
      start: { year: 2023, month: 1 },
      end: { year: 2023, month: 3 },
      link: "https://www.poshaus.art/",
      description:
        "Construction of a portfolio website for an illustrator & designer.",
      bullets: [],
    },
  ],
  skills: [
    {
      title: "Technologies",
      tags: [
        "LangGraph",
        "MCP",
        "FastAPI",
        "Apache Airflow",
        "Databricks",
        "React",
      ],
    },
    { tags: ["Python", "TypeScript", "SQL", "Go"] },
    { tags: ["AWS", "Google Cloud", "Docker", "GitHub"] },
  ],
  strengths: [
    {
      icon: "leader",
      title: "Leadership",
      description:
        "Keeping close contact with stakeholders to achieve deliverables.",
    },
    {
      icon: "gears",
      title: "Adaptability",
      description:
        "Flexibility in shifting priorities and resources during critical project phases.",
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
      title: "JLPT Japanese-Language Proficiency Test N2",
      issuer: "JLPT 日本語能力試験",
    },
  ],
  languages: [
    { name: "English", label: "Native", level: 5 },
    { name: "Spanish", label: "Native", level: 5 },
    { name: "Japanese", label: "Proficient", level: 4 },
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
