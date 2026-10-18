import { EMAIL, GITHUB, LINKEDIN } from "astro:env/server";
import { MailIcon, GithubIcon, LinkedinIcon } from "@lucide/astro";

export const CONTACT_LINKS = [
  {
    Icon: GithubIcon,
    href: GITHUB,
    label: "GitHub",
    external: true,
  },
  {
    Icon: LinkedinIcon,
    href: LINKEDIN,
    label: "LinkedIn",
    external: true,
  },
  {
    Icon: MailIcon,
    href: `mailto:${EMAIL}`,
    label: "Email",
    external: false,
  },
];
