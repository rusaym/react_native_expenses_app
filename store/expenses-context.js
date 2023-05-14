import { createContext, useReducer } from 'react'

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-05-09'),
  },
  {
    id: 'e2',
    description: 'A pair of trauses',
    amount: 89.29,
    date: new Date('2022-12-01'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-05-09'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
  {
    id: 'e7',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-05-09'),
  },
  {
    id: 'e8',
    description: 'A pair of trauses',
    amount: 89.29,
    date: new Date('2022-12-01'),
  },
  {
    id: 'e9',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2022-05-09'),
  },
  {
    id: 'e10',
    description: 'A book',
    amount: 14.99,
    date: new Date('2022-02-19'),
  },
  {
    id: 'e11',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2022-02-18'),
  },
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
})

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload, id: id }, ...state]
    case 'UPDATE':
      const updatableIdx = state.findIndex(
        (expense) => expense.id === action.payload.id
      )
      const updatableExpense = state[updatableIdx]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableIdx] = updatedItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default:
      return state
  }
}

const ExpensesContextProvider = ({ children }) => {
  const [exensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES)

  const addExpense = (expenseData) => {
    dispatch({ type: 'ADD', payload: expenseData })
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
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}

export default ExpensesContextProvider
