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
exports.SessionPutController = void 0;
const getuser_1 = require("../repositories/getuser");
const put_user_service_1 = require("../service/put-user-service");
class SessionPutController {
    constructor() { }
    EditSession(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { body } = req;
                const repo = new getuser_1.UserRepository();
                const service = new put_user_service_1.UpdateSessionService(repo);
                const user = yield service.run(id, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id, body);
                if (user) {
                    return res.status(201).send({ message: "Successfully updated", user });
                }
                else {
                    return res.status(404).send({ error: "User not found" });
                }
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
    }
}
exports.SessionPutController = SessionPutController;
