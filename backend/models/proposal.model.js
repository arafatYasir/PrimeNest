import mongoose, { Schema } from "mongoose";

const proposalSchema = new Schema(
    {
        propertyId: {
            type: String,
            required: true
        },
        conversationId: {
            type: String,
            required: true
        },
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        offerAmount: {
            type: Number,
            required: true
        },
        status: {
            enum: ["pending", "accepted", "rejected", "cancelled"],
            default: "pending"
        }
    },
    { timestamps: true }
);

const Proposal = mongoose.model("Proposal", proposalSchema);

export default Proposal;