import React, { useState } from 'react';
import { View, Text, Modal, Pressable, ScrollView, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonBase from '../ButtonBase';
import { UpdateCreateOptionExpense } from '../UpdateCreateOptionExpense';
import { ModalConfirmOptionDelete } from '../modals/ModalConfirmOptionDelete';
import { ModalDisabledOption } from '../modals/ModalDisabledOption';

export const ModalConfigOption = ({
  title,
  optionName,
  options,
  colorKey = 'color',
  nameKey = 'name',
  onEditOption,
  onDeleteOption,
  modalVisible,
  setModalVisible,
}) => {
  const [modalNewOptionVisible, setModalNewOptionVisible] = useState({ show: false });
  const [modalDeleteOptionVisible, setModalDeleteOptionVisible] = useState(false);
  const [optionIdDelete, setOptionIdDelete] = useState();
  const [optionNameDisabled, setOptionNameDisabled] = useState();
  const [modalDisabledOptionsVisible, setModalDisabledOptionsVisible] = useState(false);

  const handleEdit = (option) => {
    setModalNewOptionVisible(state => ({
      ...state,
      type: 'edit',
      optionName,
      show: true,
      optionSelect: option,
    }));
  };

  const handleDelete = (id) => {
    setModalDeleteOptionVisible(true);
    setOptionIdDelete(id);
  };

  return (
    <>
      <ModalConfirmOptionDelete optionId={optionIdDelete} setVisible={setModalDeleteOptionVisible} visible={modalDeleteOptionVisible} />
      <UpdateCreateOptionExpense modalNewOptionVisible={modalNewOptionVisible} setModalNewOptionVisible={setModalNewOptionVisible} />
      <ModalDisabledOption optionName={optionNameDisabled} visible={modalDisabledOptionsVisible} setVisible={setModalDisabledOptionsVisible} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.modalContainer} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
              <Pressable onPress={() => setModalVisible(false)}>
                <MaterialCommunityIcons name="window-close" size={24} color="black" />
              </Pressable>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled">
              <View style={styles.optionsList}>
                {options?.filter(opt => !opt.disabled).map((opt) => (
                  <View style={styles.optionRow} key={opt.id}>
                    <View style={{ flex: 1, marginStart: 6 }}>
                      {opt[colorKey] && <View style={{ backgroundColor: opt[colorKey], height: 20, width: 8 }} />}
                      <Text>{opt[nameKey]}</Text>
                    </View>
                    <View style={styles.actions}>
                      <Pressable style={[styles.buttonAction, { backgroundColor: 'black' }]} onPress={() => handleEdit(opt)}>
                        <Feather name="edit" size={24} color="white" />
                      </Pressable>
                      <Pressable style={[styles.buttonAction, { backgroundColor: 'red' }]} onPress={() => handleDelete(opt.id)}>
                        <MaterialIcons name="delete-outline" size={24} color="white" />
                      </Pressable>
                    </View>
                  </View>
                ))}
                <ButtonBase title={`Añadir nueva ${optionName}`} onPress={() =>
                  setModalNewOptionVisible(state => ({
                    ...state,
                    type: 'create',
                    optionName,
                    show: true,
                  }))
                } />
                <ButtonBase title={`Ver ${optionName} desactivadas`} onPress={() => {
                  setOptionNameDisabled(optionName)
                  setModalDisabledOptionsVisible(true)
                }} />
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    gap: 20,
    borderRadius: 10,
    height: '80%',
    width: '95%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsList: {
    gap: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
  },
  buttonAction: {
    borderRadius: 10,
    padding: 10,
  },
});
