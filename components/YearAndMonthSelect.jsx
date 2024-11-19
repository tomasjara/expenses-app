import {
  View,
  Text,
  Pressable,
  Modal,
} from "react-native";
import { useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MONTHS, MONTHS_LIST } from "@/utils/constantes";
import dayjs from "dayjs";
import { formatFirstLetterString } from "@/utils/formatFirstLetterString";

export default function YearAndMonthSelect({ dateValue, setDateValue, expensesMonthWithYear }) {
  const [modalVisible, setModalVisible] = useState(false)

  const onSelectMonth = (item) => {
    setDateValue(prevState => ({ ...prevState, month: { id: item.id, name: item.month } }))
    setModalVisible(false)
  }

  const onActuallyYear = () => {
    setDateValue(prevState => ({ ...prevState, year: dayjs().get('y') }))
  }

  const onActuallyMonth = () => {
    setDateValue(prevState => ({ ...prevState, month: { id: dayjs().get('M'), name: formatFirstLetterString(MONTHS[dayjs().get('M')]) } }))
    setModalVisible(false)
  }

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable style={{ justifyContent: 'center', height: '100%', paddingHorizontal: 20, backgroundColor: 'rgba(0, 0, 0, 0.6)' }} onPress={() => setModalVisible(false)}>
          <Pressable style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 30, borderRadius: 10, }} onPress={() => { }}>
            <View style={{ padding: 10, gap: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <Pressable onPress={() => { setDateValue(prevState => ({ ...prevState, year: prevState.year - 1 })) }} style={{ padding: 10 }}>
                  <MaterialIcons name="arrow-back-ios" size={20} color="black" />
                </Pressable>
                <Text style={{ fontSize: 18 }}>{dateValue.year}</Text>
                <Pressable onPress={() => { setDateValue(prevState => ({ ...prevState, year: prevState.year + 1 })) }} style={{ padding: 10 }}>
                  <MaterialIcons name="arrow-forward-ios" size={20} color="black" />
                </Pressable>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {MONTHS_LIST.map((item) => {
                  const currentMonth = item.month
                  const expensesCount = expensesMonthWithYear.find(item => item[currentMonth])
                  return (
                    <Pressable key={item.month} onPress={() => onSelectMonth(item)} style={{ borderWidth: 1, borderRadius: 10, padding: 10, borderColor: dateValue.month.id === item.id ? 'blue' : 'black', backgroundColor: dateValue.month.id === item.id ? 'blue' : 'white', width: 90 }}>
                      <Text style={{ fontSize: 12, textAlign: 'center', color: dateValue.month.id === item.id ? 'white' : 'black', }}>{item.month}</Text>
                      {expensesCount && <View style={{ position: 'absolute', top: -5, right: -5, backgroundColor: 'black', borderRadius: 10, paddingVertical: 2, paddingHorizontal: 5, opacity: 0.8 }}>
                        <Text style={{ fontSize: 10, textAlign: 'center', color: 'white' }}>{expensesCount[currentMonth]}</Text>
                      </View>}
                    </Pressable>
                  )
                })}
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
                <Pressable style={{ backgroundColor: '#2282e3', padding: 10, borderRadius: 10 }} onPress={onActuallyYear} >
                  <Text style={{ color: 'white' }}>Año actual</Text>
                </Pressable>
                <Pressable style={{ backgroundColor: '#2282e3', padding: 10, borderRadius: 10 }} onPress={onActuallyMonth} >
                  <Text style={{ color: 'white' }}>Mes actual</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      <View style={{ gap: 10 }}>
        <Text style={{ fontSize: 12, marginBottom: 3, opacity: 0.5 }}>Periodo seleccionado {dateValue.year}</Text>
        <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} onPress={() => setModalVisible(true)}>
          <View style={{ borderWidth: 0.5, padding: 5, borderRadius: 5 }}>
            <Ionicons name="calendar-number-outline" size={18} color="black" />
          </View>
          <Text style={{ fontSize: 20 }}>{dateValue.month.name}</Text>
        </Pressable>
      </View>
    </>
  );
}