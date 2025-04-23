import { ModalConfigOption } from "./ModalConfigOption";
import ButtonBase from "../ButtonBase";
import { useState } from "react";
import { useExpensesStore } from "@/store/expensesStore";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export const ModalConfigCategoria = ({ buttonIcon = false }) => {
    const { categories } = useExpensesStore(state => state)
    const [configCategoriesModalVisible, setConfigCategoriesModalVisible] = useState(false);

    return (
        <>
            <ModalConfigOption
                title="Configuración de categorías"
                optionName="categories"
                optionSingular="categoría"
                textNewOption="Agregar nueva categoría"
                textShowDisablesOptions="Mostrar categorás desactivadas"
                options={categories}
                modalVisible={configCategoriesModalVisible}
                setModalVisible={setConfigCategoriesModalVisible}
            />
            {buttonIcon
                ? <Pressable style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, opacity: 0.6, alignItems: 'center' }} onPress={() => setConfigCategoriesModalVisible(true)}>
                    <Text style={{ fontSize: 14 }}>Categorías:</Text>
                    <Ionicons name="settings-outline" size={24} color="black" />
                </Pressable>
                : <ButtonBase customStyleText={{ textAlign: 'start' }} title="Configurar categorías" onPress={() => setConfigCategoriesModalVisible(true)} />
            }
        </>
    );
};