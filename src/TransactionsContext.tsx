import { createContext, useState, useEffect } from 'react';
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string
}

interface TransactionsProviderProps {
  children: React.ReactNode;
};

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise <void>;
}
// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
//   createdAt: string;
// }



// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>;

export const TransactionsContext  = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [ transactions, setTransactions ] = useState<Transaction[]>([]);
  useEffect(() => {
    api.get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
      id: transactions.length + 1,
    });
    const { transaction } = response.data;
    setTransactions([
      ...transactions, 
      transaction
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      { children }
    </TransactionsContext.Provider>
  );

}