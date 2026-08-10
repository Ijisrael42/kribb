import { PropertyType } from "@/store/filterStore";

export const TYPES: { label: string; value: PropertyType }[] = [
    { label: "All", value: null },
    { label: "Apartment", value: "apartment" },
    { label: "House", value: "house" },
    { label: "Villa", value: "villa" },
    { label: "Studio", value: "studio" },
];

export const BEDS = [
    { label: "Any", value: null },
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4+", value: 4 },
];

export const PRICE_PRESETS = [
    { label: "Under $500k", min: null, max: 500000 },
    { label: "$500k – $1M", min: 500000, max: 1000000 },
    { label: "$1M – $2M", min: 1000000, max: 2000000 },
    { label: "Above $2M", min: 2000000, max: null },
];

export const chip = (active: boolean) =>
    `px-4 py-2 rounded-full border ${active ? "bg-blue-600 border-blue-600" : "bg-white border-gray-200"
    }`;

export const chipText = (active: boolean) =>
    `text-sm font-semibold ${active ? "text-white" : "text-gray-600"}`;

export const shadow = {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
};