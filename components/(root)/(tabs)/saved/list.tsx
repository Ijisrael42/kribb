import PropertyCard from '@/components/(root)/(tabs)/property/card';
import { SavedProperty } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';

const SavedListProperties = ({ data }: { data: SavedProperty[] }) => {
    const renderItem = useCallback(({ item }: { item: SavedProperty }) => (
        <PropertyCard
            property={item.properties}
            onUnsave={() => { }}
        />
    ), []);

    const keyExtractor = useCallback((item: SavedProperty) => item.id, []);

    return (
        <FlatList
            data={data}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews
            renderItem={renderItem}
            ListEmptyComponent={
                <View className="flex-1 justify-center items-center py-24">
                    <View className='w-20 h-20 bg-red-50 rounded-full items-center justify-center mb-4'>
                        <Ionicons name="heart-outline" size={40} color="#EF4444" />
                    </View>
                    <Text className="text-gray-700 font-bold text-lg">No saved properties yet</Text>
                    <Text className="text-gray-400 text-sm text-center px-8">Tap the heart icon on any property to save it</Text>
                </View>
            }
        />
    )
}

export default SavedListProperties