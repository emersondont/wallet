
interface Props {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined
  onClick?: () => void;
  className?: string;
}

export default function Button(props: Props) {
  return (
    <button
    className={'w-full p-3 rounded-md font-semibold text-text hover:bg-opacity-80 duration-200 ease-out flex justify-center items-center gap-1 ' + props.className}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}