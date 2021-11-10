import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from './services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => void;
}

interface ProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData); // Cria o context

export function TransactionsProvider({ children }: ProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => { // Chamam a API e armazena os dados no setTransactions
    api.get('http://localhost:3000/api/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  function createTransaction(transaction: TransactionInput) {
    api.post('/transactions', transaction);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}