
import { useTransactions } from '../../hooks/useTransactions';

import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import TotalImg from '../../assets/total.svg';

import { Container } from "./styles";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce((accumulator, transaction) => {
    if(transaction.type === 'deposit') {
      accumulator.deposits += transaction.amount;
      accumulator.total += transaction.amount;
    } else {
      accumulator.withdraws += transaction.amount;
      accumulator.total -= transaction.amount;
    }
    // accumulator.income += Number(transaction.type === 'income' ? transaction.value : 0);
    // accumulator.outcome += Number(transaction.type === 'outcome' ? transaction.value : 0);
    return accumulator; 
  },{
    deposits: 0,
    withdraws: 0,
    total: 0
  });
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={ IncomeImg } alt="Entradas" />
        </header>
        <strong>
          { 
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              }).format(summary.deposits) 
          }
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={ OutcomeImg } alt="Saidas" />
        </header>
        <strong>- 
          { 
            new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
              }).format(summary.withdraws) 
          }
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={ TotalImg } alt="Total" />
        </header>
        <strong>
        { 
          new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summary.total) 
          }
        </strong>
      </div>
    </Container>
  );
}