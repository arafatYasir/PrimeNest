import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
    {
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);