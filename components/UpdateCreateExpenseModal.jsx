import { View, Text, Modal, Button, TextInput, ActivityIndicator, ScrollView, StyleSheet, Pressable } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { useExpensesStore } from '@/store/expensesStore'
import { UpdateCreateOptionExpense } from '@/components/UpdateCreateOptionExpense'
import { ModalSeleccionarCatergoria } from '@/components/modals/ModalSeleccionarCatergoria'
import { ModalSeleccionarMetodoDePago } from '@/components/modals/ModalSeleccionarMetodoDePago'
import { ModalDisabledOption } from '@/components/modals/ModalDisabledOption'
import { ModalConfirmOptionDelete } from '@/components/modals/ModalConfirmOptionDelete'
import { ModalDatePicker } from '@/components/modals/ModalDatePicker'
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message'

export const UpdateCreateExpenseModal = ({ refRBSheet }) => {
  const { modalUpdateCreateExpense, paymentMethods, categories, addExpense, updateExpense, expensesWithRelations } = useExpensesStore(state => state)
  const categoryDefault = categories.find(category => !category.disabled)
  const paymentMethodDefault = paymentMethods.find(paymentMethod => !paymentMethod.disabled)
  const [modalNewOptionVisible, setModalNewOptionVisible] = useState({ show: false })
  const [modalDisabledOptionsVisible, setModalDisabledOptionsVisible] = useState(false)
  const [optionNameDisabled, setOptionNameDisabled] = useState()
  const [dateValue, setDateValue] = useState(new Date())
  const [newExpense, setNewExpense] = useState({ value: '', description: '' })
  const [category, setCategory] = useState(categoryDefault)
  const [paymentMethod, setpaymentMethod] = useState(paymentMethodDefault)
  const [optionIdDelete, setOptionIdDelete] = useState()
  const [modalDeleteOptionVisible, setModalDeleteOptionVisible] = useState()
  const inputValueRef = useRef(null);

  useEffect(() => {
    if (!inputValueRef) return
    inputValueRef.current.focus();
  }, [inputValueRef])

  useEffect(() => {
    const categoryDefault = categories.find(category => !category.disabled)
    const paymentMethodDefault = paymentMethods.find(paymentMethod => !paymentMethod.disabled)
    setCategory(categoryDefault)
    setpaymentMethod(paymentMethodDefault)
  }, [expensesWithRelations])

  useEffect(() => {
    if (modalUpdateCreateExpense.show === false) return
    if (modalUpdateCreateExpense && modalUpdateCreateExpense.type === 'edit') {
      setNewExpense(modalUpdateCreateExpense.optionSelect)
      setCategory(modalUpdateCreateExpense.optionSelect.category)
      setpaymentMethod(modalUpdateCreateExpense.optionSelect.paymentMethod)
    }
  }, [modalUpdateCreateExpense])

  const onChangeNewExpenseProp = (key, value) => { setNewExpense(prevState => ({ ...prevState, [key]: value })) }

  const createNewExpense = () => {
    if (modalUpdateCreateExpense.type === 'edit') {
      const newExpenseEdited = {
        ...newExpense,
        paymentDate: dateValue,
        lastModificationDate: new Date(),
        paymentMethod: {},
        category: {},
        paymentMethodId: paymentMethod?.id,
        categoryId: category?.id
      }
      updateExpense(newExpenseEdited);
      Toast.show({
        type: 'success',
        text1: 'Gasto editado satisfactoriamente 👋'
      });
      refRBSheet.current.close()
      console.log('edit');
    }

    if (modalUpdateCreateExpense.type === 'create') {
      if ('value' in newExpense && newExpense.value != '') {
        const newExpenseObj = {
          ...newExpense,
          id: uuid.v4(),
          paymentDate: dateValue,
          creationDate: new Date(),
          lastModificationDate: new Date(),
          paymentMethod: {},
          category: {},
          paymentMethodId: paymentMethod?.id,
          categoryId: category?.id
        }

        addExpense(newExpenseObj)
        Toast.show({
          type: 'success',
          text1: 'Nuevo gasto registrado 👋'
        });
        console.log('create');
        refRBSheet.current.close()
      }
    }
  }

  return (
    <>
      <UpdateCreateOptionExpense modalNewOptionVisible={modalNewOptionVisible} setModalNewOptionVisible={setModalNewOptionVisible} />
      <ModalConfirmOptionDelete optionId={optionIdDelete} setVisible={setModalDeleteOptionVisible} visible={modalDeleteOptionVisible} />
      <ModalDisabledOption optionName={optionNameDisabled} visible={modalDisabledOptionsVisible} setVisible={setModalDisabledOptionsVisible} />
      <View >
        <ScrollView>
          <View style={{ gap: 5, paddingHorizontal: 20, marginTop: 10, marginBottom: 40 }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginBottom: 10 }}>Nuevo gasto 💸</Text>
            <TextInput
              keyboardType='numeric'
              onChangeText={(e) => onChangeNewExpenseProp('value', e)}
              value={newExpense.value}
              ref={inputValueRef}
              placeholder='Valor'
              style={styles.input}
            />
            <TextInput
              placeholder='Descripcion'
              value={newExpense.description}
              onChangeText={(e) => onChangeNewExpenseProp('description', e)}
              style={styles.input}
            />
            <ModalDatePicker dateValue={dateValue} setDateValue={setDateValue} />
            <View style={{ marginBottom: 30, gap: 20 }}>
              <ModalSeleccionarCatergoria
                categorySelected={category}
                setModalNewOptionVisible={setModalNewOptionVisible}
                setModalDeleteOptionVisible={setModalDeleteOptionVisible}
                setCategory={setCategory}
                setModalDisabledOptionsVisible={setModalDisabledOptionsVisible}
                setOptionNameDisabled={setOptionNameDisabled}
                setOptionIdDelete={setOptionIdDelete} />
              <ModalSeleccionarMetodoDePago
                paymentMethodSelected={paymentMethod}
                setModalNewOptionVisible={setModalNewOptionVisible}
                setModalDeleteOptionVisible={setModalDeleteOptionVisible}
                setModalDisabledOptionsVisible={setModalDisabledOptionsVisible}
                setOptionNameDisabled={setOptionNameDisabled}
                setOptionIdDelete={setOptionIdDelete}
                paymentMethods={paymentMethods}
                setpaymentMethod={setpaymentMethod} />
              <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, }} onPress={createNewExpense}>
                <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17 }}>Añadir nuevo gasto</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  },
});