import { ModalConfigOption } from "./ModalConfigOption";
import ButtonBase from "../ButtonBase";
import { useExpensesStore } from "@/store/expensesStore";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const ModalConfigMetodoDePago = ({ buttonIcon = false }) => {
    const { paymentMethods } = useExpensesStore(state => state)
    const [configPaymentMethodsModalVisible, setConfigPaymentMethodsModalVisible] = useState(false);

    return (
        <>
            <ModalConfigOption
                title="Configuración de métodos de pago"
                optionName="paymentMethods"
                optionSingular="método de pago"
                textNewOption="Agregar nuervo método de pago"
                textShowDisablesOptions="Mostrar métodos de pago desactivados"
                options={paymentMethods}
                modalVisible={configPaymentMethodsModalVisible}
                setModalVisible={setConfigPaymentMethodsModalVisible}
            />
            {buttonIcon
                ? <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, opacity: 0.6, alignItems: 'center' }} onPress={() => setConfigPaymentMethodsModalVisible(true)}>
                    <Text style={{ fontSize: 14 }}>Métodos de pago:</Text>
                    <Ionicons name="settings-outline" size={24} color="black" />
                </Pressable>
                : <ButtonBase customStyleText={{ textAlign: 'start' }} title="Configurar método de pago" onPress={() => setConfigPaymentMethodsModalVisible(true)} />
            }

        </>
    );
};