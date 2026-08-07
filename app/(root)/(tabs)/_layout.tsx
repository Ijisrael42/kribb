import { components } from "@/constants/theme";
import { useUserSync } from '@/hooks/useUserSync';
import { TabIconProps } from "@/types";
import { useAuth } from '@clerk/expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import clsx from "clsx";
import { Redirect, Tabs } from 'expo-router';
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBar = components.tabBar;

export default function TabLayout() {
    const { isLoaded, isSignedIn } = useAuth()
    const insets = useSafeAreaInsets();
    const TabIcon = ({ focused, name, color }: TabIconProps) => {
        return (<View className="tabs-icon">
            <View className={(clsx("tabs-pill", focused && "tabs-active"))}>
                <FontAwesome size={28} name={name} color={color} />
            </View>
        </View>)
    };

    if (!isLoaded) {
        return null
    }

    if (!isSignedIn) {
        return <Redirect href="/sign-in" />
    }

    useUserSync();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                position: "absolute",
                bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                height: tabBar.height,
                marginHorizontal: tabBar.horizontalInset,
                borderRadius: tabBar.radius,
                backgroundColor: "#fff",
                borderTopWidth: 0,
                elevation: 2
            },
            tabBarItemStyle: {
                paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6
            },
            tabBarIconStyle: {
                width: tabBar.iconFrame,
                height: tabBar.iconFrame,
                alignItems: "center",
            }
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused, color }) => <TabIcon focused={focused} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ focused, color }) => <TabIcon focused={focused} name="search" color={color} />,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    tabBarIcon: ({ focused, color }) => <TabIcon focused={focused} name="heart" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused, color }) => <TabIcon focused={focused} name="user" color={color} />,
                }}
            />
        </Tabs>
    );
}
