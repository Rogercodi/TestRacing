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
exports.UpdateSessionService = void 0;
const sessionSchema_1 = require("../../models/sessionSchema");
class UpdateSessionService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    run(sessionId, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield sessionSchema_1.Session.findByIdAndUpdate(sessionId, body);
            if (!session) {
                return Promise.reject("Session not found");
            }
            yield (session === null || session === void 0 ? void 0 : session.save());
            return this.userRepository.getUserById(userId);
        });
    }
}
exports.UpdateSessionService = UpdateSessionService;
