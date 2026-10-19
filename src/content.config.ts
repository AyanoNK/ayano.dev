import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { projectDetailsLoader, projectsLoader } from "@/lib/showcase/loader";

const text = z.object({ title: z.string(), description: z.string() });

const projects = defineCollection({
  loader: projectsLoader(),
  schema: ({ image }) => {
    const media = z.discriminatedUnion("kind", [
      z.object({ kind: z.literal("image"), src: image() }),
      z.object({ kind: z.literal("video"), src: z.string() }),
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

export const collections = { projects, projectDetails };
