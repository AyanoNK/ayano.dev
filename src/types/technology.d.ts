export interface Technology {
  name: string;
  color: string;
}

type title = {
  title: string;
  description: string;
  milestones: string[];
};

export interface Experience {
  title: string;
  startDate: string;
  companyName: string;
  companyURL: string;
  endDate: string;
  description: string;
  technologies: string[];
  projects: ExperienceProject[];
}

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

export interface Project {
  title: string;
  url: string;
  description: string;
  technologies: string[];
  additionalLinks: ProjectAdditionalLink[];
  video_id: string;
  video_height: string;
  video_width: string;
  miniature: string;
}

export interface ProjectAdditionalLink {
  title: string;
  icon: string;
  url: string;
}
