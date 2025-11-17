import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";

export default function ButtonDemo() {
  const handleLinkedInClick = () =>
    window.open("https://www.linkedin.com/in/ayanonk/", "_blank");

  const handleGitHubClick = () =>
    window.open("https://github.com/AyanoNK", "_blank");

  return (
    <div className="flex flex-row gap-4">
      <Button onClick={handleLinkedInClick}>
        <Linkedin />
      </Button>
      <Button variant="neutral" onClick={handleGitHubClick}>
        <Github />
      </Button>
    </div>
  );
}
