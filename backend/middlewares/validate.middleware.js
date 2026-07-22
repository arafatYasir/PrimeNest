import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (e) {
        if (e instanceof ZodError) {
            return res.status(400).json({
                success: false,
                errors: e.errors.map(err => ({
                    field: err.path.join("."),
                    message: err.message
                }))
            });
        }

        next(e);
    }
}