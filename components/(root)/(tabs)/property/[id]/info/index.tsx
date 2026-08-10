import { formatPrice } from '@/lib/utils'
import { Property } from '@/types'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Chip from './chip'
import { PropertySpecs } from './property-specs'

const Info = ({ property }: { property: Property }) => {
    const [expanded, setExpanded] = useState(false);

    const isLongDescription = property.description.length > 120;
    const displayDescription =
        expanded || !isLongDescription
            ? property.description
            : property.description.slice(0, 120) + '...';

    return (
        <>
            <View className='flex-row gap-2 mb-3 flex-wrap'>
                <Chip
                    label={property.type}
                    bgColor='bg-blue-50'
                    textColor='text-gray-700'
                />

                {property.is_featured && <Chip
                    label='Featured'
                    bgColor='bg-amber-50'
                    textColor='text-amber-600'
                />}

                {property.is_sold && <Chip
                    label='Sold'
                    bgColor='bg-red-50'
                    textColor='text-red-600'
                />}

            </View>

            <Text className='text-2xl font-bold text-gray-900 mb-1'>
                {property.title}
            </Text>

            <Text className='text-xl font-bold text-blue-600 mb-4'>
                {formatPrice(property.price)}
            </Text>

            {/* Specs */}
            <PropertySpecs property={property} />

            <Text className='text-base font-bold text-gray-900 mb-4'>
                Description
            </Text>

            <Text className='text-gray-500 text-sm leading-6 mb-1'>{displayDescription}</Text>

            {isLongDescription && (
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                >
                    <Text className='text-blue-600 font-medium mb-5'>
                        {expanded ? 'Show Less' : 'Read More'}
                    </Text>
                </TouchableOpacity>
            )}
        </>
    )
}

export default Info