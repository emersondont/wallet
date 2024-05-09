
interface Props {
  children: React.ReactNode;
  isOpen: boolean;
}

export default function ModalConfirmation(props: Props) {
  return props.isOpen ? (
    <div className="absolute w-screen h-screen right-0 top-0">
      {props.children}
    </div>
  ) :
  null
}