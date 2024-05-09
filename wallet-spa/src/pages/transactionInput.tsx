import NewTransaction from "../components/newTransaction"

const listArray = [
  'Salário',
  'Pix',
  'Investimento',
  'Outros'
]

export default function TransactionInput() {
  return (
    <NewTransaction
      type="input"
      listArray={listArray}
    />
  )
}