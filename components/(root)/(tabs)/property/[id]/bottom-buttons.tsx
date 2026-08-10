import { useSupabase } from '@/hooks/useSupabase';
import { useUserStore } from '@/store/userStore';
import { Property } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Linking, Text, TouchableOpacity, View } from 'react-native';

const ADMIN_PHONE = "+27763644146"

const BottomButtons = (
    { property, setProperty }:
        {
            property: Property,
            setProperty: (property: Property) => void
        }
) => {
    const isAdmin = useUserStore((state) => state.isAdmin);
    const authSupabase = useSupabase();
    const router = useRouter();

    const handleContact = () => {
        const message = `Hi! I'm interested in the property: ${property?.title}`;
        const url = `https://wa.me/${ADMIN_PHONE} ?text=${encodeURIComponent(message)}`;
        Linking.openURL(url);
    }

    const handleMarkSold = () => {
        Alert.alert(
            "Mark as Sold",
            "Are you sure you want to mark this property as sold?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: async () => {
                        const { error } = await authSupabase
                            .from("properties")
                            .update({
                                is_sold: true
                            })
                            .eq("id", property.id)

                        if (error) {
                            console.error('Error marking property as sold:', error);
                            return;
                        }

                        setProperty({
                            ...property,
                            is_sold: true
                        })
                    }
                }
            ]
        )
    }

    const handleDelete = () => {
        Alert.alert(
            "Delete Property",
            "Are you sure you want to delete this property?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    style: "destructive",
                    onPress: async () => {
                        const { error } = await authSupabase
                            .from("properties")
                            .delete()
                            .eq("id", property.id)

                        if (error) {
                            console.error('Error deleting property:', error);
                            return;
                        }

                        router.push("/(root)/(tabs)");
                    }
                }
            ]
        )
    }

    return (
        <>
            <TouchableOpacity
                onPress={handleContact}
                activeOpacity={0.9}
                className='bg-green-100 py-4 rounded-2xl flex-row items-center justify-center gap-3 mb-6'
            >
                <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
                <Text className='text-sm font-bold text-gray-900'>Contact Agent</Text>
            </TouchableOpacity>

            {isAdmin &&
                <View className='flex-row gap-3'>
                    {!property.is_sold &&
                        <TouchableOpacity
                            className='flex-1 flex-row items-center justify-center gap-2 bg-amber-50 py-4 rounded-2xl border border-amber-200 mb-6'
                            onPress={handleMarkSold}
                        >
                            <Ionicons
                                name="checkmark-circle-outline"
                                size={18}
                                color="#D97706"
                            />
                            <Text className='font-semibold text-amber-600'>
                                Mark as Sold
                            </Text>
                        </TouchableOpacity>
                    }

                    <TouchableOpacity
                        className='flex-1 flex-row items-center justify-center gap-2 bg-red-50 py-4 rounded-2xl border border-red-200 mb-6'
                        onPress={handleDelete}
                    >
                        <Ionicons
                            name="trash-bin-outline"
                            size={18}
                            color="#D97706"
                        />
                        <Text className='font-semibold text-red-600'>
                            Delete
                        </Text>
                    </TouchableOpacity>
                </View>
            }
        </>
    )
}

export default BottomButtons