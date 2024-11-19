import { ActivityIndicator, Button, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import uuid from 'react-native-uuid';
import { useExpensesStore } from '@/store/expensesStore';
import ColorPicker from 'react-native-wheel-color-picker';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import ButtonBase from './ButtonBase';

const COLORS1 = [
    "#F94144", // Rojo suave
    "#F3722C", // Naranja vibrante
    "#F8961E", // Amarillo cálido
    "#F9C74F", // Amarillo pastel
    "#90BE6D", // Verde suave
    "#43AA8B", // Verde esmeralda
    "#4D908E", // Verde azulado
    "#577590", // Azul grisáceo
    "#277DA1", // Azul océano
    "#A05195", // Morado ciruela
    "#D45087", // Magenta apagado
    "#F9844A", // Coral pastel
    "#FF5A5F", // Rosa cálido
    "#6A4C93", // Púrpura profundo
    "#5B5F97"  // Azul índigo
];

const COLORS2 = [
    "#F94144", // Rojo vibrante
    "#F3722C", // Naranja intenso
    "#F8961E", // Naranja claro
    "#F9C74F", // Amarillo cálido
    "#90BE6D", // Verde fresco
    "#43AA8B", // Verde esmeralda
    "#577590", // Azul grisáceo
    "#277DA1", // Azul profundo
    "#4D908E", // Verde azulado
    "#F9844A", // Coral
    "#FF006E", // Rosa vibrante
    "#8338EC", // Morado eléctrico
    "#3A86FF", // Azul brillante
    "#FB5607", // Naranja rojizo
    "#FFBE0B"  // Amarillo vibrante
];

const COLORS3 = [
    "#D32F2F", // Rojo oscuro [x]
    "#AC1552", // Magenta [x]
    "#7B1FA2", // Morado profundo [x]
    "#512DA8", // Púrpura oscuro [x]
    "#303F9F", // Azul fuerte [x]
    "#12579B", //  [x] 
    "#023350", //  [x]
    "#005C51", //  [x]
    "#29652C", //  [x]
    "#6D4F03", //  [x]
    "#7A4E00", // [x]
    "#8A4500", //  [x]
    "#973011", // Terracota [x]
    "#5D4037", // Café oscuro [x]
    "#455A64",  // Azul grisáceo [x]
    '#D32F2F',
    '#1976D2',
    '#F57C00'
];

const COLORS4 = [
    "#D32F2F", // Rojo vibrante
    "#C2185B", // Magenta profundo
    "#7B1FA2", // Morado fuerte
    "#512DA8", // Púrpura oscuro
    "#303F9F", // Azul intenso
    "#1976D2", // Azul vibrante
    "#0288D1", // Azul cielo oscuro
    "#00796B", // Verde esmeralda oscuro
    "#388E3C", // Verde vibrante
    "#F57C00", // Naranja quemado
    "#E64A19", // Rojo terracota
    "#5D4037"  // Café intenso
];

const COLORS5 = [
    "#D32F2F", // Rojo vibrante
    "#C2185B", // Magenta intenso
    "#7B1FA2", // Morado fuerte
    "#512DA8", // Púrpura oscuro
    "#303F9F", // Azul intenso
    "#1976D2", // Azul vibrante
    "#0288D1", // Azul cielo oscuro
    "#00796B", // Verde esmeralda oscuro
    "#388E3C", // Verde brillante
    "#689F38", // Verde lima oscuro
    "#FBC02D", // Amarillo mostaza
    "#F57C00", // Naranja quemado
    "#E64A19", // Terracota
    "#5D4037", // Café oscuro
    "#455A64"  // Azul grisáceo
];

const COLORS6 = [
    "#FFCDD2", // Rosa pastel
    "#F8BBD0", // Magenta claro
    "#E1BEE7", // Lavanda claro
    "#D1C4E9", // Lila suave
    "#C5CAE9", // Azul claro
    "#BBDEFB", // Azul cielo
    "#B3E5FC", // Cian suave
    "#B2EBF2", // Turquesa pastel
    "#B2DFDB", // Verde menta
    "#C8E6C9", // Verde claro
    "#DCEDC8", // Lima suave
    "#FFF9C4", // Amarillo pálido
    "#FFECB3", // Naranja claro
    "#FFE0B2", // Durazno pastel
    "#FFCCBC"  // Coral suave
];

const COLORS7 = [
    "#FF8A80", // Rosa coral
    "#FF80AB", // Fucsia vibrante
    "#EA80FC", // Lavanda intensa
    "#B388FF", // Lila vibrante
    "#8C9EFF", // Azul periwinkle
    "#82B1FF", // Azul cielo intenso
    "#80D8FF", // Turquesa brillante
    "#84FFFF", // Cian eléctrico
    "#A7FFEB", // Verde agua vibrante
    "#B9F6CA", // Verde menta fuerte
    "#CCFF90", // Lima vibrante
    "#FFFF8D", // Amarillo neón
    "#FFD180", // Naranja suave vibrante
    "#FFAB91", // Melón coral
    "#FFCC80"  // Durazno intenso
];

const COLORS8 = [
    "#486b00", // grass
    // "#234600", // forest green SACAR
    "#a2c523", // lime
    // "#07576b", // Ocean SACAR
    "#003b46", // deep aqua
    // "#021c1e", // blue black SACAR
    "#ee693f", // carrot
    "#cf3721", // tomato
    "#c99e10", // gold
    "#E4B600", // sunflower
    // "#fb6542", // sunset SACAR
    "#4d648d", // blueberry
    "#7d4427", // earth
    // "#f25c00", // marmalade SACAR
    "#4897d8", // electric blue 

];
const TitleModal = ({ modalNewOptionVisible, setModalNewOptionVisible }) => {

    const title = modalNewOptionVisible.optionName === 'category' ? 'Edita tu categoría' : 'Edita tu método de pago'

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
            <Pressable onPress={() => setModalNewOptionVisible(state => ({ ...state, show: false }))}>
                <MaterialCommunityIcons name="window-close" size={24} color="black" />
            </Pressable>
        </View>
    )
}

export const UpdateCreateOptionExpense = ({ modalNewOptionVisible, setModalNewOptionVisible }) => {

    const [newOption, setNewOption] = useState({ name: '', description: '', color: COLORS8[0] })
    const [modalColorPickerVisible, setModalColorPickerVisible] = useState(false)

    const addPaymentMethod = useExpensesStore(state => state.addPaymentMethod)
    const updatePaymentMethod = useExpensesStore(state => state.updatePaymentMethod)
    const updateCategory = useExpensesStore(state => state.updateCategory)
    const addCategory = useExpensesStore(state => state.addCategory)

    useEffect(() => {
        if (modalNewOptionVisible && modalNewOptionVisible.type === 'create') {
            setNewOption(prevState => ({ ...prevState, color: COLORS8[0] }))
        }
        if (modalNewOptionVisible && modalNewOptionVisible.type === 'edit') {
            setNewOption(modalNewOptionVisible.optionSelect)
        }
    }, [modalNewOptionVisible])

    const onChangeOptionProp = (key, value) => { setNewOption(prevState => ({ ...prevState, [key]: value })) }
    const closeModal = () => setModalNewOptionVisible(state => ({ ...state, show: false }))

    const onPress = () => {
        if (!newOption || !newOption.name) {
            console.error('newOption requiered and name is required');
            return
        }
        const newOptionyObj = {
            ...newOption,
            id: uuid.v4(),
            disabled: false,
        }
        if (modalNewOptionVisible.type === 'edit') {
            if (modalNewOptionVisible.optionName === 'category') {
                updateCategory(newOption);
                closeModal()
            }
            if (modalNewOptionVisible.optionName === 'paymentMethod') {
                updatePaymentMethod(newOption);
                closeModal()
            }
        }
        if (modalNewOptionVisible.type === 'create') {
            if (modalNewOptionVisible.optionName === 'category') {
                addCategory(newOptionyObj)
                closeModal()
            }
            if (modalNewOptionVisible.optionName === 'paymentMethod') {
                addPaymentMethod(newOptionyObj)
                closeModal()
            }
        }
    }

    return (
        <>
            <Modal
                animationType="fade"
                transparent={false}
                visible={modalNewOptionVisible.show}
                onRequestClose={() => {
                    setModalNewOptionVisible(state => ({ ...state, show: false }));
                }}>
                {/* Selecto de color */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalColorPickerVisible}
                    onRequestClose={() => {
                        setModalColorPickerVisible(false)
                    }}>
                    <Pressable style={{ justifyContent: 'center', height: '100%', paddingHorizontal: 50, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setModalColorPickerVisible(false)}>
                        <Pressable style={{ backgroundColor: 'white', paddingVertical: 20, borderRadius: 10, gap: 10 }} onPress={() => { }}>
                            <Text style={{ marginStart: 28, color: 'black', fontWeight: 'bold', fontSize: 20 }}>Escoge un color</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ gap: 10, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: 250 }}>
                                    {COLORS8.map(color =>
                                        <Pressable
                                            onPress={() => setNewOption(prevState => ({ ...prevState, color: color }))}
                                            style={{ borderRadius: 10, width: 40, height: 40, backgroundColor: color, justifyContent: 'center', alignItems: 'center' }}>
                                            {newOption.color === color && <AntDesign name="check" size={24} color="white" />}
                                        </Pressable>
                                    )}
                                </View>
                            </View>
                        </Pressable>
                    </Pressable>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 25, paddingHorizontal: 25 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Selecciona un color</Text>
                        <Pressable onPress={() => setModalColorPickerVisible(false)}>
                            <MaterialCommunityIcons name="window-close" size={24} color="black" />
                        </Pressable>
                    </View>

                    <View style={{ paddingHorizontal: 20, gap: 20 }}>
                        <View style={{ backgroundColor: newOption.color, height: 60, borderRadius: 10, borderWidth: 0.5 }}></View>
                        <ColorPicker
                            color={newOption.color}
                            onColorChange={color => setNewOption(prevState => ({ ...prevState, color: color }))}
                            thumbSize={40}
                            sliderSize={40}
                            noSnap={true}
                            row={false}
                            wheelLodingIndicator={<ActivityIndicator size={40} />}
                            sliderLodingIndicator={<ActivityIndicator size={20} />}
                            useNativeDriver={false}
                            useNativeLayout={false}
                        />
                    </View> */}
                </Modal>
                <View style={{ padding: 20, gap: 10 }}>
                    <TitleModal modalNewOptionVisible={modalNewOptionVisible} setModalNewOptionVisible={setModalNewOptionVisible} />
                    <TextInput
                        keyboardType='default'
                        value={newOption.name}
                        onChangeText={(e) => onChangeOptionProp('name', e)}
                        placeholder='Nombre'
                        style={styles.input}
                    />
                    <TextInput
                        keyboardType='default'
                        value={newOption.description}
                        onChangeText={(e) => onChangeOptionProp('description', e)}
                        placeholder='Descripcion'
                        style={styles.input}
                    />

                    <View style={{ gap: 10, marginBottom: 20 }}>
                        {/* <ButtonBase title={'Seleccionar color'} onPress={() => setModalColorPickerVisible(true)} /> */}
                        <Pressable
                            onPress={() => setModalColorPickerVisible(true)}
                            style={{ backgroundColor: newOption.color, height: 60, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Seleccionar color</Text>
                        </Pressable>
                    </View>
                    <ButtonBase title={'Aceptar'} onPress={onPress} />
                </View>
            </Modal>
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