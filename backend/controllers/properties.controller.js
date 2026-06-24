import Property from "../models/property.model.js"

export async function getFeaturedProperties(req, res, next) {
    try {
        const properties = await Property.find({ }).limit(8).sort({ createdAt: -1 });

        res.status(200).json({ properties });
    } catch (e) {
        next(e);
    }
}