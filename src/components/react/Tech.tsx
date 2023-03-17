import React from "react";

interface TechnologyProps {
  name: string;
}

export default function Tech(props: TechnologyProps) {
  return (
    <div
      className="ricewithmilk mx-2 flex flex-row items-center justify-center rounded px-4 py-3 hover:animate-rainbow"
      ref={React.createRef()}
    >
      <img
        src={`/img/svg/${props.name}.svg`}
        alt={props.name}
        className="h-10 pr-3"
      />
      <span>{props.name}</span>
    </div>
  );
}
