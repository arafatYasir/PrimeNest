import Property from "../models/property.model.js";
import User from "../models/user.model.js";

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
            message: "Property Saved Successfully!"
        })
    } catch (e) {
        next(e);
    }
}