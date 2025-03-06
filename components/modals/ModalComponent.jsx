import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Modal, Pressable, Text, View } from "react-native"

export const ModalComponent = ({ title, children, modalVisible, setModalVisible }) => {
    return (<Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(false)
        }}>
        <Pressable style={{ alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setModalVisible(false)} >
            <Pressable style={{ backgroundColor: 'white', gap: 20, borderRadius: 10, height: '30%', width: '95%', alignItems: 'center', justifyContent: 'center' }}  >
                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                    <Pressable onPress={() => setModalVisible(false)}>
                        <MaterialCommunityIcons name="window-close" size={24} color="black" />
                    </Pressable>
                </View> */}
                {children}
            </Pressable>
        </Pressable>
    </Modal>)
}