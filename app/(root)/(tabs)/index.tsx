import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {


    return (
        <SafeAreaView className='flex-1 bg-gray-50'>
            <View className=''>
                <Text>HomeScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen