import express from "express";
import sessionRouter from "../user/session-put-controller";

const router = express.Router();
router.use("/user", sessionRouter)
export default router;
