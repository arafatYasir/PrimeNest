import Property from "../models/property.model.js";
import Activity from "../models/activity.model.js";
import cloudinary from "../config/cloudinary.js";
import mongoose from "mongoose";
import { activityMessageMap, extractPublicId } from "../lib/helpers.js";

const sortingMap = {
    "None": { createdAt: -1 },
    "Price (Low to High)": { price: 1 },
    "Price (High to Low)": { price: -1 },
    "Newest": { yearBuilt: -1 },
    "Oldest": { yearBuilt: 1 },
    "Bedrooms": { beds: -1 },
    "Bathrooms": { baths: -1 },
    "Square Feet": { area: -1 }
};

export async function getAllProperties(req, res, next) {
    try {
        // Getting queries
        let page = parseInt(req.query.page) || 1;
        const sortBy = req.query.sortBy || "None";
        const location = req.query.location || "";
        const propertyType = req.query.propertyType || "Any";
        const propertyStatus = req.query.propertyStatus || "Any";
        const listingType = req.query.listingType || "Any";
        const minPrice = req.query.minPrice || "";
        const maxPrice = req.query.maxPrice || "";
        const beds = req.query.beds || "Any";
        const baths = req.query.baths || "Any";
        const limit = parseInt(req.query.limit) || 15;
        const excludeId = req.query.excludeId || "";

        if (page < 1) page = 1;

        const skip = (page - 1) * limit;
        const sortingQuery = sortingMap[sortBy] ?? sortingMap["None"];

        // ---- Build the filter object ----
        const query = {
            status: { $ne: "Rejected" }
        };

        if (excludeId) {
            query._id = { $ne: excludeId };
        }

        if (location.trim() !== "") {
            const searchTerm = location.trim();
            query.$or = [
                { "location.city": { $regex: searchTerm, $options: "i" } },
                { "location.country": { $regex: searchTerm, $options: "i" } },
                { "location.fullAddress": { $regex: searchTerm, $options: "i" } }
            ];
        }

        if (propertyType !== "Any") {
            query.propertyType = propertyType;
        }

        if (propertyStatus !== "Any" && propertyStatus !== "Rejected") {
            query.status = propertyStatus;
        }

        if (listingType !== "Any") {
            query.listingType = listingType;
        }

        if (minPrice !== "" || maxPrice !== "") {
            query.price = {};

            if (minPrice !== "" && !isNaN(minPrice)) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice !== "" && !isNaN(maxPrice)) {
                query.price.$lte = Number(maxPrice);
            }

            if (Object.keys(query.price).length === 0) delete query.price;
        }

        if (beds !== "Any" && !isNaN(beds)) {
            query.beds = { $gte: Number(beds) };
        }

        if (baths !== "Any" && !isNaN(baths)) {
            query.baths = { $gte: Number(baths) };
        }

        // Fetching actual documents with query, sorting and pagination
        const [properties, totalProperties] = await Promise.all([
            Property.find(query).sort(sortingQuery).skip(skip).limit(limit),
            Property.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalProperties / limit);

        return res.status(200).json({
            success: true,
            data: properties,
            pagination: {
                currentPage: page,
                totalPages,
                totalProperties,
                limit,
            }
        });
    } catch (e) {
        next(e);
    }
}

export async function getProperty(req, res, next) {
    try {
        const { id } = req.params;

        if (!id) {
            const error = new Error("Property id is missing!");
            error.statusCode = 400;
            throw error;
        }
        else if (id.trim() === "") {
            const error = new Error("Property id is empty!");
            error.statusCode = 400;
            throw error;
        }

        const property = await Property.findOne({ _id: id }).populate("seller", "-clerkId");

        if (!property) {
            const error = new Error("Property is not found!");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: property
        });
    } catch (e) {
        next(e);
    }
}

export async function getFeaturedProperties(req, res, next) {
    try {
        const properties = await Property.find({ status: "Available" }).limit(8).sort({ createdAt: -1 });

        res.status(200).json({ properties });
    } catch (e) {
        next(e);
    }
}

export async function getPropertiesStatuses(req, res, next) {
    try {
        const userId = req.user._id;

        const [total, available, pending, sold] = await Promise.all([
            Property.countDocuments({ seller: userId }),
            Property.countDocuments({ seller: userId, status: "Available" }),
            Property.countDocuments({ seller: userId, status: "Pending" }),
            Property.countDocuments({ seller: userId, status: "Sold" })
        ])

        return res.status(200).json({
            success: true,
            data: {
                total,
                available,
                pending,
                sold
            }
        });
    } catch (e) {
        next(e);
    }
}

export async function getMyProperties(req, res, next) {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const sortBy = req.query.sortBy || "None";
        const limit = 5;

        const skip = limit * (page - 1);
        const sortingQuery = sortingMap[sortBy] ?? sortingMap["None"];

        const [properties, totalProperties] = await Promise.all([
            Property.find({ seller: userId }).sort(sortingQuery).skip(skip).limit(limit),
            Property.countDocuments({ seller: userId })
        ]);

        const totalPages = Math.ceil(totalProperties / limit);

        return res.status(200).json({
            success: true,
            properties,
            pagination: {
                currentPage: page,
                totalPages,
                totalProperties,
                limit,
            }
        });
    } catch (e) {
        next(e);
    }
}

export async function deleteProperty(req, res, next) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;
        const userId = req.user._id;

        if (!id) {
            const error = new Error("Property id is missing!");
            error.statusCode = 400;
            throw error;
        }
        if (id.trim() === "") {
            const error = new Error("Property id is empty!");
            error.statusCode = 400;
            throw error;
        }

        const property = await Property.findById(id).session(session);

        if (!property) {
            const error = new Error("Property not found!");
            error.statusCode = 404;
            throw error;
        }

        // Verify ownership
        if (property.seller.toString() !== userId.toString()) {
            const error = new Error("You are not authorized to delete this property!");
            error.statusCode = 403;
            throw error;
        }

        // Delete property images from Cloudinary
        if (property.images && property.images.length > 0) {
            const publicIds = property.images
                .map(extractPublicId)
                .filter(Boolean);

            if (publicIds.length > 0) {
                await cloudinary.api.delete_resources(publicIds).catch(() => { });
            }

            // Also delete the Cloudinary folder for this property
            await cloudinary.api
                .delete_folder(`PrimeNest/${userId}/property-photos/${id}`)
                .catch(() => { });
        }

        await Property.findByIdAndDelete(id, { session });

        // Create activity for listing_deleted
        await Activity.create([
            {
                userId,
                type: "listing_deleted",
                message: activityMessageMap["listing_deleted"](property.title)
            }
        ], { session });

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            message: "Property Deleted!"
        });
    } catch (e) {
        await session.abortTransaction();
        next(e);
    } finally {
        session.endSession();
    }
}

export async function createProperty(req, res, next) {
    let createdProperty = null;

    const session = await mongoose.startSession();
    session.startTransaction();

    let uploadedPublicIds = [];

    try {
        const userId = req.user._id;
        const userRole = req.user.role;

        const {
            title,
            description,
            propertyType,
            listingType,
            price,
            area,
            yearBuilt,
            beds,
            baths,
            country,
            city,
            fullAddress,
            lat,
            lon,
            features
        } = req.body;

        // Create the Property document in MongoDB without the images field
        const [newProperty] = await Property.create([
            {
                title,
                description,
                propertyType,
                listingType,
                price,
                area,
                yearBuilt,
                beds: beds ?? null,
                baths: baths ?? null,
                location: {
                    country,
                    city,
                    fullAddress,
                    lat,
                    lon,
                },
                features,
                status: userRole === "admin" ? "Available" : "Pending",
                seller: userId
            }
        ], { session });

        createdProperty = newProperty;

        // Upload the images received from the multer middleware to Cloudinary
        const files = req.files || (Array.isArray(req.body.images) ? req.body.images : []);
        let imageUrls = [];

        if (files && files.length > 0) {
            const uploadPromises = files.map((file) => {
                return new Promise((resolve, reject) => {
                    if (!file.buffer) {
                        return reject(new Error("File buffer missing for upload"));
                    }
                    const stream = cloudinary.uploader.upload_stream(
                        { folder: `PrimeNest/${userId}/property-photos/${createdProperty._id}` },
                        (err, result) => {
                            if (err) return reject(err);
                            resolve({ url: result.secure_url, publicId: result.public_id });
                        }
                    );
                    stream.end(file.buffer);
                });
            });

            const uploadedFiles = await Promise.all(uploadPromises);
            imageUrls = uploadedFiles.map(f => f.url);
            uploadedPublicIds = uploadedFiles.map(f => f.publicId);
        }

        // Update the previously created Property document to include these URLs in the images field
        createdProperty.images = imageUrls;
        await createdProperty.save({ session });

        // Create activity for listing_created
        await Activity.create([
            {
                userId,
                type: "listing_created",
                message: activityMessageMap["listing_created"](createdProperty.title),
                relatedId: createdProperty._id,
                link: `/dashboard/my-properties`
            }
        ], { session });

        await session.commitTransaction();

        return res.status(201).json({
            success: true,
            message: "Property Created!",
        });
    } catch (e) {
        if (uploadedPublicIds.length > 0) {
            await cloudinary.api.delete_resources(uploadedPublicIds).catch(() => {});
        }
        await session.abortTransaction();
        next(e);
    } finally {
        session.endSession();
    }
}

export async function approveProperty(req, res, next) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        if (!id) {
            const error = new Error("Property id is required!");
            error.statusCode = 400;

            throw error;
        }
        if (!id.trim()) {
            const error = new Error("Property id is empty!");
            error.statusCode = 400;

            throw error;
        }

        const property = await Property.findById(id).session(session);

        if (!property) {
            const error = new Error("Property not found!");
            error.statusCode = 404;

            throw error;
        }

        if (property.status === "Available") {
            await session.commitTransaction();
            return res.status(200).json({
                success: true,
                message: "Property is already approved!"
            });
        }

        property.status = "Available";
        await property.save({ session });

        // Create activity for listing_approved
        await Activity.create([
            {
                userId: property.seller,
                type: "listing_approved",
                message: activityMessageMap["listing_approved"](property.title),
                relatedId: property._id,
                link: `/properties/${property._id}`
            }
        ], { session });

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            message: "Property Approved!"
        });
    }
    catch (e) {
        await session.abortTransaction();
        next(e);
    } finally {
        session.endSession();
    }
}

export async function getAllPendingProperties(req, res, next) {
    try {
        const page = parseInt(req.query.page) || 1;
        const sortBy = req.query.sortBy || "None";
        const limit = 10;

        const skip = limit * (page - 1);
        const sortingQuery = sortingMap[sortBy] ?? sortingMap["None"];

        const [properties, totalProperties] = await Promise.all([
            Property.find({ status: "Pending" }).populate("seller", "fullName email phone").sort(sortingQuery).skip(skip).limit(limit),
            Property.countDocuments({ status: "Pending" })
        ]);

        const totalPages = Math.ceil(totalProperties / limit);

        return res.status(200).json({
            success: true,
            data: properties,
            pagination: {
                currentPage: page,
                totalPages,
                totalProperties,
                limit,
            }
        });
    } catch (e) {
        next(e);
    }
}

export async function rejectProperty(req, res, next) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { id } = req.params;

        if (!id) {
            const error = new Error("Property id is required!");
            error.statusCode = 400;

            throw error;
        }
        if (!id.trim()) {
            const error = new Error("Property id is empty!");
            error.statusCode = 400;

            throw error;
        }

        const property = await Property.findById(id).session(session);

        if (!property) {
            const error = new Error("Property not found!");
            error.statusCode = 404;

            throw error;
        }

        if (property.status === "Rejected") {
            await session.commitTransaction();
            return res.status(200).json({
                success: true,
                message: "Property is already rejected!"
            });
        }

        property.status = "Rejected";
        await property.save({ session });

        // Create activity for listing_rejected
        await Activity.create([
            {
                userId: property.seller,
                type: "listing_rejected",
                message: activityMessageMap["listing_rejected"](property.title),
                relatedId: property._id,
                link: `/dashboard/my-properties`
            }
        ], { session });

        await session.commitTransaction();

        return res.status(200).json({
            success: true,
            message: "Property Rejected!"
        });
    }
    catch (e) {
        await session.abortTransaction();
        next(e);
    } finally {
        session.endSession();
    }
}