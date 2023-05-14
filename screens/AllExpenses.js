import { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expenses-context'

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)

  return (
    <ExpensesOutput
      expensesPeriod='Total'
      expenses={expensesCtx.expenses}
      fallBackText='No expenses registered found!'
    />
  )
}

export default AllExpenses
