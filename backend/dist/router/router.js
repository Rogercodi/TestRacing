"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shared_router_1 = __importDefault(require("../shared/shared-router"));
const userRouter_1 = __importDefault(require("../user/userRouter"));
const router = express_1.default.Router();
router.use("/", shared_router_1.default);
router.use("/", userRouter_1.default);
exports.default = router;
