import { ArrowLeft } from 'phosphor-react'
import { useNavigate } from 'react-router-dom';
import Input from './input';
import Button from './button';
import { FormEvent, useEffect, useState } from 'react';
import ErrorMessage from './errorMessage';
import { createTransaction } from '../services/transactions';
interface Props {
  type: "input" | "output"
  listArray: string[]
}

export default function NewTransaction(props: Props) {
  const [value, setValue] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState<any>(null)
  const navigate = useNavigate();

  const handleNewTransaction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!value || !description || !date) return setError({message: 'Preencha todos os campos.'});

    try {
      await createTransaction({description, value, date, type: props.type});
    } catch (error) {
      setError(error);
    }
    if(!error)
      navigate(-1);
  }

  useEffect(() => {
    setError(null);
  }, [value, description, date])

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
      <ErrorMessage error={error}/>
      <form onSubmit={(e) => handleNewTransaction(e)} className="flex flex-col gap-3 w-full">
        <Input
          type="number"
          placeholder="Valor"
          value={value}
          setValue={setValue}
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          setValue={setDescription}
          list='options'
          listArray={props.listArray}
        />
        <Input
          type="date"
          placeholder="Data"
          value={date}
          setValue={setDate}
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