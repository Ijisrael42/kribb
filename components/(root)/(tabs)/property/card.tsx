import { formatPrice } from '@/lib/utils'
import { Property } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { memo } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const PropertyCard = memo((
    { property, onUnsave, showSave }:
        {
            property: Property,
            onUnsave?: () => void,
            showSave?: boolean
        }
) => {
    const isSaved = true;
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push(`/property/${property.id}`)}
            className='flex-row mb-4 rounded-2xl overflow-hidden bg-white'
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 4,
                opacity: property.is_sold ? 0.5 : 1
            }}
        >
            <Image
                source={{ uri: property.images[0] }}
                className='w-32 h-32 rounded-lg'
                resizeMode='cover'
            />

            <View className='flex-1 justify-between p-3'>
                <View className="flex-row justify-between">
                    <View>
                        <Text
                            className="text-sm font-bold text-gray-800 mb-1"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {property.title}
                        </Text>
                        <View className="flex-row items-center gap-1">
                            <Ionicons name='location' size={14} color="#6B7280" />
                            <Text
                                className="text-xs text-gray-600"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {property.city}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity className='w-10 items-end'>
                        <Ionicons
                            name={`heart${isSaved ? "" : "-outline"}`}
                            size={18}
                            color={isSaved ? "#EF4444" : "#6B7280"}
                        />
                    </TouchableOpacity>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className='text-blue-600 font-bold text-base'>
                        {formatPrice(property.price)}
                    </Text>

                    {property.is_sold && (
                        <View className="bg-red-50 px-2 py-0.5 rounded-md">
                            <Text className="text-red-500 text-xs font-semibold">
                                Sold
                            </Text>
                        </View>
                    )}

                    <View className='flex-row items-center gap-3'>
                        <View className='flex-row items-center gap-1'>
                            <Ionicons name='bed-outline' size={11} color="#6B7280" />
                            <Text className='text-xs text-gray-500'>
                                {property.bedrooms}
                            </Text>
                        </View>
                        <View className='flex-row items-center gap-1'>
                            <Ionicons name='expand-outline' size={11} color="#6B7280" />
                            <Text className='text-xs text-gray-500'>
                                {property.area_sqft} ft
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        </TouchableOpacity>
    )
});

PropertyCard.displayName = 'PropertyCard';

export default PropertyCard;