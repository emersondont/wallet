import NewTransaction from "../components/newTransaction"

const listArray = [
  'Aluguel',
  'Mercado',
  'Luz',
  'Água',
  'Internet',
  'Telefone',
  'Transporte',
  'Lazer',
  'Saúde',
  'Educação',
  'Investimento',
  'Outros'
]

export default function TransactionOutput() {
  return (
    <NewTransaction
      type="output"
      listArray={listArray}
    />
  )
}