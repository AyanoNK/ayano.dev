import { experience } from "@/i18n/index/experience";
import { expertise } from "@/i18n/index/expertise";
import { projects } from "@/i18n/index/projects";

export const languages = {
  en: "English",
  es: "Spanish",
  ja: "Japanese",
};

export type Lang = "en" | "es" | "ja";

export const defaultLang: Lang = "en";

export const translations = {
  en: { en: "English", es: "Español", ja: "日本語" },
  es: { en: "English", es: "Español", ja: "日本語" },
  ja: { en: "English", es: "Español", ja: "日本語" },
  index: {
    in_construction: {
      en: "In construction",
      es: "En construcción",
      ja: "工事中",
    },
    title: {
      en: "Full Stack Software Engineer",
      es: "Ingeniero de Software Full Stack",
      ja: "フルスタックソフトウェア工学者",
    },
    ...expertise,
    ...experience,
    ...projects,
  },
  header: {
    home: {
      en: "Home",
      es: "Inicio",
      ja: "ホーム",
    },
    about: {
      en: "About",
      es: "Sobre mí",
      ja: "私について",
    },
    work: {
      en: "Work",
      es: "Experiencia",
      ja: "経験",
    },
    projects: {
      en: "Projects",
      es: "Proyectos",
      ja: "プロジェクト",
    },
  },
  footer: {
    contact: {
      en: "Contact",
      es: "Contacto",
      ja: "連絡先",
    },
    links: {
      en: "Links",
      es: "Enlaces",
      ja: "リンク",
    },
    email: {
      en: "Email",
      es: "Email",
      ja: "メールアドレス",
    },
    location: {
      en: "Bogota, Colombia",
      es: "Bogotá, Colombia",
      ja: "コロンビア、ボゴタ",
    },
    github: {
      en: "GitHub",
      es: "GitHub",
      ja: "GitHub",
    },
    linkedin: {
      en: "LinkedIn",
      es: "LinkedIn",
      ja: "LinkedIn",
    },
  },
} as const;
