import { z } from "zod";

export const propertySchema = z.object({
    title: z.string().trim().min(10, "Title must be at least 10 characters"),
    description: z.string().trim().min(100, "Description must be at least 100 characters"),
    propertyType: z.enum(["House", "Apartment", "Condo", "Land"]),
    listingType: z.enum(["For Sale", "For Rent"]),
    price: z.coerce.number({ invalid_type_error: "Price must be a number" }).min(10, "Price must be at least 10"),
    area: z.coerce.number({ invalid_type_error: "Area must be a number" }).min(10, "Area must be at least 10"),
    yearBuilt: z.coerce.number({ invalid_type_error: "Year must be a number" }).min(1800, "Year must be at least 1800"),
    beds: z.coerce.number({ invalid_type_error: "Beds must be a number" }).min(1, "At least 1 bed is required").optional(),
    baths: z.coerce.number({ invalid_type_error: "Baths must be a number" }).min(1, "At least 1 bath is required").optional(),
    country: z.string().trim().min(4, "Country must be at least 4 characters"),
    city: z.string().trim().min(1, "City must be at least 1 character"),
    fullAddress: z.string().trim().min(10, "Address must be at least 10 characters"),
    lat: z.coerce.number({ invalid_type_error: "Latitude must be a number" }),
    lon: z.coerce.number({ invalid_type_error: "Longitude must be a number" }),
    features: z.array(z.string()).max(10, "You can add 10 features maximum"),
});