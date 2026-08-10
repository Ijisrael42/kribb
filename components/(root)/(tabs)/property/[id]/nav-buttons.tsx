import { useSavedProperty } from '@/hooks/useSavedProperty';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView)

const NavButtons = ({ propertyId }: { propertyId: string }) => {
    const router = useRouter();
    const { isSaved, toggleSave, saveLoading } = useSavedProperty({
        propertyId,
    });
    return (
        <SafeAreaView className="absolute top-0 left-0 right-0">
            <View className="flex-row items-center justify-between p-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-white items-center justify-center rounded-full p-2">
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#111827"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={saveLoading}
                    onPress={toggleSave}
                    className="w-10 h-10 bg-white items-center justify-center rounded-full p-2">
                    <Ionicons
                        name={isSaved ? "heart" : "heart-outline"}
                        size={24}
                        color={isSaved ? "#EF4444" : "#111827"}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavButtons