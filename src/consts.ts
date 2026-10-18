import { MailIcon, GithubIcon, LinkedinIcon } from "@lucide/astro";

export const CONTACT_LINKS = [
  {
    Icon: GithubIcon,
    href: import.meta.env.GITHUB,
    label: "GitHub",
    external: true,
  },
  {
    Icon: LinkedinIcon,
    href: import.meta.env.LINKEDIN,
    label: "LinkedIn",
    external: true,
  },
  {
    Icon: MailIcon,
    href: `mailto:${import.meta.env.EMAIL}`,
    label: "Email",
    external: false,
  },
];
