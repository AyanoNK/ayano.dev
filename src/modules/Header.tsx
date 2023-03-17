import HeaderItem from "../components/react/HeaderItem";

const headerTitles = ["Home", "About", "Work", "Projects"];

export default function Header() {
  return (
    <header className="hidden h-32 flex-1 flex-col items-center justify-center px-4 align-middle sm:flex">
      <ul className="m-0 list-none p-0">
        {headerTitles.map((title, index) => (
          <HeaderItem title={title} index={index} />
        ))}
      </ul>
    </header>
  );
}
