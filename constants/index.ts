import { FormState, InputConfig } from "@/types";

export const getMapUrl = (longitude: number, latitude: number, zoom: number) => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - zoom}
    %2C${latitude - zoom}%2C${longitude + zoom}%2C${latitude + zoom}
    &layer=mapnik&marker=${latitude}%2C${longitude}`;
}

export const TYPES = ["apartment", "house", "villa", "studio"] as const;
export type PropertyType = (typeof TYPES)[number];
export const MIN_PRICE = 1;
export const MAX_PRICE = 999_999_999

// Reusable class strings
// avoids repeating long className strings
export const inputClass = "bg-white border border-gray-200 rounded-2xl px-4 py-3 text-gray-800";
export const labelClass = "text-sm font-semibold text-gray-700 mb-1.5";
export const sectionClass = "mb-5";

export const INITIAL_FORM_STATE: FormState = {
    title: "",
    description: "",
    price: "",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    areaSqft: "",
    address: "",
    city: "",
    latitude: "",
    longitude: "",
    isFeatured: false,
    images: [],
    localImages: [],
}

export const firstFormInputs: InputConfig[] = [
    {
        key: 'title',
        label: 'Title',
        placeholder: 'e.g. 4 Bedroom Duplex in Lekki Phase 1',
    },
    {
        key: 'description',
        label: 'Description',
        placeholder: 'Desccribe the property',
        multiline: true,
        extraInputClass: 'h-24',
    },
    {
        key: 'price',
        label: 'Price (USD)',
        placeholder: 'e.g. 350000',
        keyboardType: 'numeric',
        helperText: 'Value range is between $50k and $5m',
    },
];

export const secondFormInputs: InputConfig[] = [
    {
        key: 'areaSqft',
        label: 'Area (sq ft)',
        placeholder: 'e.g. 3500',
        keyboardType: 'numeric',
    },
    {
        key: 'address',
        label: 'Address',
        placeholder: 'e.g. 123 Main St',
    },
    {
        key: 'city',
        label: 'City',
        placeholder: 'e.g. Lagos',
    },
];
