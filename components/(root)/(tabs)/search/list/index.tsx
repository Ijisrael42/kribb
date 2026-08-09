import { Property } from '@/types';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import PropertyCard from '../../property/card';

const SearchList = ({ properties, loading }: { properties: Property[], loading: boolean }) => {
    return (
        <FlatList
            data={properties}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <Text className='text-sm text-gray-400 mb-4'>
                    {loading
                        ? "Searching..."
                        : `${properties.length} ${properties.length === 1 ? "property" : "properties"} found`
                    }
                </Text>
            }
            renderItem={({ item }) => (
                <PropertyCard property={item} />
            )}
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

export default SearchList