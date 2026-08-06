import { useAuth, useSignUp } from '@clerk/expo';
import { Link, Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
const logo = require('@/assets/images/kribb.png');

const SignUp = () => {
    const { errors, signUp, fetchStatus } = useSignUp();
    const { isSignedIn } = useAuth();
    const router = useRouter();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const [isVerifying, setIsVerifying] = useState(false)

    const isLoading = fetchStatus === "fetching";

    const onSignUpPress = async () => {
        const { error } = await signUp.password({
            firstName,
            lastName,
            emailAddress,
            password,

        })

        if (error) {
            Alert.alert("Error:", error.message);
            return;
        }

        const { error: sendError } = await signUp.verifications.sendEmailCode()
        if (sendError) {
            // Handle the error in your app.
            Alert.alert("Error:", sendError.message);
            return
        }

        setIsVerifying(true)
    }

    const onVerifyPress = async () => {
        const { error } = await signUp.verifications.verifyEmailCode({
            code,
        })

        if (error) {
            Alert.alert("Error:", error.message);
            return;
        }

        // If the status code is 'verified', the user is done.
        if (signUp.status === 'complete') {
            await signUp.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl('/')
                    router.replace(url as any)
                }
            })
        }

    }

    if (signUp.status === 'complete' || isSignedIn) {
        return <Redirect href="/" />
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            className='bg-white'
            keyboardShouldPersistTaps="handled"
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {isVerifying ?
                    <View className="flex-1 justify-center px-6 py-12">
                        <Image className="w-32 h-16 mb-8" source={logo} resizeMode="contain" />
                        <Text className='text-3xl font-bold text-gray-800 mb-2'>Verify Account</Text>
                        <Text className='text-gray-500 mb-6'>We sent a code</Text>

                        <TextInput
                            placeholder="Enter Verification Code"
                            value={code}
                            onChangeText={setCode}
                            className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
                            autoCapitalize='words'
                            placeholderTextColor="#9CA3AF"
                            keyboardType='number-pad'
                        />
                        {errors.fields.code && (
                            <Text className=" text-red-500 mb-4"> {errors.fields.code.message}</Text>
                        )}

                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={onVerifyPress}
                            className="w-full bg-blue-500 rounded-xl px-4 py-3 mb-4">
                            {isLoading
                                ? <ActivityIndicator color="white" />
                                : <Text className="text-white font-bold text-center text-base">Verify</Text>
                            }

                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => signUp.verifications.sendEmailCode()}>
                            <Text className='text-blue-500 font-semibold' >
                                I need another code
                            </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View className="flex-1 justify-center px-6 py-12">
                        <Image className="w-32 h-16 mb-8" source={logo} resizeMode="contain" />
                        <Text className='text-3xl font-bold text-gray-800 mb-2'>Create Account</Text>
                        <Text className='text-gray-500 mb-6'>Find your dream home</Text>

                        <View className="flex-row gap-3 mb-4">
                            <TextInput
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
                                autoCapitalize='words'
                                placeholderTextColor="#9CA3AF"
                            />
                            <TextInput
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3"
                                autoCapitalize='words'
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        <TextInput
                            placeholder="Email"
                            value={emailAddress}
                            onChangeText={setEmailAddress}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
                            autoCapitalize='none'
                            keyboardType='email-address'
                            placeholderTextColor="#9CA3AF"
                        />
                        {errors.fields.emailAddress && (
                            <Text className=" text-red-500 mb-4"> {errors.fields.emailAddress.message}</Text>
                        )}

                        <TextInput
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
                            placeholderTextColor="#9CA3AF"
                        />
                        {errors.fields.password && (
                            <Text className=" text-red-500 mb-4"> {errors.fields.password.message}</Text>
                        )}

                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={onSignUpPress}
                            className="w-full bg-blue-500 rounded-xl px-4 py-3 mb-4">
                            {isLoading
                                ? <ActivityIndicator color="white" />
                                : <Text className="text-white font-bold text-center text-base">Sign Up</Text>
                            }

                        </TouchableOpacity>

                        <View className="flex-row items-center justify-center">
                            <Text className="text-gray-500">Already have an account? </Text>
                            <Link href="/sign-in" asChild>
                                <Text className="text-blue-500 font-semibold text-base">Sign In</Text>
                            </Link>
                        </View>

                        <View nativeID='clerk-captcha' />
                    </View>
                }
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default SignUp