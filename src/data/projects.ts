import type { ProjectAdditionalLink } from "@/types/technology";

export interface ProjectData {
  slug: string;
  titleKey: string;
  shortDescriptionKey: string;
  url: string;
  technologies: string[];
  additionalLinks: ProjectAdditionalLink[];
  video_id: string;
  video_width: string;
  video_height: string;
  miniature: string;
  representativeImage: string;
  galleryImages: string[];
  isFeatured: boolean;
}

export const projectsData: ProjectData[] = [
  {
    slug: "bank",
    titleKey: "index.projects.bank.title",
    shortDescriptionKey: "index.projects.bank.description",
    url: "https://github.com/AyanoNK/bank-sms-manager",
    technologies: [
      "Kotlin",
      "Jetpack Compose",
      "Material3",
      "Jetpack Glance",
      "XML",
      "Google Play Store",
    ],
    additionalLinks: [
      { title: "Play Store (soon)", icon: "google-play", url: "#" },
      {
        title: "GitHub",
        icon: "github",
        url: "https://github.com/AyanoNK/bank-sms-manager",
      },
    ],
    video_id: "bank",
    video_width: "246",
    video_height: "332",
    miniature: "mini_bank",
    representativeImage: "",
    galleryImages: [],
    isFeatured: true,
  },
  {
    slug: "kimon",
    titleKey: "index.projects.kimon.title",
    shortDescriptionKey: "index.projects.kimon.description",
    url: "https://www.kimon.app/",
    technologies: [
      "NextJS",
      "React",
      "Vercel",
      "Supabase",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "SCSS",
    ],
    additionalLinks: [
      {
        title: "GitHub",
        icon: "github",
        url: "https://github.com/AyanoNK/kanji-lyrics-frontend",
      },
    ],
    video_id: "kimon",
    video_width: "268",
    video_height: "438",
    miniature: "mini_kimon",
    representativeImage: "/webp/mini_kimon.webp",
    galleryImages: [],
    isFeatured: false,
  },
  {
    slug: "atlapetes",
    titleKey: "index.projects.atlapetes.title",
    shortDescriptionKey: "index.projects.atlapetes.description",
    url: "https://github.com/AyanoNK/atlapetes-blancae",
    technologies: [
      "Kotlin",
      "PyTorch",
      "Android Studio",
      "Java",
      "CameraX",
      "XML",
      "Google Play Store",
    ],
    additionalLinks: [
      {
        title: "GitHub",
        icon: "github",
        url: "https://github.com/AyanoNK/atlapetes-blancae",
      },
    ],
    video_id: "atlapetes",
    video_width: "242",
    video_height: "540",
    miniature: "mini_atlapetes",
    representativeImage: "/webp/mini_atlapetes.webp",
    galleryImages: [],
    isFeatured: false,
  },
  {
    slug: "poshaus",
    titleKey: "index.projects.poshaus.title",
    shortDescriptionKey: "index.projects.poshaus.description",
    url: "https://www.poshaus.art/",
    technologies: [
      "Astro",
      "React",
      "Vercel",
      "Tailwind CSS",
      "JavaScript",
      "TypeScript",
      "HTML",
      "CSS",
      "SCSS",
    ],
    additionalLinks: [
      {
        title: "GitHub",
        icon: "github",
        url: "https://github.com/AyanoNK/poshaus",
      },
    ],
    video_id: "poshaus",
    video_width: "244",
    video_height: "384",
    miniature: "mini_poshaus",
    representativeImage: "/webp/mini_poshaus.webp",
    galleryImages: [],
    isFeatured: false,
  },
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projectsData.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectsData.map((p) => p.slug);
}
