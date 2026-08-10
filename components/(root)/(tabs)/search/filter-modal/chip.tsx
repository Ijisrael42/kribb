import { chip, chipText, shadow } from '@/constants/modal-filter';
import { Text, TouchableOpacity, View } from 'react-native';

const Chips = (
    { label, data, selected, setSelected }: {
        label: string,
        data: any[],
        selected: any,
        setSelected: (value: any) => void
    }) => {

    return (
        <>
            <Text className='font-bold text-base text-gray-900 mb-3'>
                {label}
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-6">
                {data.map((item) => (
                    <TouchableOpacity
                        key={item.value}
                        onPress={() => setSelected(item.value)}
                        className={chip(selected === item.value)}
                        style={shadow}
                    >
                        <Text className={chipText(selected === item.value)}>
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    )
}

export default Chips