import cloudinary from "../config/cloudinary.js";
import Property from "../models/property.model.js";
import User from "../models/user.model.js";

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

export async function getUserData(req, res, next) {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (e) {
        next(e);
    }
}

export async function saveProperty(req, res, next) {
    try {
        const userId = req.user._id;
        const { id } = req.params;

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

        const property = await Property.findById(id);

        if (!property) {
            const error = new Error("Property is not found!");
            error.statusCode = 404;
            throw error;
        }

        await User.findByIdAndUpdate(userId, {
            $addToSet: { savedProperties: id }
        });

        return res.status(200).json({
            success: true,
            message: "Property Saved!"
        })
    } catch (e) {
        next(e);
    }
}

export async function unsaveProperty(req, res, next) {
    try {
        const userId = req.user._id;
        const { id } = req.params;

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

        const property = await Property.findById(id);

        if (!property) {
            const error = new Error("Property is not found!");
            error.statusCode = 404;
            throw error;
        }

        await User.findByIdAndUpdate(userId, {
            $pull: { savedProperties: id }
        });

        return res.status(200).json({
            success: true,
            message: "Property Unsaved!"
        });
    } catch (e) {
        next(e);
    }
}

export async function getSavedProperties(req, res, next) {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const sortBy = req.query.sortBy || "None";
        const limit = 8;

        const skip = limit * (page - 1);
        const sortingQuery = sortingMap[sortBy] ?? sortingMap["None"];

        // Get the user's saved property IDs
        const user = await User.findById(userId).select("savedProperties");
        const savedIds = user?.savedProperties || [];

        if (savedIds.length === 0) {
            return res.status(200).json({
                success: true,
                properties: [],
                pagination: {
                    currentPage: page,
                    totalPages: 0,
                    totalProperties: 0,
                    limit,
                }
            });
        }

        const query = { _id: { $in: savedIds } };

        const [properties, totalProperties] = await Promise.all([
            Property.find(query).sort(sortingQuery).skip(skip).limit(limit),
            Property.countDocuments(query)
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

export async function uploadProfilePhoto(req, res, next) {
    try {
        const userId = req.user._id;

        if (!req.file) {
            const error = new Error("No file is provided");
            error.statusCode = 400;

            throw error;
        }

        // Upload file to cloudinary
        const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: `PrimeNest/${userId}/profile-photos` },
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }
            );
            stream.end(req.file.buffer);
        });

        const newProfilePhotoUrl = result.secure_url;

        // Update user document profilePic value
        await User.findByIdAndUpdate(userId, {
            profilePic: newProfilePhotoUrl
        });

        res.json({
            success: true,
            profilePhoto: newProfilePhotoUrl
        });
    } catch (e) {
        next(e);
    }
}