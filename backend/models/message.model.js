import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        conversationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Conversation",
            required: true
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        textContent: {
            type: String
        },
        mediaContent: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

export const Message = mongoose.model("Message", messageSchema);