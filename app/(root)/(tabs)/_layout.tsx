import { useAuth } from '@clerk/expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Redirect, Tabs } from 'expo-router';

export default function TabLayout() {
    const { isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) {
        return null
    }

    if (!isSignedIn) {
        return <Redirect href="/sign-in" />
    }

    return (
        <Tabs screenOptions={{
            headerShown: false,
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
                }}
            />
        </Tabs>
    );
}
