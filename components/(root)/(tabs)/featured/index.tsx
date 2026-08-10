import { Property } from '@/types/index';
import React, { memo, useCallback } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import FeaturedCard from './card';

const Featured = ({ loading, featured }: { loading: boolean, featured: Property[] }) => {
    const renderItem = useCallback(({ item }: { item: Property }) => (
        <FeaturedCard property={item} />
    ), []);

    const keyExtractor = useCallback((item: Property) => item.id, []);

    return (
        <View className='mb-6'>
            <Text className='px-5 font-bold text-gray-900 text-lg mb-4'>
                Featured
            </Text>

            {loading ? (
                <ActivityIndicator
                    className='py-10'
                    color={"#3B82F6"}
                    size={"small"}
                />
            ) : (
                <FlatList
                    data={featured}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{ padding: 20 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    initialNumToRender={3}
                    maxToRenderPerBatch={3}
                    windowSize={3}
                />
            )}
        </View>
    )
}

export default memo(Featured);