import { z } from "zod";

export const updateAgentProfileSchema = z.object({
    fullName: z.string().trim().min(3, "Full name must be at least 3 characters."),
    phone: z.string().trim().regex(
        /^[\d\s\-+()\.]{10,15}$/,
        "Phone number must be 10-15 characters (digits, spaces, dashes, parentheses, dots, plus sign only)"
    ),
    bio: z.string().trim().min(80, "Bio must be at least 80 characters long.")
});