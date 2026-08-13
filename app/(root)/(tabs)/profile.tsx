import Avatar from '@/components/(root)/(tabs)/profile/avatar';
import MenuItem from '@/components/(root)/(tabs)/profile/menu-item';
import { useAuth, useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import { useState } from 'react';
import { ActivityIndicator, Alert, Linking, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Profile = () => {
    const router = useRouter()
    const { signOut } = useAuth()
    const { user, isLoaded } = useUser();
    const [isUpdating, setIsUpdating] = useState(false);

    const image = user?.imageUrl || ""

    const handleLogout = async () => {
        setIsUpdating(true);
        try {
            await signOut();
            router.replace('/(root)/(tabs)');
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            setIsUpdating(false);
        }
    };


    if (!isLoaded || !user) {
        return (
            <SafeAreaView className='flex-1 bg-white items-center justify-center'>
                <ActivityIndicator size={"large"} color={"#E55B27"} />
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className='flex-1 bg-white mb-10'>
            <Avatar />

            <View className='px-6 gap-2'>
                <MenuItem
                    label="Saved Properties"
                    onPress={() => router.push("/(root)/(tabs)/saved")}
                    icon="heart-outline"
                />
                <MenuItem
                    label="Notification"
                    onPress={() => Alert.alert("Notification", "Notification settings coming soon!")}
                    icon="notifications-outline"
                />
                <MenuItem
                    label="Settings"
                    onPress={() => Alert.alert("Notification", "Notification settings coming soon!")}
                    icon="settings-outline"
                />
                <MenuItem
                    label="Help & Support"
                    onPress={() =>
                        Linking.openURL("mailto:ijisrael42@gmail.com?subject=Help%20&%20Support-KribbApp")}
                    icon="information-circle-outline"
                />
            </View>

            <View className='px-6 mt-auto mb-15'>
                <TouchableOpacity
                    onPress={handleLogout}
                    disabled={isUpdating}
                    className='bg-red-50 border border-red-100 py-4 rounded-2xl flex-row justify-center items-center gap-2'
                >
                    <Ionicons name="log-out-outline" size={24} color="#E55B27" />
                    <Text className='text-red-500 text-base font-semibold'>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile