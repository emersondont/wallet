import { useState } from "react"
import { TransactionType } from "../types"
import { TrashSimple } from 'phosphor-react'
import ModalConfirmation from "./modalConfirmation"
import { UUID } from "crypto";

interface Props {
  transaction: TransactionType;
  handleDeleteTransaction: (idTransaction: UUID) => void;
}

export default function Transaction(props: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [wasClicked, setWasClicked] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
    setWasClicked(!wasClicked)
  }

  return (
    <div
      className="flex items-center justify-between w-full cursor-pointer p-1 border border-transparent rounded-md duration-200 ease-out
      hover:bg-textSecondary hover:bg-opacity-10 hover:border-textSecondary hover:border-opacity-10 
      "
      onClick={(e) => handleClick(e)}
    >
      <p className="flex items-center gap-1">
        <span className="text-xs font-semibold text-textSecondary">
          {props.transaction.date.slice(8, 10)}/{props.transaction.date.slice(5, 7)}
        </span>
        <span className="text-lg">
          {props.transaction.description}
        </span>
      </p>

      <p className={'text-lg font-bold ' + (props.transaction.type === "input" ? 'text-green-600' : 'text-red-600')}>
        R$ {props.transaction.value.toFixed(2)}
      </p>

      <ModalConfirmation
        isOpen={wasClicked}
      >
        <button className="absolute flex items-center gap-1 p-2 rounded-md bg-background text-text
           hover:text-red-700 duration-200 ease-out"
          style={{ left: mousePosition.x, top: mousePosition.y }}
          onClick={() => props.handleDeleteTransaction(props.transaction.idTransaction as UUID)}
        >
          <TrashSimple size={22} />
          <span>Apagar</span>
        </button>
      </ModalConfirmation>
    </div >
  )
}