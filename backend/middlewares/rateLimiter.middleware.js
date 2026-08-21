import rateLimit from "express-rate-limit";

export function createRateLimiter({ windowMs, max, message = "Too many requests. Please try again later." } = {}) {
    return rateLimit({
        windowMs,
        max,
        keyGenerator: (req) => {
            return req.user._id;
        },
        message: {
            success: false,
            message
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
}
