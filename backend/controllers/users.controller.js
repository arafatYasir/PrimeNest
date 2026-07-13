export async function getUserData(req, res, next) {
    try {
        return res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (e) {
        next(e);
    }
}