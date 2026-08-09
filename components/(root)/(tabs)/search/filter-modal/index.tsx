import { BEDS, TYPES } from '@/constants/modal-filter';
import { useFilterStore } from '@/store/filterStore';
import { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Chips from './chip';
import Header from './header';
import PriceRanges from './price-ranges';

const FilterModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {

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
        setMaxPrice,
        resetFilters
    } = useFilterStore();

    const [localMin, setLocalMin] = useState<string>(minPrice ? String(minPrice) : '');
    const [localMax, setLocalMax] = useState<string>(maxPrice ? String(maxPrice) : '');

    const PRICE_INPUTS = [
        { label: "Min Price", value: localMin, onChange: setLocalMin, placeholder: "0" },
        { label: "Max Price", value: localMax, onChange: setLocalMax, placeholder: "Any" },
    ]

    const activeCount = [
        type !== null,
        bedrooms !== null,
        minPrice !== null,
        maxPrice !== null
    ].filter(Boolean).length;

    const handleReset = () => {
        setLocalMin('');
        setLocalMax('');
        resetFilters();
        onClose();
    }

    const handleApply = () => {
        if (localMin) {
            setMinPrice(Number(localMin));
        }
        if (localMax) {
            setMaxPrice(Number(localMax));
        }
        onClose();
    }

    return (
        <Modal
            animationType="slide"
            visible={visible}
            presentationStyle='pageSheet'
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-white">
                {/* Header */}
                <Header
                    onClose={onClose}
                    handleReset={handleReset}
                />

                <ScrollView
                    contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Chips
                        label='Property Type'
                        data={TYPES}
                        selected={type}
                        setSelected={setType}
                    />

                    <Chips
                        label='Bedrooms'
                        data={BEDS}
                        selected={bedrooms}
                        setSelected={setBedrooms}
                    />

                    <PriceRanges
                        localMax={localMax}
                        setLocalMax={setLocalMax}
                        localMin={localMin}
                        setLocalMin={setLocalMin}
                    />
                </ScrollView>

                <View className="px-5 py-4 bg-white border-t border-gray-100">
                    <TouchableOpacity
                        onPress={handleApply}
                        className='bg-blue-600 rounded-full py-4 items-center'
                        style={{
                            shadowColor: "#2563EB",
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.03,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        <Text className="text-white text-lg font-bold">
                            Apply Filters {activeCount > 0 && `(${activeCount})`}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default FilterModal