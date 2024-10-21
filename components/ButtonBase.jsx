import { Text, Pressable } from 'react-native'

export default function ButtonBase({ title, onPress }) {
    return (
        <Pressable style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, }} onPress={onPress}>
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700', fontSize: 17 }}>{title}</Text>
        </Pressable>
    )
}