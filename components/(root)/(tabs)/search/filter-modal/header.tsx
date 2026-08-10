import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Header = ({
    onClose,
    handleReset
}: {
    onClose: () => void,
    handleReset: () => void
}) => {
    return (
        <View className="px-5 pt-6 pb-4 flex-row items-center justify-between border-b border-gray-100">
            <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-gray-900">Filters</Text>
            <TouchableOpacity onPress={handleReset}>
                <Text className='font-semibold text-sm text-blue-600'>Reset</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header