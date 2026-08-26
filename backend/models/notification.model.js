import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        type: {
            type: String,
            enum: [
                "listing_approved",
                "listing_rejected",
                "new_message",
                "proposal_received",
                "your_proposal_accepted",
                "your_proposal_rejected",
            ],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;