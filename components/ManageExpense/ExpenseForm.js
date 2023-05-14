import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import Input from './Input'
import Button from '../UI/Button'
import { getFormattedDate } from '../../utils/date'
import { GlobalStyles } from '../../constants/styles'

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submiButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() || '',
      isValid: true,
    },
    date: {
      value: getFormattedDate(defaultValues?.date) || '',
      isValid: true,
    },
    description: {
      value: defaultValues?.description || '',
      isValid: true,
    },
  })

  const inputChangedHandler = (inputId, enteredValue) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputId]: { value: enteredValue, isValid: true },
      }
    })
  }
  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if (amountIsValid && dateIsValid && descriptionIsValid) {
      onSubmit(expenseData)
    } else {
      //Alert.alert('Invalid input', 'Please check your input values')
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        }
      })
    }
  }
  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
          invalid={!inputs.amount.isValid}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          // autoCapitalize: 'none'
          // autoCorrect: false
          onChangeText: inputChangedHandler.bind(this, 'description'),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Inavalid input values, please check entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submiButtonLabel}
        </Button>
      </View>
    </View>
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
})
