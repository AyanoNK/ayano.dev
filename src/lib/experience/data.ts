import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/ui";
import { useTranslations } from "@/i18n/utils";
import { checkExperiences } from "./check";
import { formatRange } from "./dates";
import { experienceDates, groupByCompany, homeLines } from "./group";

export type CompanyData = CollectionEntry<"companies">["data"];
export type ExperienceMeta = CollectionEntry<"experiences">["data"];

export type RoleData = CompanyData["roles"][number];

export interface ExperienceItem {
  /** "<company>/<section>" */
  id: string;
  /** The section folder name, used as the anchor on the company page. */
  section: string;
  meta: ExperienceMeta;
  role: RoleData;
  detail: CollectionEntry<"experienceDetails">;
  dates: string;
  /** The lines this section puts on the home card, in this language. */
  homeLines: string[];
}

export interface CompanyGroup {
  company: CompanyData;
  experiences: ExperienceItem[];
}

/** Loads every company and experience for one language. Throws when any content is missing or wrong. */
export async function getExperienceData(
  lang: Lang,
): Promise<{ groups: CompanyGroup[] }> {
  const [companies, experiences, details] = await Promise.all([
    getCollection("companies"),
    getCollection("experiences"),
    getCollection("experienceDetails"),
  ]);

  const companyData = companies.map((c) => c.data);
  const metas = experiences.map((e) => ({
    ...e.data,
    id: e.id,
    company: e.id.split("/")[0],
  }));
  const problems = checkExperiences(
    companyData,
    metas,
    details.map((d) => ({
      id: d.id,
      highlights: d.data.highlights,
      body: d.body ?? "",
    })),
  );
  if (problems.length > 0) {
    throw new Error(
      "Experience content is incomplete:\n" + problems.join("\n"),
    );
  }

  const present = useTranslations(lang)("index.experience.present");
  const experiencesById = new Map(experiences.map((e) => [e.id, e]));
  const groups = groupByCompany(companyData, metas).map(
    ({ company, experiences }) => ({
      company,
      experiences: experiences.map((item) => {
        const { id } = item;
        const { start, end } = experienceDates(item, company);
        const detail = details.find((d) => d.id === `${id}/${lang}`)!;
        return {
          id,
          section: id.split("/")[1],
          meta: experiencesById.get(id)!.data,
          role: company.roles.find((r) => r.id === item.role)!,
          detail,
          dates: formatRange(start, end, lang, present),
          homeLines: homeLines(
            item.home,
            detail.data.summary,
            detail.data.highlights,
          ),
        };
      }),
    }),
  );
  return { groups };
}
