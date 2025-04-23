import { View, Text, TextInput, ScrollView, StyleSheet, Pressable, KeyboardAvoidingView, Platform } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { useExpensesStore } from '@/store/expensesStore'
import { UpdateCreateOptionExpense } from '@/components/UpdateCreateOptionExpense'
import { ModalSeleccionarCatergoria } from '@/components/modals/ModalSeleccionarCatergoria'
import { ModalSeleccionarMetodoDePago } from '@/components/modals/ModalSeleccionarMetodoDePago'
import { ModalDisabledOption } from '@/components/modals/ModalDisabledOption'
import { ModalConfirmOptionDelete } from '@/components/modals/ModalConfirmOptionDelete'
import { ModalDatePicker } from '@/components/modals/ModalDatePicker'
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message'
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

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
  const regexNumberInt = /^[0-9]+$/;

  const offsetAnimation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetAnimation.value }, // Vibración horizontal
      ],
    };
  });

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
      setDateValue(modalUpdateCreateExpense.optionSelect.paymentDate)
      setCategory(modalUpdateCreateExpense.optionSelect.category)
      setpaymentMethod(modalUpdateCreateExpense.optionSelect.paymentMethod)
    }
  }, [modalUpdateCreateExpense])

  const onChangeNewExpenseProp = (key, value) => { setNewExpense(prevState => ({ ...prevState, [key]: value })) }

  const createNewExpense = () => {
    if (!regexNumberInt.test(newExpense.value)) {
      // Iniciar la vibración
      offsetAnimation.value = withRepeat(
        withTiming(10, { duration: 50 }), // Desplazarse 10 unidades en 50ms
        -1, // Repetir indefinidamente
        true // Alternar dirección (ida y vuelta)
      );
      // Detener después de 1 segundo
      setTimeout(() => {
        cancelAnimation(offsetAnimation); // Detener la animación
        offsetAnimation.value = 0; // Restablecer a la posición inicial
      }, 1000); // Tiempo configurado en milisegundos

      Toast.show({
        type: 'error',
        text1: 'Valor de gasto no valido 😭'
      });
      return
    }

    if (modalUpdateCreateExpense.type === 'edit') {
      const newExpenseEdited = {
        ...newExpense,
        paymentDate: dateValue,
        lastModificationDate: new Date(),
        paymentMethodId: paymentMethod?.id,
        categoryId: category?.id
      }
      updateExpense(newExpenseEdited);
      Toast.show({
        type: 'success',
        text1: 'Gasto editado satisfactoriamente 👋'
      });
      refRBSheet.current.close()
    }

    if (modalUpdateCreateExpense.type === 'create') {
      if ('value' in newExpense && newExpense.value != '') {
        const newExpenseObj = {
          ...newExpense,
          id: uuid.v4(),
          paymentDate: dateValue,
          creationDate: new Date(),
          lastModificationDate: new Date(),
          paymentMethodId: paymentMethod?.id,
          categoryId: category?.id
        }

        addExpense(newExpenseObj)
        Toast.show({
          type: 'success',
          text1: 'Nuevo gasto registrado 👋'
        });
        refRBSheet.current.close()
      }
    }
  }

  return (
    <>
      <UpdateCreateOptionExpense modalNewOptionVisible={modalNewOptionVisible} setModalNewOptionVisible={setModalNewOptionVisible} />
      <ModalConfirmOptionDelete optionId={optionIdDelete} setVisible={setModalDeleteOptionVisible} visible={modalDeleteOptionVisible} />
      <ModalDisabledOption optionName={optionNameDisabled} visible={modalDisabledOptionsVisible} setVisible={setModalDisabledOptionsVisible} />
      <ScrollView>
        <View style={{ gap: 5, paddingHorizontal: 20, margin: 10 }}>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginBottom: 10 }}>{modalUpdateCreateExpense.type === 'create' ? 'Nuevo gasto 💸' : 'Editar gasto 💸'}</Text>
          <Animated.View style={[styles.input, animatedStyle]} >
            <TextInput
              keyboardType='numeric'
              onChangeText={(e) => onChangeNewExpenseProp('value', e.replace(/[^0-9]/g, ""))}
              value={newExpense.value}
              placeholder='Valor'
            />
          </Animated.View>
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
          </View>
        </View>
      </ScrollView>
      <Pressable style={{ margin: 'auto', width: '90%', backgroundColor: 'black', padding: 10, borderRadius: 10, marginBottom: 13 }} onPress={createNewExpense}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17 }}>{modalUpdateCreateExpense.type === 'create' ? 'Añadir nuevo gasto' : 'Aceptar'}</Text>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }
});