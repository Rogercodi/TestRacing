"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionDeleteController = void 0;
const sessionSchema_1 = require("../../models/sessionSchema");
const userSchema_1 = require("../../models/userSchema");
class SessionDeleteController {
    constructor() { }
    deleteSession(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionID = req.params.id;
                const user = yield userSchema_1.User.findOne({ _id: (req === null || req === void 0 ? void 0 : req.user)._id }).populate([
                    "sessions",
                    "vehiculos",
                ]);
                if (!user) {
                    return res.status(404).send({ err: "User not found" });
                }
                user.sessions = user.sessions.filter((item) => {
                    let b = item.toString();
                    return item._id.toString() !== sessionID;
                });
                yield user.save();
                yield sessionSchema_1.Session.findOneAndDelete({ _id: sessionID });
                return res.send({ message: "post recieved", user });
            }
            catch (e) {
                console.log(e);
                next();
            }
        });
    }
}
exports.SessionDeleteController = SessionDeleteController;
