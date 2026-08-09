export const activityMessageMap = {
    "profile_photo_updated": "Your profile photo has been updated.",
    "profile_info_updated": "Your profile information has been updated.",
    "listing_created": (listingName) => `Your new listing '${listingName || "item"}' has been created successfully.`,
    "listing_updated": (listingName) => `Your listing '${listingName || "item"}' has been updated.`,
    "listing_deleted": (listingName) => `Listing '${listingName || "item"}' has been deleted.`,
    "listing_approved": (listingName) => `Great news! Your listing '${listingName || "item"}' is now live.`,
    "listing_rejected": (listingName) => `Your listing '${listingName || "item"}' was not approved.`,
    "new_message": (senderName) => `You have a new message from ${senderName || "someone"}.`,
    "proposal_received": (listingName) => `You've received a new proposal for your listing '${listingName || "item"}'.`,
    "proposal_accepted": (listingName) => `Your proposal for '${listingName || "item"}' has been accepted!`,
    "proposal_rejected": (listingName) => `Your proposal for '${listingName || "item"}' was not accepted.`,
};

export const formatActivityMessage = (type, data = {}) => {
    const formatter = activityMessageMap[type];
    return formatter ? formatter(data) : "New activity on your account.";
};

export function extractPublicId(url) {
    try {
        const parts = url.split("/upload/");
        if (parts.length < 2) return null;
        // Remove the version prefix and the file extension
        const pathAfterUpload = parts[1].replace(/^v\d+\//, "");
        return pathAfterUpload.replace(/\.[^/.]+$/, "");
    } catch {
        return null;
    }
}