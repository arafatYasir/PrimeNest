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
        const query = {};

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

        if (propertyStatus !== "Any") {
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
    try {
        const { id } = req.params;
        const userId = req.user._id;

        if (!id) {
            const error = new Error("Property id is missing!");
            error.statusCode = 400;
            throw error;
        }
        if (!id.trim() === "") {
            const error = new Error("Property id is empty!");
            error.statusCode = 400;
            throw error;
        }

        const property = await Property.findById(id);

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

        await Property.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Property Deleted Successfully!"
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
            message: "Property Saved Successfully!"
        })
    } catch (e) {
        next(e);
    }
}