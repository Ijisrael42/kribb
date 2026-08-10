import { useAuth } from "@clerk/expo";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useSupabase } from "./useSupabase";

export const useSavedProperty = (
    { propertyId, onUnsave }: {
        propertyId: string,
        onUnsave?: () => void
    }) => {

    const { userId } = useAuth();
    const [isSaved, setIsSaved] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    const authSupabase = useSupabase();

    const checkIfSaved = async () => {
        if (!userId) return;

        const { data, error } = await authSupabase
            .from('saved_properties')
            .select('id')
            .eq('user_clerk_id', userId)
            .eq('property_id', propertyId)
            .single();

        if (data) setIsSaved(true);
    }

    useEffect(() => {
        checkIfSaved();
    }, [propertyId, userId]);

    const toggleSave = async () => {
        if (!userId || saveLoading) return;

        setSaveLoading(true);
        try {
            if (isSaved) {
                const { error } = await authSupabase
                    .from('saved_properties')
                    .delete()
                    .eq('user_clerk_id', userId)
                    .eq('property_id', propertyId);

                if (error) {
                    console.error('Error unsaving property:', error.message);
                    return;
                }

                setIsSaved(false);
                if (onUnsave) onUnsave();
            } else {
                const { error } = await authSupabase
                    .from('saved_properties')
                    .insert({
                        user_clerk_id: userId,
                        property_id: propertyId
                    });

                if (error) {
                    console.error('Error saving property:', error.message);
                    return;
                }

                setIsSaved(true);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to toggle save');
        } finally {
            setSaveLoading(false);
        }
    }

    return {
        isSaved,
        toggleSave,
        saveLoading
    }
}

