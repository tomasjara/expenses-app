import { Modal, Pressable, } from "react-native"

export const ModalComponent = ({ children, modalVisible, setModalVisible }) => {
    return (<Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(false)
        }}>
        <Pressable style={{ alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setModalVisible(false)} >
            <Pressable style={{ backgroundColor: 'white', gap: 20, borderRadius: 10, height: '30%', width: '95%', alignItems: 'center', justifyContent: 'center' }}  >
                {children}
            </Pressable>
        </Pressable>
    </Modal>)
}