import { getCollection } from "astro:content";
import { newestFirst } from "@/lib/showcase/select";

export async function getProjects() {
  const projects = await getCollection("projects");
  return newestFirst(
    projects.map((project) => ({
      ...project,
      createdAt: project.data.createdAt,
      highlight: project.data.highlight,
      bigHighlight: project.data.bigHighlight,
    })),
  );
}
