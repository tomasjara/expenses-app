import { View, Text, Pressable, Modal } from "react-native";
import { useState } from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MONTHS, MONTHS_LIST } from "@/utils/constantes";
import dayjs from "dayjs";
import { formatFirstLetterString } from "@/utils/formatFirstLetterString";

export default function YearAndMonthSelect({ dateValue, setDateValue, expensesMonthWithYear }) {
  const [modalVisible, setModalVisible] = useState(false);

  const setYear = (year) => setDateValue(prev => ({ ...prev, year }));
  const setMonth = (month) => setDateValue(prev => ({ ...prev, month }));

  const handleSelectMonth = (item) => {
    setMonth({ id: item.id, name: item.month });
    setModalVisible(false);
  };

  // const handleSetCurrentYear = () => setYear(dayjs().year());

  const handleSetCurrentMonth = () => {
    const currentMonth = dayjs().month();
    setYear(dayjs().year())
    setMonth({ id: currentMonth, name: formatFirstLetterString(MONTHS[currentMonth]) })
    setModalVisible(false);
  };

  const handleAllTime = () => {
    setDateValue(prev => ({ ...prev, "month": { "id": '', "name": "" } }))
    setModalVisible(false);
  };

  const changeYear = (offset) => {
    setYear(dateValue.year + offset);
  };

  const isSelectedMonth = (id) => dateValue.month.id === id;

  return (
    <>
      {/* MODAL */}
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContainer} onPress={() => { }}>
            <View style={styles.modalContent}>

              {/* Header Año */}
              <View style={styles.yearSelector}>
                <Pressable onPress={() => changeYear(-1)} style={styles.iconButton}>
                  <MaterialIcons name="arrow-back-ios" size={24} color="black" />
                </Pressable>
                <Text style={styles.yearText}>{dateValue.year}</Text>
                <Pressable onPress={() => { dayjs(dateValue.year) < dayjs().year() ? changeYear(1) : () => { } }} style={styles.iconButton}>
                  <MaterialIcons name="arrow-forward-ios" size={24} color={dayjs(dateValue.year) < dayjs().year() ? "black" : 'gray'} />
                </Pressable>
              </View>

              {/* Meses */}
              <View style={styles.monthsGrid}>
                {MONTHS_LIST.map((item) => {
                  const currentMonth = item.month;
                  const expensesCount = expensesMonthWithYear.find(e => e[currentMonth]);
                  const selected = isSelectedMonth(item.id);
                  // Validar si el mes está en el futuro
                  const monthIsFuture = dateValue.year > dayjs().year() || (dateValue.year === dayjs().year() && item.id > dayjs().month());

                  return (
                    <Pressable
                      key={item.month}
                      onPress={() => !monthIsFuture && handleSelectMonth(item)}
                      style={[
                        styles.monthButton,
                        {
                          borderColor: selected ? 'blue' : monthIsFuture ? 'gray' : 'black',
                          backgroundColor: selected ? 'blue' : 'white',
                        }
                      ]}
                    >
                      {/* <Text style={[styles.monthText, { color: selected ? 'white' : 'black' }]}> */}
                      <Text style={[styles.monthText, { color: selected ? 'white' : monthIsFuture ? 'gray' : 'black' }]}>
                        {item.month}
                      </Text>
                      {/* {expensesCount && (
                        <View style={styles.expenseBadge}>
                          <Text style={styles.expenseBadgeText}>{expensesCount[currentMonth]}</Text>
                        </View>
                      )} */}
                    </Pressable>
                  );
                })}
              </View>

              {/* Acciones */}
              <View style={styles.actions}>
                <ActionButton label="Sin filtro" onPress={handleAllTime} />
                {/* <ActionButton label="Año actual" onPress={handleSetCurrentYear} /> */}
                <ActionButton label="Mes actual" onPress={handleSetCurrentMonth} />
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* BOTÓN PRINCIPAL */}

      <Pressable style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 10, backgroundColor: 'white', borderRadius: 10, padding: 15, }} onPress={() => setModalVisible(true)}>
        <Text style={{ color: 'black', fontSize: 12, opacity: 0.6, fontWeight: 'bold' }}>Filtro de periodo</Text>
        <View style={styles.selectorButton}>
          <View style={styles.iconWrapper}>
            <Ionicons name="calendar-number-outline" size={18} color="black" />
          </View>
          {dateValue.month.id !== ''
            ? <Text style={styles.selectorText}>{dateValue.month.name} - {dateValue.year}</Text>
            : <Text style={styles.selectorText}>Sin filtro de fecha</Text>
          }
        </View>
      </Pressable>
    </>
  );
}

const ActionButton = ({ label, onPress }) => (
  <Pressable style={styles.actionButton} onPress={onPress}>
    <Text style={styles.actionButtonText}>{label}</Text>
  </Pressable>
);

const styles = {
  modalOverlay: {
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 11,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
  },
  modalContent: {
    padding: 10,
    gap: 20,
  },
  yearSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconButton: {
    padding: 20,
  },
  yearText: {
    fontWetight: 'bold',
    fontSize: 26,
  },
  monthsGrid: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  monthButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 90,
    position: 'relative',
  },
  monthText: {
    fontSize: 12,
    textAlign: 'center',
  },
  expenseBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 5,
    opacity: 0.8,
  },
  expenseBadgeText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#2282e3',
    padding: 10,
    borderRadius: 10,
  },
  actionButtonText: {
    color: 'white',
  },
  selectorButton: {

    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrapper: {
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 5,
  },
  selectorText: {
    fontSize: 20,
  },
};