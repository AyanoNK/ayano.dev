import { locales } from "@/i18n/ui";

export interface CompanyRef {
  id: string;
  roles: { id: string }[];
}

export interface ExperienceRef {
  id: string;
  company: string;
  role: string;
}

/** `id` is "<experience id>/<lang>". */
export interface DetailRef {
  id: string;
  highlights: string[];
  body: string;
}

/** Returns one message per problem. An empty list means the content is complete. */
export function checkExperiences(
  companies: CompanyRef[],
  experiences: ExperienceRef[],
  details: DetailRef[],
): string[] {
  const problems: string[] = [];
  const detailsById = new Map(details.map((d) => [d.id, d]));
  const experienceIds = new Set(experiences.map((e) => e.id));

  for (const experience of experiences) {
    const company = companies.find((c) => c.id === experience.company);
    if (!company) {
      problems.push(
        `${experience.id}: unknown company "${experience.company}"`,
      );
    } else if (!company.roles.some((r) => r.id === experience.role)) {
      problems.push(
        `${experience.id}: unknown role "${experience.role}" in company "${experience.company}"`,
      );
    }

    const english = detailsById.get(`${experience.id}/en`);
    for (const lang of locales) {
      const detail = detailsById.get(`${experience.id}/${lang}`);
      if (!detail) {
        problems.push(`${experience.id}: missing ${lang}.md`);
      } else if (detail.body.trim() === "") {
        problems.push(`${experience.id}: ${lang}.md has no body`);
      } else if (
        english &&
        detail.highlights.length !== english.highlights.length
      ) {
        problems.push(
          `${experience.id}: ${lang}.md has ${detail.highlights.length} highlights, en.md has ${english.highlights.length}`,
        );
      }
    }
  }

  for (const detail of details) {
    const [experienceId, lang] = detail.id.split("/");
    if (!experienceIds.has(experienceId)) {
      problems.push(`${experienceId}: has ${lang}.md but no meta.yaml`);
    }
  }

  return problems;
}
