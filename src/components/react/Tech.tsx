import React from "react";
import react from "../../img/svg/react.svg";
import django from "../../img/svg/django.svg";
import rails from "../../img/svg/rails.svg";
import python from "../../img/svg/python.svg";
import javascript from "../../img/svg/javascript.svg";
import typescript from "../../img/svg/typescript.svg";
import ruby from "../../img/svg/ruby.svg";
interface TechnologyProps {
  name: string;
}

export default function Tech(props: TechnologyProps) {
  const imgs = {
    react: react,
    django: django,
    rails: rails,
    python: python,
    javascript: javascript,
    typescript: typescript,
    ruby: ruby,
  };

  return (
    <div
      className="ricewithmilk mx-2 flex flex-row items-center justify-center rounded px-4 py-3 hover:animate-rainbow"
      ref={React.createRef()}
    >
      <img src={imgs[props.name]} alt={props.name} className="h-10 pr-3" />
      <span>{props.name}</span>
    </div>
  );
}
