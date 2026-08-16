import { labelClass, sectionClass } from '@/constants'
import { shadow } from '@/constants/modal-filter'
import { FormState } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

interface CoordinatesProps {
    form: FormState
    handleUpdateForm: (fields: Partial<FormState>) => void
}

const Coordinates = ({ form, handleUpdateForm }: CoordinatesProps) => {
    const [detectingLocation, setDetectingLocation] = useState(false)

    const handleLocationDetection = () => {
        // TODO
    }

    return (
        <View className={sectionClass}>
            <View className='flex-row items-center justify-between mb-1.5'>
                <Text className={labelClass}>Coordinates</Text>

                {/* Autocomplete button */}
                <TouchableOpacity
                    onPress={() => handleLocationDetection()}
                    disabled={detectingLocation}
                    className={`flex-row items-center gap-1.5 rounded-xl px-3 py-1.5 ${detectingLocation ? 'opacity-50' : 'bg-gray-50 border border-gray-200'
                        }`}
                    style={shadow}
                >
                    {detectingLocation ? (
                        <ActivityIndicator
                            size='small'
                            color='#2563EB'
                            className='mr-1'
                        />
                    ) : (
                        <>
                            <Ionicons name='locate-outline' size={16} color='#2563EB' />
                        </>
                    )}
                    <Text className={`text-xs text-gray-400 mt-1 ${detectingLocation ? 'animate-pulse' : ''}`}>
                        {detectingLocation ? 'Detecting...' : 'Detect Location'}
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Coordinates