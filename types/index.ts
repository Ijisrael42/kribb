import { PropertyType } from "@/constants";
import { KeyboardTypeOptions } from "react-native";

export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    type: string;
    bedrooms: number;
    bathrooms: number;
    area_sqft: number;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
    images: string[]
    is_featured: boolean;
    is_sold: boolean;
    created_at: string;
}

export interface TabIconProps {
    focused: boolean;
    name: any;
    color: string;
}

export interface SavedProperty {
    id: string;
    property_id: string;
    properties: Property;
}

export interface FormState {
    title: string;
    description: string;
    price: string;
    type: PropertyType;
    bedrooms: number;
    bathrooms: number;
    areaSqft: string;
    address: string;
    city: string;
    latitude: string;
    longitude: string;
    isFeatured: boolean;
    images: string[];
    localImages: string[];
}

export interface FormInputsProps {
    form: FormState
    handleUpdateForm: (fields: Partial<FormState>) => void;
}

export interface InputConfig {
    key: keyof FormState;
    label: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    multiline?: boolean;
    extraInputClass?: string;
    helperText?: string;
}