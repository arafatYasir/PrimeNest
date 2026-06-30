export interface Property {
    _id: string;
    title: string;
    description: string;
    propertyType: "House" | "Apartment" | "Condo" | "Land";
    listingType: "For Sale" | "For Rent";
    status: "Available" | "Sold" | "Pending";
    images: string[];
    price: number;
    area: number;
    beds?: number;
    baths?: number;
    location: {
        lat: string;
        lon: string;
        country: string;
        city: string;
        fullAddress: string;
    };
    yearBuilt: number;
    features?: string[];
    seller: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface FooterColumn {
    title: string;
    links: { label: string; href: string }[];
}
