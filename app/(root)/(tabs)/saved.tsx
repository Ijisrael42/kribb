import SavedListProperties from '@/components/(root)/(tabs)/saved/list';
import { useSupabase } from '@/hooks/useSupabase';
import { SavedProperty } from '@/types';
import { useAuth } from '@clerk/expo';
import { useFocusEffect } from 'expo-router';
import { styled } from "nativewind";
import { useCallback, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Saved = () => {
    const { userId } = useAuth();
    const authSupabase = useSupabase();
    const [saved, setSaved] = useState<SavedProperty[]>([]);
    const [loading, setLoading] = useState(false);


    const fetchSavedProperties = useCallback(async () => {
        if (!userId) return;

        try {
            setLoading(true);

            // Fetch saved properties for the authenticated user
            const { data: savedProperties, error: savedError } = await authSupabase
                .from("saved_properties")
                .select(`
                    id,
                    property_id,
                    properties(*)
                `)
                .eq("user_clerk_id", userId)
                .order('created_at', { ascending: false });

            if (savedError) {
                console.error("Error fetching saved properties:", savedError);
                return;
            }

            if (savedProperties) {
                /* const properties = savedProperties.map((savedProperty: any) => ({
                    ...savedProperty.property,
                })); */
                setSaved((savedProperties as unknown as SavedProperty[]) ?? []);
            }
        } catch (error) {
            console.error("Error fetching saved properties:", error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useFocusEffect(
        useCallback(() => {
            fetchSavedProperties();
        }, [])
    );
    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className="px-5 pt-4 pb-3">
                <Text className='text-2xl font-bold text-gray-900'>Saved</Text>
                <Text className="text-sm font-bold text-gray-600">
                    {saved?.length} {saved?.length === 1 ? "property" : "properties"}
                    {" "}
                    saved
                </Text>
            </View>
            {loading
                ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#EF4444" />
                    </View>)
                : (
                    <SavedListProperties data={saved} />
                )}
        </SafeAreaView>
    )
}

export default Saved