import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (req, res) => {
    res.send({ success: true });
});

export default healthRouter;