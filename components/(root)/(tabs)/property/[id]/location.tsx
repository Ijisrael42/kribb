import { getMapUrl } from '@/constants'
import { useUserStore } from '@/store/userStore'
import { Property } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'
import { WebView } from 'react-native-webview'

const Location = ({ property }: { property: Property }) => {
    const router = useRouter();
    const mapUrl = getMapUrl(property.longitude, property.latitude, 0.003);
    const isAdmin = useUserStore((state) => state.isAdmin);

    return (
        <>
            <Text className='text-base font-bold text-gray-900 mb-2 mt-2'>
                Location
            </Text>

            <View className='flex-row items-center gap-2 mb-4'>
                <Ionicons name="location-outline" size={16} color="#6b7280" />
                <Text className='text-gray-500 text-sm flex-1'>
                    {property.address}, {property.city}
                </Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.9}
                className='rounded-2xl overflow-hidden mb-6'
                style={{ height: 200 }}
                onPress={() => {
                    router.push({
                        pathname: "/(root)/property/map",
                        params: {
                            latitude: property.latitude,
                            longitude: property.longitude,
                            title: property.title,
                            address: `${property.address}, ${property.city}`,
                        }
                    })
                }}
            >
                <WebView
                    source={{ uri: mapUrl }}
                    style={{ flex: 1 }}
                    scrollEnabled={false}
                    pointerEvents='none'
                />
                <View
                    className='absolute bottom-3 right-3 bg-white/90 px-3 py-1 rounded-full flex-row items-center gap-1'
                >
                    <Ionicons name="expand-outline" size={12} color="#374151" />
                    <Text className='text-xs text-gray-700 font-medium'>Tap to Expand</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default Location