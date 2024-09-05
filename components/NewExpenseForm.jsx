import { View, Text, Modal, Button, TextInput, Alert } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-native-date-picker'
import { usePaymentMethodsStore } from '@/store/paymentMethodsStore'
import { useCategoriesStore } from '@/store/categoriesStore'
import { useExpensesStore } from '@/store/expensesStore'
import { NewCategoryForm } from '@/components/NewCategoryForm'
import { NewPaymentMethodForm } from '@/components/NewPaymentMethodForm'
import { UpdateCreateOptionExpense } from '@/components/UpdateCreateOptionExpense'
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message'

export const NewExpenseForm = ({ modalFormVisible, setModalFormVisible }) => {
    const [modalCategoryCrudVisible, setModalCategoryCrudVisible] = useState(false)
    const [modalPaymentMethodCrudVisible, setModalPaymentMethodCrudVisible] = useState(false)
    const [modalNewOptionVisible, setModalNewOptionVisible] = useState({ show: false })

    const [modalCategoriesVisible, setModalCategoriesVisible] = useState(false)
    const [modalPaymentMethodVisible, setModalPaymentMethodVisible] = useState(false)
    const [datePickerVisible, setDatePickerVisible] = useState(false)
    const [dateValue, setDateValue] = useState(new Date())
    const [newExpense, setNewExpense] = useState({})
    const [category, setCategory] = useState()
    const [paymentMethod, setpaymentMethod] = useState()
    const paymentMethods = usePaymentMethodsStore(state => state.paymentMethods)
    const removePaymentMethod = usePaymentMethodsStore(state => state.removePaymentMethod)
    const categories = useCategoriesStore(state => state.categories)
    const removeCategory = useCategoriesStore(state => state.removeCategory)
    const addExpense = useExpensesStore(state => state.addExpense)

    const inputValueRef = useRef(null);

    useEffect(() => {
        if (inputValueRef.current && modalFormVisible) {
            inputValueRef.current.focus();
        }
    }, [modalFormVisible])

    const onChangeNewExpenseProp = (key, value) => { setNewExpense(prevState => ({ ...prevState, [key]: value })) }

    const createNewExpense = () => {
        if ('value' in newExpense) {
            const newExpenseObj = {
                ...newExpense,
                id: uuid.v4(),
                paymentDate: dateValue,
                creationDate: new Date(),
                lastModificationDate: new Date(),
                paymentMethod: paymentMethod || paymentMethods[0],
                category: category || categories[0]
            }
            addExpense(newExpenseObj)
            setModalFormVisible(false)
            Toast.show({
                type: 'success',
                text1: 'Nuevo gasto registrado 👋'
            });
        }
    }

    return (
        <>
            <NewCategoryForm modalCategoryCrudVisible={modalCategoryCrudVisible} setModalCategoryCrudVisible={setModalCategoryCrudVisible} />
            <NewPaymentMethodForm modalPaymentMethodCrudVisible={modalPaymentMethodCrudVisible} setModalPaymentMethodCrudVisible={setModalPaymentMethodCrudVisible} />
            <UpdateCreateOptionExpense modalNewOptionVisible={modalNewOptionVisible} setModalNewOptionVisible={setModalNewOptionVisible} />

            <Modal
                animationType="fade"
                transparent={false}
                visible={modalFormVisible}
                onRequestClose={() => {
                    setModalFormVisible((state) => !state);
                }}>
                <View style={{ gap: 20, paddingHorizontal: 20, marginVertical: 30 }}>
                    <Text style={{ fontSize: 20 }}>Formulario</Text>
                    <TextInput
                        keyboardType='numeric'
                        onChangeText={(e) => onChangeNewExpenseProp('value', e)}
                        ref={inputValueRef}
                        placeholder='Valor'
                        style={{ padding: 3, borderWidth: 1 }}
                    />
                    <TextInput
                        placeholder='Descripcion'
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
                            {categories && categories.map(category => (
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
                                                removeCategory(category.id)
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
                            ))}
                            <Button title='Cerrar' color={'red'} onPress={() => setModalCategoriesVisible(false)} />
                        </View>
                    </Modal>

                    {/* Modal metodo de pago */}
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
                                        {/* Button editar metodo de pago */}

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
                                                removePaymentMethod(paymentMethod.id)
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
                        </View>
                    </Modal>

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
                    <Button title='Añadir expense' color={'green'} onPress={createNewExpense} />
                    <Button title='Cerrar' color={'red'} onPress={() => setModalFormVisible(false)} />
                </View>
            </Modal>
        </>
    )
}