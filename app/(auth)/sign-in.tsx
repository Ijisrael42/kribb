import { useSignIn } from '@clerk/expo';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
const logo = require('@/assets/images/kribb.png');

const SignIn = () => {
    const { errors, signIn, fetchStatus } = useSignIn();
    const router = useRouter();

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const isLoading = fetchStatus === "fetching";

    const onSignInPress = async () => {
        const { error } = await signIn.password({
            emailAddress,
            password,

        })

        if (error) {
            Alert.alert("Error:", error.message);
            return;
        }

        if (signIn.status === 'complete') {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log('we have a task here!', session.currentTask)
                        return;
                    }

                    const url = decorateUrl('/')
                    router.replace(url as any)
                }
            })
        } else if (signIn.status === "needs_second_factor") {
            await signIn.mfa.sendPhoneCode();
        } else if (signIn.status === "needs_client_trust") {
            const emailCodeFactor = signIn.supportedSecondFactors.find(
                (factor) => factor.strategy === "email_code");

            if (emailCodeFactor) {
                await signIn.mfa.sendEmailCode();
            }
        } else {
            console.error("Sign-in attempt not complete:", signIn);
        }

    }

    const onVerifyPress = async () => {
        const { error } = await signIn.mfa.verifyEmailCode({
            code,
        })

        if (error) {
            Alert.alert("Error:", error.message);
            return;
        }

        // If the status code is 'verified', the user is done.
        if (signIn.status === 'complete') {
            await signIn.finalize({
                navigate: ({ session, decorateUrl }) => {
                    if (session?.currentTask) {
                        console.log('we have a task here!', session.currentTask)
                        return;
                    }

                    const url = decorateUrl('/')
                    router.replace(url as any)
                }
            })
        }

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
                {signIn.status === "needs_client_trust" ?
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

                        <TouchableOpacity onPress={() => signIn.mfa.sendEmailCode()}>
                            <Text className='text-blue-500 font-semibold' >
                                I need another code
                            </Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View className="flex-1 justify-center px-6 py-12">
                        <Image className="w-32 h-16 mb-8" source={logo} resizeMode="contain" />
                        <Text className='text-3xl font-bold text-gray-800 mb-2'>Welcome Back</Text>
                        <Text className='text-gray-500 mb-6'>Sign in to your account</Text>

                        <TextInput
                            placeholder="Email"
                            value={emailAddress}
                            onChangeText={setEmailAddress}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
                            autoCapitalize='none'
                            keyboardType='email-address'
                            placeholderTextColor="#9CA3AF"
                        />
                        {errors.fields.identifier && (
                            <Text className=" text-red-500 mb-4"> {errors.fields.identifier.message}</Text>
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
                            onPress={onSignInPress}
                            className="w-full bg-blue-500 rounded-xl px-4 py-3 mb-4">
                            {isLoading
                                ? <ActivityIndicator color="white" />
                                : <Text className="text-white font-bold text-center text-base">Sign In</Text>
                            }

                        </TouchableOpacity>

                        <View className="flex-row items-center justify-center">
                            <Text className="text-gray-500">Don&apos;t have an account? </Text>
                            <Link href="/sign-up" asChild>
                                <Text className="text-blue-500 font-semibold text-base">Sign Up</Text>
                            </Link>
                        </View>

                        <View nativeID='clerk-captcha' />
                    </View>
                }
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default SignIn