import { UUID } from "crypto";
import { TransactionType } from "../types";
import { fetchAPI } from "./fetchAPI";

export const getTransactionsByMonth = async (year: string, month: string) => {
  const token = localStorage.getItem('accessToken');
  const data = await fetchAPI(`transaction/${year}/${month}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return data.json();
}

export const createTransaction = async (transaction: TransactionType) => {
  const token = localStorage.getItem('accessToken');
  const data = await fetchAPI('transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(transaction)
  });

  return data.json();
}

export const deleteTransaction = async (idTransaction: UUID) => {
  const token = localStorage.getItem('accessToken');
  await fetchAPI(`transaction/${idTransaction}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

}