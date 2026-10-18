export interface ExperienceTitle {
  title: string;
  description: string;
  milestones: string[];
}

export interface NewExperience {
  titles: ExperienceTitle[];
  startDate: string;
  companyName: string;
  companyURL: string;
  endDate: string;
  technologies: string[];
  projects: ExperienceProject[];
}

export interface ExperienceProject {
  title: string;
  url: string;
}
