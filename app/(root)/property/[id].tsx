import BottomButtons from '@/components/(root)/(tabs)/property/[id]/bottom-buttons';
import ImageCarousel from '@/components/(root)/(tabs)/property/[id]/image-carousel';
import Info from '@/components/(root)/(tabs)/property/[id]/info';
import Location from '@/components/(root)/(tabs)/property/[id]/location';
import NavButtons from '@/components/(root)/(tabs)/property/[id]/nav-buttons';
import { supabase } from '@/lib/supabase';
import { Property } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, Text, View } from 'react-native';
const { width } = Dimensions.get('window');

const PropertyPage = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchProperty = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching property:', error);
            return;
        }
        if (data) {
            setProperty(data);
        }
        setLoading(false);
    }

    const onScroll = React.useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width);
        setActiveIndex((prev) => (prev === index ? prev : index));
    }, []);

    useEffect(() => {
        fetchProperty();
    }, [id])

    if (!property) {
        return (
            <View className='flex-1 bg-white'>
                <Text className='text-gray-500'>Property not found</Text>
            </View>
        )
    }

    return (
        <View className='flex-1 bg-white'>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Image Carouse */}
                <View>
                    <ImageCarousel
                        property={property}
                        onScroll={onScroll}
                        activeIndex={activeIndex}
                        width={width}
                    />
                </View>

                {/* Nav Buttons */}
                <NavButtons propertyId={id!} />

                {/* Top Info Card */}
                <View className='px-4 pt-5'
                    style={{
                        opacity: property.is_sold ? 0.6 : 1,
                    }}
                >
                    {/* Info */}
                    <Info property={property} />

                    {/* Location */}
                    <Location property={property} />

                    {/* Bottom Buttons */}
                    <BottomButtons
                        property={property}
                        setProperty={setProperty}
                    />
                </View>
            </ScrollView>
        </View>
    )
}

export default PropertyPage
