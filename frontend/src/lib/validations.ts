import * as z from "zod";

// User Agent Profile Schema
export const profileSchema = z.object({
    fullName: z.string().trim().min(3, "Full name must be at least 3 characters."),
    email: z.string().trim().email("Invalid email address"),
    phone: z.string().trim().regex(
        /^[\d\s\-+()\.]{10,15}$/,
        "Phone number must be 10-15 characters (digits, spaces, dashes, parentheses, dots, plus sign only)"
    ),
    bio: z.string().trim().min(80, "Bio must be at least 80 characters long."),
    profilePic: z.string().optional()
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// Property Schema
export const propertySchema = z.object({
    propertyTitle: z.string().trim().min(10, "Title must be at least 10 characters"),
    propertyDescription: z.string().trim().min(100, "Description must be at least 100 characters"),
    propertyType: z.enum(["House", "Apartment", "Condo", "Land"]),
    listingType: z.enum(["For Sale", "For Rent"]),
    price: z.number().int("Price must be a number").min(10, "Price must be at least 10"),
    area: z.number().int("Area must be a number").min(10, "Area must be at least than 10"),
    yearBuilt: z.number().int("Year must be a number").min(1800, "Year must be at least 1800"),
    bedrooms: z.number().int("Beds must be a number").min(1, "At least 1 bed is required").optional(),
    bathrooms: z.number().int("Baths must be a number").min(1, "At least 1 bath is required").optional(),
    country: z.string().trim().min(4, "Country must be at least 4 characters"),
    city: z.string().trim().min(1, "City must be at least 1 character"),
    fullAddress: z.string().trim().min(10, "Address must be at least 10 characters"),
    lat: z.number("Lat must be a number"),
    lon: z.number("Lon must be a number"),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;