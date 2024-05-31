import { ArrowLeft } from 'phosphor-react'
import { useNavigate } from 'react-router-dom';
import Input from './input';
import Button from './button';
import ErrorMessage from './errorMessage';
import { createTransaction } from '../services/transactions';
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  type: "input" | "output"
  listArray: string[]
}

const transactionSchema = z.object({
  value: z.coerce.number().min(0.01),
  description: z.string().min(1),
  date: z.coerce.date()
})
type TransactionSchema = z.infer<typeof transactionSchema>

export default function NewTransaction(props: Props) {
  const navigate = useNavigate();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<TransactionSchema>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0] as unknown as Date
    }
  })

  const handleNewTransaction: SubmitHandler<TransactionSchema> = async (data) => {
    const { value, description, date } = data;

    try {
      await createTransaction({
        description,
        value,
        date: date.toISOString().split('T')[0],
        type: props.type
      });
      navigate(-1);
    } catch (error) {
      setError("root", { message: String(error) })
    }
  }

  const onError = () => {
    setError("root", { message: "Preencha todos os campos." })
  }

  return (
    <div className='flex flex-col gap-6 items-start'>
      <div className='flex flex-col gap-3 items-start w-full'>
        <button
          className="flex p-1 hover:bg-textSecondary hover:bg-opacity-50 rounded duration-200 ease-out"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={32} />
        </button>

        <h1 className="text-2xl font-bold w-full text-center">Adicionar {props.type === "input" ? "Ganho" : "Gasto"}</h1>
      </div>
      <ErrorMessage error={errors.root} />
      <form onSubmit={handleSubmit(handleNewTransaction, onError)} className="flex flex-col gap-3 w-full">
        <Input
          type="number"
          placeholder="Valor"
          register={register('value')}
        />
        <Input
          placeholder="Descrição"
          register={register('description')}
          list='options'
          listArray={props.listArray}
        />
        <Input
          type="date"
          placeholder="Data"
          register={register('date')}
        />
        <Button
          type="submit"
          className="bg-primary"
        >
          Salvar
        </Button>
      </form>
    </div>
  )

}