import { Image, Text, View } from 'react-native';
const logo = require('@/assets/images/kribb.png');

const Header = ({ username }: { username?: string }) => {
    return (
        <View className='flex-row justify-between items-center px-6 py-3 pt-4 pb-5'>
            <Image
                style={{ width: 90, height: 36 }}
                source={logo}
                resizeMode="contain"
            />

            <View>
                <Text className='text-gray-500'>Good morning,</Text>
                <Text className='font-bold text-gray-900'>{username}</Text>
            </View>
        </View>
    )
}

export default Header