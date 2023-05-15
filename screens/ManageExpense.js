import { useContext, useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import IconButton from '../components/UI/IconButton'
import { GlobalStyles } from '../constants/styles'
import { ExpensesContext } from '../store/expenses-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { deleteExpense, storeExpense, updateExpense } from '../utils/http'
import LoadingOverlay from '../components/UI/LoadingOverlay'
import ErrorOverlay from '../components/UI/ErrorOverlay'

const ManageExpense = ({ route, navigation }) => {
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [error, setError] = useState(null)

  const expensesCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId

  const isEditing = !!editedExpenseId

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    })
  }, [navigation, isEditing])

  const deleteExpenseHandler = async () => {
    setIsSubmiting(true)
    try {
      await deleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError(error.message)
      setIsSubmiting(false)
    }
  }

  const confirmHandler = async (expenseData) => {
    setIsSubmiting(true)

    try {
      if (isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseData)
        await updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError(error.message)
      setIsSubmiting(false)
    }
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  if (error && !isSubmiting) return <ErrorOverlay message={error} />

  if (isSubmiting) return <LoadingOverlay />

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        submiButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
})
