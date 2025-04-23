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
                                borderWidth: categorySelected.id == category.id ? 1.5 : 0.5,
                                borderRadius: 10,
                                padding: 5,
                                gap: 5,
                                backgroundColor: categorySelected.id == category.id ? '#eaf4fc' : 'transparent'
                            }} onPress={() => {
                                setCategory(category)
                            }} >
                                <View style={{ height: 15, width: 15, borderRadius: 20, backgroundColor: category.color || '' }}></View>
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