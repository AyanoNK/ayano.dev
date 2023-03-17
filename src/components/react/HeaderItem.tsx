interface HeaderItemProps {
  title: string;
  index: number;
}

export default function HeaderItem(props: HeaderItemProps) {
  return (
    <li className="float-left">
      <div className="flex flex-col items-end justify-center px-5 lg:px-10">
        <span>{props.index}</span>
        <span>{props.title}</span>
      </div>
    </li>
  );
}
