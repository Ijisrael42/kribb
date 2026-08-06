import { useAuth } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
    const router = useRouter()
    const { signOut } = useAuth()

    return (
        <View>
            <Text>Profile</Text>
            <TouchableOpacity
                onPress={() => signOut()}
                className="bg-red-500 px-4 py-2 rounded"
            >
                <Text className="text-white">Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Profile