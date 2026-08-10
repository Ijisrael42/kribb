import { Property } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

export const PropertySpecs = ({ property }: { property: Property }) => {
    return (
        <View className='flex-row justify-between rounded-2xl p-4 bg-gray-50 mb-5 border border-gray-100'>
            <SpecItem
                icon="bed-outline"
                label="Bedrooms"
                value={`${property.bedrooms}`}
            />
            <SpecItem
                icon="water-outline"
                label="Bathrooms"
                value={`${property.bathrooms}`}
            />
            <SpecItem
                icon="expand-outline"
                label="Area"
                value={`${property.area_sqft}sqft`}
            />
            <SpecItem
                icon="home-outline"
                label="Type"
                value={`${property.type}`}
            />
        </View>
    )
}

const SpecItem = ({ icon, label, value }: { icon: keyof typeof Ionicons.glyphMap, label: string, value: string }) => {
    return (
        <View className='items-center gap-1'>
            <Ionicons name={icon} size={20} color={'#2563eb'} />
            <Text className='text-gray-900 font-semibold text-sm'>{value}</Text>
            <Text className='text-gray-400 text-xs'>{label}</Text>
        </View>
    )
}