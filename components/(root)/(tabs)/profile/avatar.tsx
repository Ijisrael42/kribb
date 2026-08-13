import { useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native';

const Avatar = () => {
    const { user, isLoaded } = useUser();
    const [isUpdating, setIsUpdating] = useState(false);
    const image = user?.imageUrl || "";

    const handleUpdateProfileImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert("Permission required",
                    "Please allow access to your media library to upload a profile picture"
                );
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                base64: true
            });

            if (result.canceled || !result.assets?.[0].uri) return;

            setIsUpdating(true);

            const base64Image = result.assets[0].base64;
            const uri = result.assets[0].uri;

            const filename = uri.split("/").pop() || "profile.jpg";

            const match = /\.(\w+)$/.exec(filename);
            const mimeType = match ? `image/${match[1]}` : "image/jpeg";
            const dataUrl = `data:${mimeType};base64,${base64Image}`;

            await user?.setProfileImage({ file: dataUrl });

            Alert.alert("Success", "Profile picture updated successfully!");

        } catch (error) {
            console.error("Error updating profile image:", error);
            Alert.alert("Error", "Failed to update profile picture. Please try again!");
        } finally {
            setIsUpdating(false);
        }
    }

    if (!user || !isLoaded) {
        return (
            <View className='items-center py-8'>
                <ActivityIndicator size="large" color="#E55B27" />
            </View>
        )
    }

    return (
        <View className='items-center py-8'>
            <View className='relative'>
                <Image
                    source={{ uri: image }}
                    className='w-24 h-24 mb-4 rounded-full'
                />
                <TouchableOpacity
                    className='absolute bottom-2 right-0 bg-blue-600 rounded-full p-2'
                    disabled={isUpdating}
                    onPress={handleUpdateProfileImage}
                >
                    {isUpdating
                        ? (<ActivityIndicator size="small" color="white" />)
                        : (<Ionicons name='camera' size={16} color="white" />)
                    }
                </TouchableOpacity>
            </View>

            <Text className="text-xl font-bold text-gray-800 mb-1">
                {user.firstName} {user.lastName}
            </Text>
            <Text className="text-gray-500 mt-1">
                {user.emailAddresses[0].emailAddress}
            </Text>
        </View>
    )
}

export default Avatar