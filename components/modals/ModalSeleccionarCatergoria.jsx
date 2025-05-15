import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useExpensesStore } from '@/store/expensesStore'
import { ModalConfigCategoria } from './ModalConfigCategoria'

export const ModalSeleccionarCatergoria = ({ setCategory, categorySelected }) => {
    const { categories } = useExpensesStore(state => state)
    return (
        <View>
            <ModalConfigCategoria buttonIcon={true} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 10, marginTop: 10 }}>
                {categories && categories.map(category => {
                    if (category.disabled) return
                    return (
                        <View key={category.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Pressable style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'start',
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingVertical: 6,
                                paddingHorizontal: 10,
                                gap: 5,
                                borderColor: categorySelected.id == category.id ? '#000' : 'gray',
                                backgroundColor: categorySelected.id == category.id ? '#c9e4fa' : 'transparent'
                            }} onPress={() => {
                                setCategory(category)
                            }} >
                                <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: category.color || '' }}></View>
                                <Text >{category.name || ''}</Text>
                            </Pressable>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})