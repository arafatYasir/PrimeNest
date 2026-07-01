import Property from "../models/property.model.js";

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
        
        if (page < 1) page = 1;
        
        const limit = 15;
        const skip = (page - 1) * limit;
        const sortingQuery = sortingMap[sortBy];

        const [properties, totalProperties] = await Promise.all([
            Property.find({}).sort(sortingQuery).skip(skip).limit(limit),
            Property.countDocuments({})
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

export async function getFeaturedProperties(req, res, next) {
    try {
        const properties = await Property.find({ status: "Available" }).limit(8).sort({ createdAt: -1 });

        res.status(200).json({ properties });
    } catch (e) {
        next(e);
    }
}