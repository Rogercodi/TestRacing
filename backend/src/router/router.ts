import express from "express";
import sharedRouter from "../user-login/shared-router";
import userRouter from "../user/userRouter";

const router = express.Router();

router.get('/', (req, res) =>  res.send({ message: 'testing' }));
router.use("/", sharedRouter);
router.use("/", userRouter);
export default router;
