import { Property } from '@/types/index'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import FeaturedCard from './card'

const Featured = ({ loading, featured }: { loading: boolean, featured: Property[] }) => {
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
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ padding: 20 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <FeaturedCard property={item} />
                    )}
                />
            )}
        </View>
    )
}

export default Featured