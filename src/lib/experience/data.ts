import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/ui";
import { useTranslations } from "@/i18n/utils";
import { checkExperiences } from "./check";
import { formatRange } from "./dates";
import { experienceDates, groupByCompany } from "./group";

export type CompanyData = CollectionEntry<"companies">["data"];
export type ExperienceMeta = CollectionEntry<"experiences">["data"];

export interface ExperienceItem {
  id: string;
  meta: ExperienceMeta;
  detail: CollectionEntry<"experienceDetails">;
  dates: string;
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
  const metas = experiences.map((e) => ({ ...e.data, id: e.id }));
  const problems = checkExperiences(
    companyData,
    metas,
    details.map((d) => ({ id: d.id, highlights: d.data.highlights })),
  );
  if (problems.length > 0) {
    throw new Error(
      "Experience content is incomplete:\n" + problems.join("\n"),
    );
  }

  const present = useTranslations(lang)("index.experience.present");
  const groups = groupByCompany(companyData, metas).map(
    ({ company, experiences }) => ({
      company,
      experiences: experiences.map(({ id, ...meta }) => {
        const { start, end } = experienceDates({ id, ...meta }, company);
        return {
          id,
          meta,
          detail: details.find((d) => d.id === `${id}/${lang}`)!,
          dates: formatRange(start, end, lang, present),
        };
      }),
    }),
  );
  return { groups };
}
