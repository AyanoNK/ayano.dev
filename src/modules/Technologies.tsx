import Tech from "../components/react/Tech";
import { Technology } from "../types/technology";

const technologies: Technology[] = [
  { name: "react", color: "#61dafb" },
  { name: "django", color: "#092e20" },
  { name: "rails", color: "#cc0000" },
];

const languages: Technology[] = [
  { name: "python", color: "#3776ab" },
  { name: "javascript", color: "#f7df1e" },
  { name: "typescript", color: "#3178c6" },
  { name: "ruby", color: "#cc342d" },
];

export default function Technologies() {
  // TODO: add random rainbow between colors when hover
  // setTimeout(() => {
  //   Array.from(document.getElementsByClassName("ricewithmilk")).forEach(
  //     (element) => {
  //       if (element.classList.contains("bg-white"))
  //         element.classList.remove("bg-black");
  //       if (element.classList.contains("text-black"))
  //         element.classList.remove("text-white");
  //     }
  //   );
  // }, 1000);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-5 text-3xl font-bold">Technologies</h1>
      <div className="mb-5 flex flex-row items-center justify-center flex-wrap">
        {technologies.map((technology) => (
          <Tech name={technology.name} />
        ))}
      </div>
      <div className="flex flex-row items-center justify-center flex-wrap">
        {languages.map((language) => (
          <Tech name={language.name} />
        ))}
      </div>
    </div>
  );
}
