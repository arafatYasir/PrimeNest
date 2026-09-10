import Conversation from "../models/conversation.model.js"

export async function findOrCreateConversation(req, res, next) {
    try {
        const buyerId = req.user._id;
        const { sellerId, propertyId } = req.body;

        // Basic data validations
        if (!sellerId || !sellerId.trim()) {
            const error = new Error("Seller's user id is missing");
            error.statusCode = 400;

            throw error;
        }

        if (!propertyId || !propertyId.trim()) {
            const error = new Error("Reference property id is missing");
            error.statusCode = 400;

            throw error;
        }

        const buyerIdStr = buyerId.toString();
        const sellerIdStr = sellerId.toString();

        if (buyerIdStr === sellerIdStr) {
            const error = new Error("Buyer and seller cannot be the same");
            error.statusCode = 400;
            throw error;
        }

        const sortedParticipants = [buyerIdStr, sellerIdStr].sort();
        const participantHash = sortedParticipants.join('_');

        // Atomic Find or Create
        const conversation = await Conversation.findOneAndUpdate(
            { propertyId, participantHash },
            {
                $setOnInsert: {
                    participants: [buyerId, sellerId],
                    propertyId,
                    participantHash
                }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res.status(200).json({
            success: true,
            data: conversation._id
        });
    } catch (e) {
        next(e);
    }
}