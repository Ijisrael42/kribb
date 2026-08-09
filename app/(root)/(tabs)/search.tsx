import FilterChip from '@/components/(root)/(tabs)/search/filter-chip';
import FilterModal from '@/components/(root)/(tabs)/search/filter-modal';
import SearchList from '@/components/(root)/(tabs)/search/list';
import SearchBar from '@/components/(root)/(tabs)/search/search-bar';
import { supabase } from '@/lib/supabase';
import { formatPrice } from '@/lib/utils';
import { useFilterStore } from '@/store/filterStore';
import { Property } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import { styled } from 'nativewind';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const Search = () => {
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const { openFilters } = useLocalSearchParams<{ openFilters?: string }>();
    useEffect(() => {
        if (openFilters === "true") {
            setShowFilters(true);
        }
    }, [openFilters])

    const {
        search,
        type,
        bedrooms,
        minPrice,
        maxPrice,
        setSearch,
        setType,
        setBedrooms,
        setMinPrice,
        setMaxPrice
    } = useFilterStore();

    const bedroomsLabel = `${bedrooms === 4 ? "4+" : bedrooms} ${bedrooms === 1 ? "bed" : "beds"}`;
    const priceLabel = minPrice && maxPrice
        ? `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
        : minPrice
            ? `From ${formatPrice(minPrice)}`
            : `Up to ${formatPrice(maxPrice!)}`;

    const activeFilters = [
        type !== null,
        bedrooms !== null,
        minPrice !== null,
        maxPrice !== null
    ].filter(Boolean).length;

    const fetchProperties = async () => {
        setLoading(true)

        let query = supabase.from('properties').select(`*`);

        if (search) {
            query = query.or(`title.ilike.%${search}%,city.ilike.%${search}%`)
        }

        if (type) query = query.eq('type', type);
        if (bedrooms) query = query.eq('bedrooms', bedrooms);
        if (minPrice) query = query.gte('price', minPrice);
        if (maxPrice) query = query.lte('price', maxPrice);

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching properties:', error);
            return;
        }

        if (data) {
            setProperties(data);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchProperties();
    }, [search, type, bedrooms, minPrice, maxPrice])

    return (
        <SafeAreaView className='flex-1 bg-gray-50'>
            <View className='px-5 pt-4 pb-3'>
                <Text className='font-bold text-gray-900 text-2xl mb-4'>
                    Find Property
                </Text>

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                    activeFilters={activeFilters}
                    setShowFilters={setShowFilters}
                />

                {/* Filter Chips */}
                {activeFilters > 0 && (
                    <View className='flex-row flex-wrap gap-x-1.5 gap-y-3 mt-3'>
                        {type && (
                            <FilterChip
                                label={type}
                                onPress={() => setType(null)}
                            />
                        )}
                        {bedrooms && (
                            <FilterChip
                                icon="bed"
                                label={bedroomsLabel}
                                onPress={() => setBedrooms(null)}
                            />
                        )}
                        {(minPrice !== null || maxPrice !== null) && (
                            <FilterChip
                                label={`${priceLabel}`}
                                onPress={() => {
                                    setMinPrice(null)
                                    setMaxPrice(null)
                                }}
                            />
                        )}

                    </View>
                )}
            </View>

            {/* Results */}
            <SearchList
                properties={properties}
                loading={loading}
            />

            {/* Filter Modal */}
            <FilterModal
                visible={showFilters}
                onClose={() => setShowFilters(false)}
            />
        </SafeAreaView>
    )
}

export default Search