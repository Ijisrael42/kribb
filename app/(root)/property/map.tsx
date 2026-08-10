import { getMapUrl } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import WebView from 'react-native-webview';

const SafeAreaView = styled(RNSafeAreaView)

const Map = () => {
    const {
        latitude,
        longitude,
        title,
        address,
    } = useLocalSearchParams<{
        latitude: string;
        longitude: string;
        title: string;
        address: string;
    }>();

    const router = useRouter()

    const latitudeNumber = parseFloat(latitude!);
    const longitudeNumber = parseFloat(longitude!);
    const mapUrl = getMapUrl(longitudeNumber, latitudeNumber, 0.001);
    const openMapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='flex-row items-center justify-between px-4 py-3 border-b border-gray-100'>
                <TouchableOpacity
                    className='w-9 h-9 items-center justify-center rounded-full bg-gray-100'
                    onPress={() => router.back()}>
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                <View className='flex-1 mx-3'>
                    <Text
                        className='text-sm font-semibold text-gray-900'
                        numberOfLines={2}
                    >
                        {title}
                    </Text>
                    <Text
                        className='text-gray-400 text-xs'
                        numberOfLines={1}
                    >
                        {address}
                    </Text>
                </View>

                <TouchableOpacity
                    className='flex-row items-center gap-1 px-3 py-2 rounded-full bg-blue-50'
                    onPress={() => Linking.openURL(openMapLink)}
                >
                    <Ionicons
                        name="navigate-outline"
                        size={24}
                        color="#2563eb"
                    />
                    <Text className='text-blue-600 font-semibold text-xs'>Google Maps</Text>
                </TouchableOpacity>
            </View>

            {/* Map */}
            <View className='flex-1 mx-3'>
                <WebView
                    source={{ uri: mapUrl }}
                    style={{ flex: 1 }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Map