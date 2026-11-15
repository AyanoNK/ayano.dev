export interface Role {
  id: string;
  start: string;
  end?: string;
}

export interface Company {
  id: string;
  order: number;
  roles: Role[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  order: number;
  start?: string;
  end?: string;
  home: boolean;
}

const byOrder = (a: { order: number }, b: { order: number }) =>
  a.order - b.order;

/** Companies in order, each with its experiences in order. Companies without experiences are left out. */
export function groupByCompany<C extends Company, E extends Experience>(
  companies: C[],
  experiences: E[],
): { company: C; experiences: E[] }[] {
  return [...companies]
    .sort(byOrder)
    .map((company) => ({
      company,
      experiences: experiences
        .filter((e) => e.company === company.id)
        .sort(byOrder),
    }))
    .filter((group) => group.experiences.length > 0);
}

/** The experience's own dates when it has a start, otherwise its role's dates. */
export function experienceDates(
  experience: Experience,
  company: Company,
): { start: string; end?: string } {
  if (experience.start) {
    return { start: experience.start, end: experience.end };
  }
  const role = company.roles.find((r) => r.id === experience.role);
  if (!role) {
    throw new Error(
      `${experience.id}: unknown role "${experience.role}" in company "${company.id}"`,
    );
  }
  return { start: role.start, end: role.end };
}
