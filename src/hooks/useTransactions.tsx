import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

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
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

interface ProviderProps {
  children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData); // Cria o context

export function TransactionsProvider({ children }: ProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => { // Chamam a API e armazena os dados no setTransactions
    api.get('http://localhost:3000/api/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    });

    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}