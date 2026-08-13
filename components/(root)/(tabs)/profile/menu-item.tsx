import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'

interface MenuItemProps {
    icon: keyof typeof Ionicons.glyphMap
    label: string
    onPress?: () => void
}

const MenuItem = ({ icon, label, onPress }: MenuItemProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={onPress}
            className='flex-row items-center gap-4 bg-gray-50 px-4 py-4 rounded-2xl'
        >
            <Ionicons name={icon} size={22} color="#6B7280" />
            <Text className='flex-1 text-base font-medium text-gray-700'>{label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
    )
}

export default MenuItem