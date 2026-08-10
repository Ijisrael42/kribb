import { Property } from '@/types';
import React, { memo, useCallback, useState } from 'react';
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from "react-native-image-viewing";

interface ImageItemProps {
    item: string;
    width: number;
    onPress: () => void;
}

const ImageItem = memo(({ item, width, onPress }: ImageItemProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
        >
            <Image
                source={{ uri: item }}
                style={{ width, height: 300 }}
                resizeMode='cover'
            />
        </TouchableOpacity>
    );
});
ImageItem.displayName = 'ImageItem';

const ImageCarousel = (
    {
        property,
        onScroll,
        activeIndex,
        width
    }: {
        property: Property,
        onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void,
        activeIndex: number,
        width: number
    }) => {
    const [imageViewerVisible, setImageViewerVisible] = useState(false);

    const handlePressImage = useCallback(() => {
        setImageViewerVisible(true);
    }, []);

    const renderItem = useCallback(({ item }: { item: string }) => (
        <ImageItem item={item} width={width} onPress={handlePressImage} />
    ), [width, handlePressImage]);

    const keyExtractor = useCallback((_: string, i: number) => i.toString(), []);

    const getItemLayout = useCallback((_: any, index: number) => ({
        length: width,
        offset: width * index,
        index,
    }), [width]);

    return (
        <>
            <View style={{ opacity: property.is_sold ? 0.5 : 1 }}>
                <FlatList
                    data={property.images}
                    keyExtractor={keyExtractor}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    renderItem={renderItem}
                    getItemLayout={getItemLayout}
                    initialNumToRender={1}
                    maxToRenderPerBatch={2}
                    windowSize={3}
                    removeClippedSubviews
                />
            </View>

            {/* Image count badge */}
            <View className='absolute bottom-4 right-4 bg-black/50 px-3 py-2 rounded-full'>
                <Text className='text-white text-xs font-medium'>
                    {activeIndex + 1} / {property.images?.length || 0}
                </Text>
            </View>

            <ImageViewing
                images={property.images.map(img => ({ uri: img }))}
                imageIndex={activeIndex}
                visible={imageViewerVisible}
                onRequestClose={() => setImageViewerVisible(false)}
                animationType='fade'
            />
        </>
    )
}

export default memo(ImageCarousel);