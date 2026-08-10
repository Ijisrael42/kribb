import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity } from 'react-native'

type FilterChipProps = {
    label: string,
    icon?: any,
    onPress: () => void,
}

const FilterChip = ({ label, icon, onPress }: FilterChipProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row gap-1 items-center bg-blue-50 border border-blue-100 rounded-full px-2 py-1`}
        >
            {icon && <Ionicons
                name={icon}
                size={16}
                color="#1d4ed8"
            />}
            <Text className='text-blue-700 text-sm font-semibold capitalize'>{label}</Text>
            <Ionicons
                name="close-circle"
                size={16}
                color="#1d4ed8"
            />
        </TouchableOpacity>
    )
}

export default FilterChip