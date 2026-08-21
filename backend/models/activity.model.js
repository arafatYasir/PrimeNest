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
                "profile_photo_updated",
                "profile_info_updated",
                "listing_created",
                "listing_updated",
                "listing_deleted",
                "you_sent_proposal",
                "you_accepted_proposal",
                "you_rejected_proposal"
            ],
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        relatedId: {
            type: Schema.Types.ObjectId,
        },
        metaId: {
            type: Schema.Types.ObjectId,
        },
        link: {
            type: String,
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