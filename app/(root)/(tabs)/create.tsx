import FormInputs from '@/components/(root)/(tabs)/create/form-inputs';
import ImagesUpload from '@/components/(root)/(tabs)/create/images-upload';
import { INITIAL_FORM_STATE } from '@/constants';
import { FormState } from '@/types';
import { useRouter } from 'expo-router';
import { styled } from 'nativewind';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const CreateProperty = () => {
    const router = useRouter()
    const [form, setForm] = useState<FormState>(INITIAL_FORM_STATE)

    /* Loading states */
    const [submitting, setSubmitting] = useState(false)

    /* Error */
    const [error, setError] = useState('')

    const handleUpdateForm = (fields: Partial<FormState>) =>
        setForm(prev => ({ ...prev, ...fields }))

    const handleSubmit = async () => {
        // TODO
    }

    const handleCancel = () => {
        router.back()
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className='flex-1'
            >
                {/* Header */}
                <View className='flex-row items-center px-5 pt-4 pb-3'>
                    <Text className='text-2xl font-bold text-gray-900 flex-1'>
                        Add Property
                    </Text>
                </View>

                <ScrollView
                    contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                >
                    {/* Form */}

                    {/* Images upload */}
                    <ImagesUpload
                        form={form}
                        handleUpdateForm={handleUpdateForm}
                    />

                    {/* Basic Info */}
                    <FormInputs
                        form={form}
                        handleUpdateForm={handleUpdateForm}
                    />

                </ScrollView>


            </KeyboardAvoidingView>
        </SafeAreaView >
    )
}

export default CreateProperty