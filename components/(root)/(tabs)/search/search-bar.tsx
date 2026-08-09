import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

type SearchBarProps = {
    search: string;
    setSearch: (search: string) => void;
    activeFilters: number;
    setShowFilters: (showFilters: boolean) => void;
}

const SearchBar = ({ search, setSearch, activeFilters, setShowFilters }: SearchBarProps) => {
    return (
        <View className='flex-row items-center gap-3'>
            <View
                className='flex-1 flex-row items-center bg-white rounded-2xl px-4 gap-3'
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                }}
            >
                <Ionicons
                    name='search-outline'
                    size={20}
                    color={"#9CA3AF"}
                />
                <TextInput
                    placeholder="Search by title or city..."
                    className='flex-1 py-3 text-gray-800'
                    placeholderTextColor={"#9CA3AF"}
                    value={search}
                    onChangeText={setSearch}
                    autoCapitalize="none"
                />

                {search.length > 0 && (
                    <TouchableOpacity
                        onPress={() => setSearch('')}
                        className='p-2'
                    >
                        <Ionicons
                            name='close-circle-outline'
                            size={18}
                            color={"#9CA3AF"}
                        />
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity
                onPress={() => setShowFilters(true)}
                className={`w-10 h-10 rounded-2xl flex justify-center items-center ${activeFilters > 0 ? "bg-blue-500" : "bg-white"
                    }`}
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                }}
            >
                <Ionicons
                    name='options-outline'
                    size={20}
                    color={activeFilters > 0 ? "#fff" : "#9CA3AF"}
                />
                {activeFilters > 0 && (
                    <View className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex justify-center items-center">
                        <Text className="text-white text-xs font-bold">
                            {activeFilters}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar