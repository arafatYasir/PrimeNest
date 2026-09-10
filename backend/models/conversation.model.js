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
        },
        lastMessage: {
            text: {
                type: String,
                required: true
            },
            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            createdAt: {
                type: Date,
                required: true
            }
        },
        unreadCount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Conversation = mongoose.model("Conversation", conversationSchema);