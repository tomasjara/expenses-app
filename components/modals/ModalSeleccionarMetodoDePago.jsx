import { View, Text, Pressable } from 'react-native'
import { ModalConfigMetodoDePago } from './ModalConfigMetodoDePago'

export const ModalSeleccionarMetodoDePago = ({ paymentMethods, setpaymentMethod, paymentMethodSelected }) => {
    return (
        <View>
            <ModalConfigMetodoDePago buttonIcon={true} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 10, marginTop: 10 }}>
                {paymentMethods && paymentMethods.map(paymentMethod => {
                    if (paymentMethod.disabled) return
                    return (
                        <View key={paymentMethod.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                            <Pressable style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'start',
                                borderWidth: paymentMethodSelected.id == paymentMethod.id ? 1.5 : 0.5,
                                borderRadius: 10,
                                padding: 5,
                                gap: 5,
                                backgroundColor: paymentMethodSelected.id == paymentMethod.id ? '#eaf4fc' : 'transparent'
                            }} onPress={() => {
                                setpaymentMethod(paymentMethod)
                            }} >
                                <View style={{ height: 20, width: 20, borderRadius: 20, backgroundColor: paymentMethod.color || '' }}></View>
                                <Text >{paymentMethod.name || ''}</Text>
                            </Pressable>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}