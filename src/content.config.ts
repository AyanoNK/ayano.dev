import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: file("src/content/projects.json"),
  schema: z.object({
    order: z.number(),
    titleKey: z.string(),
    shortDescriptionKey: z.string(),
    technologies: z.array(z.string()),
    additionalLinks: z.array(
      z.object({
        title: z.string(),
        icon: z.enum(["github", "google-play"]),
        url: z.string(),
      }),
    ),
    video: z.object({
      id: z.string(),
      width: z.number(),
      height: z.number(),
    }),
    image: z.string().optional(),
    isFeatured: z.boolean(),
  }),
});

const projectDetails = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({}),
});

export const collections = { projects, projectDetails };
