import { labelClass, sectionClass } from '@/constants'
import { useSupabase } from '@/hooks/useSupabase'
import { FormState } from '@/types'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native'

interface ImagesUploadProps {
    form: {
        images: string[]
        localImages: string[]
    }
    handleUpdateForm: (fields: Partial<FormState>) => void;
}

const ImagesUpload = ({ form, handleUpdateForm }: ImagesUploadProps) => {
    const [uploadingImages, setUploadingImages] = useState(false);
    const authSupabase = useSupabase();

    const handleImagePick = async () => {
        // TODO
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permission.granted) {
            Alert.alert(
                "Permission Required",
                "Please allow access to your library"
            )
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsMultipleSelection: true,
            quality: 0.7,
            base64: true,
            selectionLimit: 6,
        })

        if (result.canceled || !result.assets) return;

        setUploadingImages(true);

        const uploadedUris: string[] = [];
        const previewUris: string[] = [];

        for (const asset of result.assets) {

            try {
                const filename = `property_${Date.now()}_${Math.random().toString(36).slice(2)}.jpg`

                const base64 = asset.base64;
                const buffer = Uint8Array.from(atob(base64!), c => c.charCodeAt(0));

                const { error: uploadError } = await authSupabase.storage
                    .from('property-images')
                    .upload(filename, buffer, {
                        contentType: 'image/jpeg',
                        upsert: false
                    })

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = authSupabase.storage
                    .from('property-images')
                    .getPublicUrl(filename);

                uploadedUris.push(publicUrl)
                previewUris.push(asset.uri!)

                handleUpdateForm({
                    images: [...form.images, ...uploadedUris],
                    localImages: [...form.localImages, ...previewUris]
                });
            } catch (error) {
                console.error("Uploading error:", error)
                Alert.alert("Upload failed", "One or more images failed to upload.")
            } finally {
                setUploadingImages(false);
            }
        }

    }

    const removeImage = async (index: number) => {
        //delete from bucket too is not working
        const filename = form.images[index];
        if (filename) {
            await authSupabase.storage
                .from('property-images')
                .remove([filename]);
        }

        handleUpdateForm({
            images: form.images.filter((_, i) => i !== index),
            localImages: form.localImages.filter((_, i) => i !== index)
        })
    }

    return (
        <View className={sectionClass}>
            <Text className={labelClass}>
                Photos {" "}<Text className="text-gray-400 font-normal">(up to 6)</Text>
            </Text>

            <View className="flex-row flex-wrap gap-3">
                {form.images.map((uri, i) => (
                    <View key={i} className="relative">
                        <Image
                            source={{ uri }}
                            className="w-24 h-24 rounded-2xl"
                            resizeMode="cover"
                        />

                        {i === 0 && (
                            <View className='absolute top-2 left-2 bg-blue-600 rounded-full px-1.5 py-0.5'>
                                <Text className='text-white text-[10px] font-bold'>
                                    COVER
                                </Text>
                            </View>
                        )}

                        <TouchableOpacity
                            onPress={() => removeImage(i)}
                            disabled={uploadingImages}
                            className='absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full items-center justify-center'
                        >
                            <Ionicons name="close-circle" size={11} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}

                {form.images.length < 6 && (
                    <TouchableOpacity
                        onPress={handleImagePick}
                        disabled={uploadingImages}
                        className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center"
                    >
                        {uploadingImages
                            ? <ActivityIndicator color="#2563EB" />
                            : <>
                                <Ionicons name="camera-outline" size={22} color="#9CA3AF" />
                                <Text className="text-xs text-gray-500 mt-1">Add</Text>
                            </>
                        }
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default ImagesUpload