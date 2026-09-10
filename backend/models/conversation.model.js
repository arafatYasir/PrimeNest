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
        participantHash: {
            type: String,
            required: true,
        },
        propertyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Property",
            required: true
        },
        lastMessage: {
            text: {
                type: String,
            },
            senderId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            createdAt: {
                type: Date
            }
        },
        unreadCount: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

conversationSchema.index({ propertyId: 1, participantHash: 1 }, { unique: true });

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;