import type { LucideIcon } from "lucide-react";

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
        lat: number;
        lon: number;
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

export interface ContactInfo {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    informations: {
        type: string;
        value: string;
    }[];
}

export interface AboutUsProblem {
    icon: LucideIcon,
    title: string;
    description: string;
}

export interface AboutUsCorePillar {
    icon: LucideIcon,
    title: string;
    description: string;
}

export interface User {
    _id: string;
    clerkId: string;
    fullName: string;
    email: string;
    phone: string;
    profilePic: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
}