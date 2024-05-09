interface Props {
  error: any;
}

export default function ErrorMessage(props: Props) {
  return props.error &&
    <p className="w-full text-red-500 text-center text-sm text-wrap bg-red-500 bg-opacity-20 rounded p-1 border border-red-500 border-opacity-20">
      {props.error.message}
    </p>

}