import React, { useRef, useState } from 'react';
import { View, Text, Modal, Pressable, ScrollView, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonBase from '../ButtonBase';
import { UpdateCreateOptionExpense } from '../UpdateCreateOptionExpense';
import { ModalConfirmOptionDelete } from '../modals/ModalConfirmOptionDelete';
import { ModalDisabledOption } from '../modals/ModalDisabledOption';
import { AntDesign } from '@expo/vector-icons';

export const ModalConfigOption = ({
  title,
  optionName,
  optionSingular = '',
  textNewOption = '',
  textShowDisablesOptions = '',
  options,
  colorKey = 'color',
  nameKey = 'name',
  modalVisible,
  setModalVisible,
}) => {
  const [modalNewOptionVisible, setModalNewOptionVisible] = useState({ show: false });
  const [modalDeleteOptionVisible, setModalDeleteOptionVisible] = useState(false);
  const [optionIdDelete, setOptionIdDelete] = useState();
  const [optionNameDisabled, setOptionNameDisabled] = useState();
  const [modalDisabledOptionsVisible, setModalDisabledOptionsVisible] = useState(false);
  const refRBSheet = useRef();

  const handleEdit = (option) => {
    refRBSheet.current.open()
    setModalNewOptionVisible(state => ({
      ...state,
      type: 'edit',
      optionName,
      // show: true,
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
      <UpdateCreateOptionExpense textNewOption={textNewOption} refRBSheet={refRBSheet} modalNewOptionVisible={modalNewOptionVisible} setModalNewOptionVisible={setModalNewOptionVisible} optionSingular={optionSingular} />
      <ModalDisabledOption optionName={optionNameDisabled} visible={modalDisabledOptionsVisible} setVisible={setModalDisabledOptionsVisible} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer} >
          <View style={styles.modalContent}>
            <View style={{ flexDirection: 'row', gap: 19, padding: 20, justifyContent: 'start', alignItems: 'center', }}>
              <Pressable onPress={() => setModalVisible(false)}>
                <AntDesign name="leftcircleo" size={30} color="black" />
              </Pressable>
              <Text style={styles.headerText}>{title}</Text>
            </View>

            <ScrollView>
              <View style={styles.optionsList}>
                {options?.filter(opt => !opt.disabled).map((opt) => (
                  <View style={styles.optionRow} key={opt.id}>
                    <View style={{ flex: 1, marginStart: 6, flexDirection: 'row', alignItems: 'center', gap: 4, justifyContent: 'flex-start' }}>
                      <View style={{ backgroundColor: opt[colorKey], height: 10, width: 10, borderRadius: 100 }} />
                      <Text style={{ width: '120%' }}>{opt[nameKey]}</Text>
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
              </View>
            </ScrollView>
            <View style={{ flexDirection: 'column', alignItems: 'center', paddingBottom: 50, gap: 10 }}>
              <ButtonBase title={textNewOption} onPress={() => {
                refRBSheet.current.open()
                setModalNewOptionVisible(state => ({
                  ...state,
                  type: 'create',
                  optionName,
                  // show: true,
                }))
              }
              } />
              <ButtonBase title={textShowDisablesOptions} onPress={() => {
                setOptionNameDisabled(optionName)
                setModalDisabledOptionsVisible(true)
              }} />
            </View>
          </View>
        </View>
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
    width: '100%',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    maxWidth: '90%',
    fontWeight: 'bold',
  },
  optionsList: {
    gap: 20,
    padding: 20,
  },
  optionRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'center',
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    paddingHorizontal: 10,
  },
  buttonAction: {
    borderRadius: 10,
    padding: 10,
  },
});
