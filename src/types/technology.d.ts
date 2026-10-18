type title = {
  title: string;
  description: string;
  milestones: string[];
};

export interface NewExperience {
  titles: title[];
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
