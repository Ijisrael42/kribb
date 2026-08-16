import { labelClass } from '@/constants'
import { FormState } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

interface CounterProps {
    label: string
    value: number
    onChange: (value: number) => void
}

export const Counter = ({
    label,
    value,
    onChange
}: CounterProps) => {
    return (
        <View className='flex-1'>
            <Text className={labelClass}>{label}</Text>
            <View className='flex-row items-center bg-white border border-gray-200 rounded-2xl overflow-hidden'>
                <TouchableOpacity
                    onPress={() => onChange(Math.max(1, value - 1))}
                    className='w-11 h-11 items-center justify-center'
                >
                    <Ionicons name='remove' size={24} color='#374151' />
                </TouchableOpacity>

                <Text className='text-xl font-bold text-gray-700 flex-1 text-center'>
                    {value}
                </Text>

                <TouchableOpacity
                    onPress={() => onChange(value + 1)}
                    className='w-11 h-11 items-center justify-center'
                >
                    <Ionicons name='add' size={24} color='#374151' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

interface BedBathCounterProps {
    form: FormState
    handleUpdateForm: (fields: Partial<FormState>) => void
}

export default function BedBathCounter({
    form,
    handleUpdateForm
}: BedBathCounterProps) {
    return (
        <View className={`flex-row gap-2 mb-5`}>
            <Counter
                label="Bedrooms"
                value={form.bedrooms}
                onChange={(value) => handleUpdateForm({ bedrooms: value })}
            />
            <Counter
                label="Bathrooms"
                value={form.bathrooms}
                onChange={(value) => handleUpdateForm({ bathrooms: value })}
            />
        </View>
    )
}