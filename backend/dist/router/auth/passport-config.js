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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPassport = void 0;
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema_1 = require("../../models/userSchema");
const loginPassport = function (passport) {
    passport.use(new passport_local_1.Strategy({ usernameField: "email" }, (email, password, done) => __awaiter(this, void 0, void 0, function* () {
        const user = (yield userSchema_1.User
            .findOne({ email: email })
            .populate(['sessions', 'vehiculos'])
            .populate({
            path: 'vehiculos',
            populate: {
                path: 'configuraciones'
            }
        })) || undefined;
        bcryptjs_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "", (err, result) => {
            if (err)
                throw err;
            if (result === true) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    })));
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    passport.deserializeUser((id, cb) => {
        userSchema_1.User.findOne({ _id: id }, (err, user) => {
            cb(err, user);
        });
    });
};
exports.loginPassport = loginPassport;
