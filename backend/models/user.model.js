import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true
        },
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            default: ""
        },
        profilePic: {
            type: String,
            default: ""
        },
        bio: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;