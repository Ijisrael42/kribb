import { formatPrice } from '@/lib/utils'
import { Property } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const FeaturedCard = ({ property }: { property: Property }) => {
    return (
        <TouchableOpacity
            className='w-72 mr-2 rounded-3xl overflow-hidden bg-white'
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.08,
                shadowRadius: 12,
                elevation: 4,
                opacity: property.is_sold ? 0.5 : 1
            }}
        >
            <Image
                source={{ uri: property.images[0] }}
                className='w-full h-44 rounded-lg'
                resizeMode='cover'
            />

            <View className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full">
                <Text className="text-blue-600 text-xs font-semibold capitalize">
                    {property.type}
                </Text>
            </View>

            {property.is_sold && (
                <View className="absolute top-3 right-3 bg-red-500 px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-semibold capitalize">
                        Sold
                    </Text>
                </View>
            )}

            <View className='p-4'>
                <Text
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    className='text-base text-gray-800 font-bold mb-1'
                >
                    {property.title}
                </Text>

                <View className="flex-row items-center gap-1 mb-3">
                    <Ionicons name='location' size={14} color="#6B7280" />
                    <Text className="text-xs text-gray-600">
                        {property.address}, {property.city}
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className='text-blue-600 font-bold text-base'>
                        {formatPrice(property.price)}
                    </Text>

                    <View className='flex-row items-center gap-3'>
                        <View className='flex-row items-center gap-1'>
                            <Ionicons name='bed-outline' size={14} color="#6B7280" />
                            <Text className='text-xs text-gray-500'>
                                {property.bedrooms}
                            </Text>
                        </View>
                        <View className='flex-row items-center gap-1'>
                            <Ionicons name='water-outline' size={14} color="#6B7280" />
                            <Text className='text-xs text-gray-500'>
                                {property.bathrooms}
                            </Text>
                        </View>
                    </View>
                </View>

            </View>



        </TouchableOpacity>
    )
}

export default FeaturedCard