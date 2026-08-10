import { Property } from '@/types';
import React, { memo, useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import PropertyCard from '../../property/card';

const SearchList = ({ properties, loading }: { properties: Property[], loading: boolean }) => {
    const renderItem = useCallback(({ item }: { item: Property }) => (
        <PropertyCard property={item} />
    ), []);

    const keyExtractor = useCallback((item: Property) => item.id, []);

    return (
        <FlatList
            data={properties}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews
            ListHeaderComponent={
                <Text className='text-sm text-gray-400 mb-4'>
                    {loading
                        ? "Searching..."
                        : `${properties.length} ${properties.length === 1 ? "property" : "properties"} found`
                    }
                </Text>
            }
            renderItem={renderItem}
            ListEmptyComponent={
                !loading ?
                    <View className='items-center py-10'>
                        <Text className='text-gray-400 text-base'>No properties found</Text>
                        <Text className='text-gray-300 text-sm'>Try adjusting your filters or search terms</Text>
                    </View>
                    : <ActivityIndicator
                        size={"large"}
                        className="text-blue-500"
                    />
            }
        />
    )
}

export default memo(SearchList);