import { chip, chipText, PRICE_PRESETS, shadow } from '@/constants/modal-filter';
import { useFilterStore } from '@/store/filterStore';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const PriceRanges = ({
    localMax,
    setLocalMax,
    localMin,
    setLocalMin }: {
        localMax: string,
        setLocalMax: (value: string) => void,
        localMin: string,
        setLocalMin: (value: string) => void
    }) => {

    const {
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice
    } = useFilterStore();


    const PRICE_INPUTS = [
        { label: "Min Price", value: localMin, onChange: setLocalMin, placeholder: "0" },
        { label: "Max Price", value: localMax, onChange: setLocalMax, placeholder: "Any" },
    ]

    return (
        <>
            <Text className='font-bold text-base text-gray-900 mb-3'>
                Price Range
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-4">
                {PRICE_INPUTS.map(({ label, value, onChange, placeholder }) => (
                    <View key={label} className='flex-1'>
                        <Text className='font-medium text-sm text-gray-500 mb-1.5'>
                            {label}
                        </Text>
                        <View
                            className="flex-row items-center bg-white rounded-xl border border-gray-200 px-3"
                            style={shadow}
                        >
                            <Text className='text-gray-400 text-sm mr-1'>$</Text>
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder={placeholder}
                                placeholderTextColor={'#9ca3af'}
                                keyboardType='numeric'
                                className="flex-1 text-gray-800 py-3"
                            />
                        </View>
                    </View>
                ))}
            </View>


            <View className="flex-row flex-wrap gap-x-1 gap-y-3 mb-6">
                {PRICE_PRESETS.map((item) => {
                    const isActive = minPrice === item.min && maxPrice === item.max;

                    return (
                        <TouchableOpacity
                            key={item.label}
                            onPress={() => {
                                setLocalMin(item.min ? String(item.min) : '');
                                setLocalMax(item.max ? String(item.max) : '');
                                setMinPrice(item.min);
                                setMaxPrice(item.max);
                            }}
                            className={`px-1 py-1.5 rounded-full border ${chip(isActive)}`}
                            style={shadow}
                        >
                            <Text className={`font-bold ${chipText(isActive)}`}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </>
    )
}

export default PriceRanges