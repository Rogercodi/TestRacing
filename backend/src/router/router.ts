import express from "express";
import sharedRouter from "../shared/shared-router";
import userRouter from "../user/userRouter";

const router = express.Router();

router.use("/", sharedRouter);
router.use("/", userRouter);
export default router;
