import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        propertyType: {
            type: String,
            enum: ["House", "Apartment", "Condo", "Land"],
            default: "House"
        },
        listingType: {
            type: String,
            enum: ["For Sale", "For Rent"],
            default: "For Sale"
        },
        status: {
            type: String,
            enum: ["Available", "Sold", "Pending"],
            default: "Available"
        },
        images: [String],
        price: {
            type: Number,
            required: true
        },
        area: {
            type: Number,
            required: true
        },
        beds: Number,
        baths: Number,
        location: {
            lat: {
                type: String,
                required: true,
            },
            lon: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            fullAddress: {
                type: String,
                required: true,
            }
        },
        yearBuilt: {
            type: Number,
            required: true
        },
        features: {
            type: [String]
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;