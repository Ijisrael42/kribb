import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

const SearchBar = () => {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push('/(root)/(tabs)/search')}
            className="mx-5 mb-6 flex-row items-center bg-white rounded-2xl px-4 py-3 gap-3"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
            }}
        >
            <Ionicons name="search" size={24} color={"#9ca3af"} />
            <Text className='flex-1 text-sm text-gray-400'>
                Search properties, cities
            </Text>

            <TouchableOpacity
                onPress={() => router.push('/(root)/(tabs)/search?openFilters=true')}
            >
                <Ionicons name="options" size={24} color={"#9ca3af"} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default SearchBar