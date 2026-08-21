import rateLimit from "express-rate-limit";

export function createRateLimiter({ windowMs, max, message = "Too many requests. Please try again later." } = {}) {
    return rateLimit({
        windowMs,
        max,
        message: {
            success: false,
            message
        },
        standardHeaders: true,
        legacyHeaders: false,
    });
}