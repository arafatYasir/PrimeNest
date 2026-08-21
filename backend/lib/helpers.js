export const activityMessageMap = {
    "profile_photo_updated": "Your profile photo has been updated.",
    "profile_info_updated": "Your profile information has been updated.",
    "listing_created": (listingName) => `Your new listing '${listingName}' has been created successfully.`,
    "listing_updated": (listingName) => `Your listing '${listingName}' has been updated.`,
    "listing_deleted": (listingName) => `Your listing '${listingName}' has been deleted.`,
    "you_sent_proposal": (listingName) => `You've sent a proposal for '${listingName}'`,
    "you_accepted_proposal": (listingName) => `You've accepted the proposal for '${listingName}'`,
    "you_rejected_proposal": (listingName) => `You've rejected the proposal for '${listingName}'`
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