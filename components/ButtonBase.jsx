import { Text, Pressable } from 'react-native'

export default function ButtonBase({ title, onPress, customStyleContainer, customStyleText }) {
    return (
        <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, ...customStyleContainer }} onPress={onPress}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17, ...customStyleText }}>{title}</Text>
        </Pressable>
    )
}