import { locales } from "@/i18n/ui";
import type { HomePick } from "./group";

/** Markdown image whose path is not a full http(s) URL. */
const MIN_HOME_LINES = 3;

const LOCAL_IMAGE = /!\[[^\]]*\]\((?!https?:\/\/)/;

export interface CompanyRef {
  id: string;
  roles: { id: string }[];
}

export interface ExperienceRef {
  id: string;
  company: string;
  role: string;
  home: HomePick[];
}

/** `id` is "<company>/<section>/<lang>". */
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
      } else if (LOCAL_IMAGE.test(detail.body)) {
        problems.push(
          `${experience.id}: ${lang}.md uses a local image, which company pages cannot show; use a full https:// URL`,
        );
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
    const cut = detail.id.lastIndexOf("/");
    const experienceId = detail.id.slice(0, cut);
    const lang = detail.id.slice(cut + 1);
    if (!experienceIds.has(experienceId)) {
      problems.push(`${experienceId}: has ${lang}.md but no meta.yaml`);
    }
  }

  for (const experience of experiences) {
    const count = detailsById.get(`${experience.id}/en`)?.highlights.length;
    if (count === undefined) continue;
    for (const pick of experience.home) {
      if (pick !== "summary" && pick > count) {
        problems.push(
          `${experience.id}: home picks highlight ${pick}, but there are ${count}`,
        );
      }
    }
  }

  for (const company of companies) {
    const sections = experiences.filter((e) => e.company === company.id);
    if (sections.length === 0) {
      problems.push(`${company.id}: has no sections`);
      continue;
    }
    const lines = sections.reduce((sum, e) => sum + e.home.length, 0);
    if (lines < MIN_HOME_LINES) {
      problems.push(
        `${company.id}: home card has ${lines} ${lines === 1 ? "line" : "lines"}, needs at least ${MIN_HOME_LINES}`,
      );
    }
  }

  return problems;
}
