import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { projectDetailsLoader, projectsLoader } from "@/lib/showcase/loader";

const text = z.object({ title: z.string(), description: z.string() });

const projects = defineCollection({
  loader: projectsLoader(),
  schema: ({ image }) => {
    const media = z.discriminatedUnion("kind", [
      z.object({
        kind: z.literal("image"),
        src: image(),
        label: z.string().optional(),
      }),
      z.object({
        kind: z.literal("video"),
        src: z.string(),
        label: z.string().optional(),
      }),
    ]);
    return z.object({
      createdAt: z.date(),
      isPrivate: z.boolean(),
      url: z.string(),
      highlight: z.boolean(),
      bigHighlight: z.boolean(),
      technologies: z.array(z.string()),
      links: z.array(z.object({ title: z.string(), url: z.string() })),
      text: z.object({ en: text, es: text, ja: text }),
      cover: media.optional(),
      highlightMedia: media.optional(),
      bigHighlightMedia: media.optional(),
      carousel: z.array(media),
    });
  },
});

const projectDetails = defineCollection({
  loader: projectDetailsLoader(),
  schema: z.object({}),
});

const localeText = z.object({
  en: z.string().min(1),
  es: z.string().min(1),
  ja: z.string().min(1),
});
const month = z.string().regex(/^\d{4}-\d{2}$/, "Use YYYY-MM");
const experienceBase = "src/content/experience";

const companies = defineCollection({
  loader: file(`${experienceBase}/companies.yaml`),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    url: z.url(),
    order: z.number(),
    location: localeText.optional(),
    summary: localeText,
    technologies: z.array(z.string()).default([]),
    roles: z
      .array(
        z.object({
          id: z.string(),
          title: localeText,
          start: month,
          end: month.optional(),
        }),
      )
      .min(1),
  }),
});

const experiences = defineCollection({
  loader: glob({
    pattern: "*/*/meta.yaml",
    base: experienceBase,
    generateId: ({ entry }) => entry.replace(/\/meta\.yaml$/, ""),
  }),
  schema: z.object({
    role: z.string(),
    order: z.number(),
    start: month.optional(),
    end: month.optional(),
    home: z.boolean().default(false),
    technologies: z.array(z.string()),
    links: z.array(z.object({ title: localeText, url: z.url() })).default([]),
  }),
});

const experienceDetails = defineCollection({
  loader: glob({
    pattern: "*/*/{en,es,ja}.md",
    base: experienceBase,
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string().min(1),
    client: z.string().min(1),
    summary: z.string().min(1),
    highlights: z.array(z.string().min(1)).max(5),
  }),
});

export const collections = {
  projects,
  projectDetails,
  companies,
  experiences,
  experienceDetails,
};
