
interface Props {
  type: "text" | "number" | "password" | "date" | "email";
  placeholder: string;
  value: string | number;
  setValue: ((value: string) => void) | ((value: number) => void);
  list?: string;
  listArray?: string[]
}

export default function Input(props: Props) {
  return (
    <>
      <input
        className="w-full rounded-md p-3 font-semibold placeholder-textSecondary text-background "
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        {...props.type === 'number' && { step: '0.01' }}
        {...props.list && { list: props.list }}
        onChange={(e) => {
          // Verifica o tipo de props.value e chama a função setValue apropriada
          if (props.type === 'number') {
            (props.setValue as (value: number) => void)(parseFloat(e.target.value));
          } else {
            (props.setValue as (value: string) => void)(e.target.value);
          }
        }}
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