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