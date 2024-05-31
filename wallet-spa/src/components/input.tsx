import { UseFormRegisterReturn } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  list?: string;
  listArray?: string[]
}

export default function Input(props: Props) {
  return (
    <>
      <input
        className="w-full rounded-md p-3 font-semibold placeholder-textSecondary text-background "
        {...props}
        {...props.register}
        {...props.list && { list: props.list }}
      />
      {props.list &&
        <datalist id={props.list} >
          {props.listArray?.map((item, index) => (
            <option key={index} value={item} />
          ))}
        </datalist>
      }
    </>
  );
}