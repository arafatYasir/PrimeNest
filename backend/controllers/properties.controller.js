import Property from "../models/property.model.js"

export async function getAllProperties(req, res, next) {
    try {
        let page = parseInt(req.query.page) || 1;
        const limit = 15;

        if (page < 1) page = 1;

        const skip = (page - 1) * limit;

        const [properties, totalProperties] = await Promise.all([
            Property.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit),
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