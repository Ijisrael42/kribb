import { Text, View } from 'react-native';

const Chip = ({ label, bgColor, textColor }: { label: string, bgColor: string, textColor: string }) => {
    return (
        <View className={`${bgColor} px-3 py-1 rounded-full`}>
            <Text className={`${textColor} font-semibold text-xs capitalize`}>
                {label}
            </Text>
        </View>
    )
}

export default Chip