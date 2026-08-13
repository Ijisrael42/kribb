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