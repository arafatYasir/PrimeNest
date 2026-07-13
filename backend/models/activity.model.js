import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
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
                "listing_created",
                "listing_approved",
                "listing_rejected",
                "new_message",
                "proposal_received",
                "proposal_accepted",
                "proposal_rejected",
            ],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        relatedId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        metaId: {
            type: Schema.Types.ObjectId,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;