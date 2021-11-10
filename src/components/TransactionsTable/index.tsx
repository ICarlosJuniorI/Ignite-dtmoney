import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";



export function TransactionsTable() {
  const { transactions } = useTransactions();

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => ( // Retorna as transações
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', { // Formata o valor para R$
                  style: 'currency',
                  currency: 'BRL',
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>{new Intl.DateTimeFormat('pt-BR').format( // Formata a data
                new Date(transaction.createdAt)
              )}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}