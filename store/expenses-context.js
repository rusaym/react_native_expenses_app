import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
})

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'UPDATE':
      const updatableIdx = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableIdx]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableIdx] = updatedItem
      return updatedExpenses
    case 'SET':
      const inverted = action.payload.reverse()
      return inverted
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [exensesState, dispatch] = useReducer(expensesReducer, [])

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData })
  }

  const setExpenses = (expenses) => {
    dispatch({ type: 'SET', payload: expenses })
  }

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE', payload: id })
  }

  const updateExpense = (id, expenseData) => {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  const value = {
    expenses: exensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
