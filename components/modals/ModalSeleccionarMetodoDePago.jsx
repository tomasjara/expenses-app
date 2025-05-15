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
                                borderWidth: 1,
                                borderRadius: 10,
                                paddingVertical: 6,
                                paddingHorizontal: 10,
                                gap: 5,
                                borderColor: paymentMethodSelected.id == paymentMethod.id ? '#000' : 'gray',
                                backgroundColor: paymentMethodSelected.id == paymentMethod.id ? '#c9e4fa' : 'transparent'
                            }} onPress={() => {
                                setpaymentMethod(paymentMethod)
                            }} >
                                <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: paymentMethod.color || '' }}></View>
                                <Text >{paymentMethod.name || ''}</Text>
                            </Pressable>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}