import Featured from '@/components/(root)/(tabs)/featured';
import Header from '@/components/(root)/(tabs)/header';
import PropertyCard from '@/components/(root)/(tabs)/property/card';
import SearchBar from '@/components/(root)/(tabs)/search-bar';
import { supabase } from '@/lib/supabase';
import { Property } from '@/types';
import { useUser } from '@clerk/expo';
import { useFocusEffect, useRouter } from 'expo-router';
import { styled } from "nativewind";
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const HomeScreen = () => {
    const { user } = useUser();
    const router = useRouter();

    const [featured, setFeatured] = useState<Property[]>([]);
    const [recommended, setRecommended] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        try {
            setLoading(true)

            const { data: featured, error: featuredError } = await supabase
                .from("properties")
                .select("*")
                .eq("is_featured", true)
                .order('created_at', { ascending: false });

            if (featured) {
                setFeatured(featured ?? []);
            }

            const { data: recommended, error: recommendedError } = await supabase
                .from("properties")
                .select("*")
                .eq("is_featured", false)
                .order('created_at', { ascending: false });

            if (recommended) {
                setRecommended(recommended ?? []);
            }
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    }
    useFocusEffect(
        useCallback(() => {
            fetchProperties();
        }, [])
    );

    const renderItem = useCallback(({ item }: { item: Property }) => (
        <View className='px-5'>
            <PropertyCard property={item} />
        </View>
    ), []);

    const keyExtractor = useCallback((item: Property) => item.id, []);

    return (
        <SafeAreaView className='flex-1 bg-gray-50'>
            <FlatList
                data={recommended}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                windowSize={5}
                removeClippedSubviews
                ListHeaderComponent={
                    <View>

                        {/* Header */}
                        <Header username={user?.firstName ?? "User"} />

                        {/* SearchBar */}
                        <SearchBar />

                        {/* Featured Section */}
                        <Featured loading={loading} featured={featured} />

                        {/* Recommended Header */}
                        <Text className="text-lg font-bold text-gray-800 px-5 mb-4">
                            Recommended
                        </Text>
                    </View>
                }
                renderItem={renderItem}
                ListEmptyComponent={
                    !loading ?
                        <View className='items-center py-10'>
                            <Text className='text-gray-400'>No properties found</Text>
                        </View>
                        : <ActivityIndicator
                            size={"large"}
                            className="text-blue-500"
                        />
                }
            />
        </SafeAreaView>
    )
}

export default HomeScreen