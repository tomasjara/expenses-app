import { View, Text, Modal, Button, TextInput } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { useExpensesStore } from '@/store/expensesStore'
import { UpdateCreateOptionExpense } from '@/components/UpdateCreateOptionExpense'
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message'


const ModalDisabledOption = ({ optionName, visible = false, setVisible }) => {
  const { categories, paymentMethods, expenses, removeCategory, removePaymentMethod, updateCategory, updatePaymentMethod, setExpenses } = useExpensesStore(state => state)
  if (!visible) return

  const optionNamesInExpenses = {
    categories: categories,
    paymentMethods: paymentMethods
  }

  const updateFuntions = {
    categories: updateCategory,
    paymentMethods: updatePaymentMethod
  }

  const optionsFilter = optionNamesInExpenses[optionName].filter(option => option.disabled)

  const onActive = (optionId) => {
    updateFuntions[optionName]({ id: optionId, disabled: false })
  }

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        setVisible(false)
      }}>
      <View style={{ padding: 30, gap: 10 }}>
        <Text>Opciones desabilidatadas</Text>
        {optionNamesInExpenses && optionsFilter.map(option => (
          <View style={{ flexDirection: 'row', gap: 5 }} key={option.id}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <Button
                title={'Activar'}
                color={'blue'}
                onPress={() => {
                  onActive(option.id)
                }} />
            </View>
            <View style={{ flex: 1, marginStart: 6 }}>
              <Button
                key={option.id}
                title={option.name}
                onPress={() => {
                  // setCategory(category)
                  // setModalCategoriesVisible(false)
                }} />
            </View>
          </View>
        ))}
        <Button onPress={() => setVisible(false)} title='Cerrar' color={'red'} />
      </View>
    </Modal>
  )
}

const ModalConfirmOptionDelete = ({ optionId, visible = false, setVisible }) => {
  const { categories, paymentMethods, expenses, removeCategory, removePaymentMethod, updateCategory, updatePaymentMethod, setExpenses } = useExpensesStore(state => state)
  const [relatedOption, setRelatedOption] = useState(null)

  const searchArrays = {
    categories,
    paymentMethods
  }
  const optionNamesInExpenses = {
    categories: 'categoryId',
    paymentMethods: 'paymentMethodId'
  }
  const removeFuntions = {
    categories: removeCategory,
    paymentMethods: removePaymentMethod
  }
  const updateFuntions = {
    categories: updateCategory,
    paymentMethods: updatePaymentMethod
  }

  const onDelete = () => {
    const newExpenses = expenses.filter(expense => expense[optionNamesInExpenses[relatedOption.key]] != relatedOption.option.id)
    setExpenses(newExpenses)
  }

  const onDisable = () => {
    updateFuntions[relatedOption.key]({ id: relatedOption.option.id, disabled: true })
  }

  useEffect(() => {
    if (!optionId) return
    Object.keys(searchArrays).forEach((key) => {
      const optionResult = searchArrays[key].find(item => item.id === optionId)
      if (optionResult) {
        const expenseResult = expenses.find(expense => expense[optionNamesInExpenses[key]] === optionId)
        if (!expenseResult) {
          setRelatedOption(null)
          return
        }
        setRelatedOption({ key: key, option: optionResult })
      }
    })
  }, [optionId])

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={() => {
        setVisible(false)
      }}>
      {relatedOption
        ? <View>
          <Text>Esta categoria/Este metodo de pago esta relacionado con un gasto </Text>
          <Button onPress={onDisable} title='Conservar los todos los gastos relacionados, desactivando la categoria/el metodo de pago' color={'green'} />
          <Button onPress={onDelete} title='Eliminar todas los gastos relaciondos' color={'red'} />
        </View>
        : <Text>Opcion no relacionada</Text>
      }
      <Button
        title='Cerrar'
        onPress={() => setVisible(false)} />
    </Modal>
  )
}

export const UpdateCreateExpenseModal = () => {
  const [modalNewOptionVisible, setModalNewOptionVisible] = useState({ show: false })
  const [modalCategoriesVisible, setModalCategoriesVisible] = useState(false)
  const [modalDisabledOptionsVisible, setModalDisabledOptionsVisible] = useState(false)
  const [optionNameDisabled, setOptionNameDisabled] = useState()
  const [modalPaymentMethodVisible, setModalPaymentMethodVisible] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [dateValue, setDateValue] = useState(new Date())
  const [newExpense, setNewExpense] = useState({ value: '', description: '' })
  const [category, setCategory] = useState()
  const [paymentMethod, setpaymentMethod] = useState()
  const [optionIdDelete, setOptionIdDelete] = useState()
  const [modalDeleteOptionVisible, setModalDeleteOptionVisible] = useState()
  const { modalUpdateCreateExpense, setModalUpdateCreateExpense, removePaymentMethod, paymentMethods, categories, removeCategory, addExpense, updateExpense } = useExpensesStore(state => state)
  const inputValueRef = useRef(null);

  useEffect(() => {
    if (inputValueRef.current && modalUpdateCreateExpense.show) {
      inputValueRef.current.focus();
    }
  }, [modalUpdateCreateExpense.show])

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
        paymentMethod: paymentMethod || paymentMethods[0],
        category: category || categories[0]
      }
      updateExpense(newExpenseEdited);
      Toast.show({
        type: 'success',
        text1: 'Gasto editado satisfactoriamente 👋'
      });
      setModalUpdateCreateExpense({ show: false })
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
          paymentMethodId: paymentMethod?.id || paymentMethods[0].id,
          categoryId: category?.id || categories[0].id
        }

        addExpense(newExpenseObj)
        Toast.show({
          type: 'success',
          text1: 'Nuevo gasto registrado 👋'
        });
        setModalUpdateCreateExpense({ show: false })
      }
    }
  }

  return (
    <>
      <UpdateCreateOptionExpense modalNewOptionVisible={modalNewOptionVisible} setModalNewOptionVisible={setModalNewOptionVisible} />
      <ModalConfirmOptionDelete optionId={optionIdDelete} setVisible={setModalDeleteOptionVisible} visible={modalDeleteOptionVisible} />
      <ModalDisabledOption optionName={optionNameDisabled} visible={modalDisabledOptionsVisible} setVisible={setModalDisabledOptionsVisible} />

      <Modal
        animationType="fade"
        transparent={false}
        visible={modalUpdateCreateExpense.show}
        onRequestClose={() => {
          setModalUpdateCreateExpense({ show: false });
          setNewExpense({ name: '', description: '' })
        }}>
        <View style={{ gap: 20, paddingHorizontal: 20, marginVertical: 30 }}>
          <Text style={{ fontSize: 20 }}>Formulario</Text>
          <TextInput
            keyboardType='numeric'
            onChangeText={(e) => onChangeNewExpenseProp('value', e)}
            value={newExpense.value}
            ref={inputValueRef}
            placeholder='Valor'
            style={{ padding: 3, borderWidth: 1 }}
          />
          <TextInput
            placeholder='Descripcion'
            value={newExpense.description}
            onChangeText={(e) => onChangeNewExpenseProp('description', e)}
            style={{ padding: 3, borderWidth: 1 }}
          />
          <View>
            <Text>Categoria seleccionada: {category?.name || categories[0].name}</Text>
            <View style={{ backgroundColor: category?.color || categories[0].color, height: 10, width: 230 }}></View>
          </View>
          <View>
            <Text >Metodo de pago seleccionado: {paymentMethod?.name || paymentMethods[0].name}</Text>
            <View style={{ backgroundColor: paymentMethod?.color || paymentMethods[0].color, height: 10, width: 260 }}></View>
          </View>

          {/* Modal modalCategoriesVisible */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalCategoriesVisible}
            onRequestClose={() => {
              setModalCategoriesVisible((state) => !state);
            }}>

            <View style={{ gap: 20, paddingHorizontal: 20, marginVertical: 30 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Seleccion de categorias</Text>
                <Button title='  +  ' color={'red'} onPress={() => setModalNewOptionVisible(state => ({ ...state, type: 'create', optionName: 'category', show: true }))} />
              </View>
              {categories && categories.map(category => {
                if (category.disabled) return
                return (
                  <View style={{ flexDirection: 'row' }} key={category.id}>
                    <View style={{ flexDirection: 'row', gap: 6 }}>
                      <Button
                        title={'Editar'}
                        color={'blue'}
                        onPress={() => {
                          setModalNewOptionVisible(state => ({ ...state, type: 'edit', optionName: 'category', show: true, optionSelect: category }))
                        }} />
                      <Button
                        title={'Eliminar'}
                        color={'red'}
                        onPress={() => {
                          // removeCategory(category.id)
                          setModalDeleteOptionVisible(true)
                          setOptionIdDelete(category.id)
                        }} />
                    </View>
                    <View style={{ flex: 1, marginStart: 6 }}>
                      <Button
                        key={category.id}
                        title={category.name || ''}
                        color={category.color || ''}
                        onPress={() => {
                          setCategory(category)
                          setModalCategoriesVisible(false)
                        }} />
                    </View>
                  </View>
                )
              })}
              <Button title='Cerrar' color={'red'} onPress={() => setModalCategoriesVisible(false)} />
              <Button title='Ver categorias desactivadas' color={'blue'} onPress={() => {
                setOptionNameDisabled('categories')
                setModalDisabledOptionsVisible(true)
              }} />
            </View>
          </Modal>

          {/* Modal modalPaymentMethodVisible */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalPaymentMethodVisible}
            onRequestClose={() => {
              setModalPaymentMethodVisible(false)
            }}>
            <View style={{ gap: 20, paddingHorizontal: 20, marginVertical: 30 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>Seleccion de metodo de pago</Text>
                <Button title='  +  ' color={'red'} onPress={() => setModalNewOptionVisible(state => ({ ...state, type: 'create', optionName: 'paymentMethod', show: true }))} />
              </View>
              {paymentMethods && paymentMethods.map(paymentMethod => (
                <View style={{ flexDirection: 'row', }} key={paymentMethod.id}>
                  <View style={{ flexDirection: 'row', gap: 6 }}>
                    <Button
                      title={'Editar'}
                      color={'blue'}
                      onPress={() => {
                        setModalNewOptionVisible(state => ({ ...state, type: 'edit', optionName: 'paymentMethod', show: true, optionSelect: paymentMethod }))
                      }} />
                    <Button
                      title={'Eliminar'}
                      color={'red'}
                      onPress={() => {
                        // removePaymentMethod(paymentMethod.id)
                        setModalDeleteOptionVisible(true)
                        setOptionIdDelete(paymentMethod.id)
                      }} />
                  </View>
                  <View style={{ flex: 1, marginStart: 6 }}>
                    <Button
                      title={paymentMethod.name || ''}
                      color={paymentMethod.color || ''}
                      onPress={() => {
                        setpaymentMethod(paymentMethod)
                        setModalPaymentMethodVisible(false)
                      }} />
                  </View>
                </View>
              ))}
              <Button title='Cerrar' color={'red'} onPress={() => setModalPaymentMethodVisible(false)} />
              <Button title='Ver metodos de pago desactivados' color={'blue'} onPress={() => {
                setOptionNameDisabled('paymentMethods')
                setModalDisabledOptionsVisible(true)
              }} />
            </View>
          </Modal>

          <View style={{ marginTop: 22, gap: 20 }}>
            <Button title="Fecha" onPress={() => setDatePickerVisible(true)} />
            <DatePicker
              modal
              open={datePickerVisible}
              date={dateValue}
              mode='date'
              onConfirm={(date) => {
                setDatePickerVisible(false)
                setDateValue(date)
              }}
              onCancel={() => {
                setDatePickerVisible(false)
              }}
            />
            <Button title='Categorias' onPress={() => setModalCategoriesVisible(true)} />
            <Button title='Metodo de pago' onPress={() => setModalPaymentMethodVisible(true)} />
          </View>
          <View style={{ marginTop: 100, gap: 20 }}>
            <Button title='Añadir expense' color={'green'} onPress={createNewExpense} />
            <Button title='Cerrar' color={'red'} onPress={() => {
              setModalUpdateCreateExpense({ show: false })
              setNewExpense({ name: '', description: '' })
            }} />
          </View>
        </View>
      </Modal>
    </>
  )
}