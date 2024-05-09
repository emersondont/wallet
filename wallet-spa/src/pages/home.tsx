import { useEffect, useState } from "react";
import { getUser } from "../services/user";
import { TransactionType, UserType } from "../types";
import { deleteTransaction, getTransactionsByMonth } from "../services/transactions";
import { SignOut, CaretDown, CaretUp, PlusCircle, MinusCircle } from 'phosphor-react'
import { useNavigate } from "react-router-dom";
import MonthPicker, { months } from "../components/monthPicker";
import Button from "../components/button";
import Transaction from "../components/transaction";
import { UUID } from "crypto";

export default function Home() {
  const [userData, setUserData] = useState<UserType | null>(null);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [balance, setBalance] = useState(0);
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser();
        setUserData(userData);
        
        const transactions = await getTransactionsByMonth(year, month);
        setTransactions(transactions);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchData();

  }, [, month, year]);

  useEffect(() => {
    const updBalance = async () => {
      const balance = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'input') {
          return acc + transaction.value;
        } else {
          return acc - transaction.value;
        }
      }, 0);

      setBalance(balance);
    };

    updBalance();

  }, [transactions]);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleDeleteTransaction = async (idTransaction: UUID) => {
    try {
      await deleteTransaction(idTransaction);

      const newTransactions = transactions.filter(transaction => transaction.idTransaction !== idTransaction);
      setTransactions(newTransactions);

    } catch (error) {
      console.error('Erro ao deletar transação:', error);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {/* user name and logout */}
      <div className="text-text text-lg flex w-full justify-end items-center gap-2">
        <p>Olá, {userData?.name}</p>
        <button
          onClick={handleSignOut}
          className="flex p-1 hover:bg-textSecondary hover:bg-opacity-50 rounded duration-200 ease-out"
        >
          <SignOut size={28} />
        </button>
      </div>

      {/* balance and set month*/}
      <div className="flex w-full justify-between relative">
        <div className="flex flex-col gap-1 p-1">
          <p className="text-sm text-textSecondary">Saldo</p>
          <p className="text-2xl font-bold text-text">R$ {balance.toFixed(2)}</p>
        </div>

        <button
          className="flex flex-col gap-1 p-1 hover:bg-textSecondary hover:bg-opacity-50 rounded duration-200 ease-out"
          onClick={() => setModalIsOpen(!modalIsOpen)}
        >
          <p className="text-sm text-textSecondary flex gap-1 items-center justify-end">
            <span>Mês</span>
            {
              modalIsOpen ? <CaretUp size={20} /> : <CaretDown size={20} />
            }
          </p>
          <p className="text-lg font-bold text-text">{months.find(m => m.index === month)?.label}/{year.slice(-2)}</p>
        </button>
        <MonthPicker
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </div>

      {/* transactions */}
      <div className="bg-text text-background flex flex-col gap-1 p-3 rounded-md h-96 md:h-64 overflow-y-auto">
        {
          transactions.map(transaction => (
            <Transaction 
              key={transaction.idTransaction}
              transaction={transaction}
              handleDeleteTransaction={handleDeleteTransaction}
            />
          ))
        }
      </div>

      {/* buttons */}
      <div className="flex gap-1 text-text flex-wrap lg:flex-nowrap">
        <Button
          className="bg-green-600 md:min-w-80"
          onClick={() => navigate('transaction/input')}
        >
          <PlusCircle size={24} />
          <span>Adicionar Ganho</span>
        </Button>
        <Button
          className="bg-red-600 md:min-w-80"
          onClick={() => navigate('transaction/output')}
        >
          <MinusCircle size={24} />
          <span>Adicionar Gasto</span>
        </Button>
      </div>

    </div>
  );
}