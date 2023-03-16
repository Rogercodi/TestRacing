"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Api = void 0;
const express_1 = __importStar(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
/**https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment */
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
/**------------------------------------------------------------------------------------ */
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const mongo_connection_1 = require("./infrastructure/database/mongo-connection");
const configuration_1 = require("./config/configuration");
const passport_config_1 = require("./router/auth/passport-config");
class Api {
    constructor() {
        this.app = (0, express_1.default)();
        this.app.use((0, compression_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)({
            origin: ['http://localhost:4000', 'http://testracing.ddns.net:80'],
            credentials: true,
        }));
        this.app.use((0, express_1.urlencoded)({ extended: true }));
        this.app.use((0, express_1.json)());
        this.app.use((0, express_session_1.default)({
            secret: 'testracingdev',
            resave: true,
            saveUninitialized: true
        }));
        this.app.use((0, cookie_parser_1.default)('testracingdev'));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
        this.app.use((0, morgan_1.default)('dev'));
        this.mongoDbConnection = new mongo_connection_1.MongoDbConnection(new configuration_1.Configuration());
    }
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mongoDbConnection.connect();
            (0, passport_config_1.loginPassport)(passport_1.default);
            this.app.use(config.router);
            return this.listen(config.port, config.host);
        });
    }
    listen(port, host) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.httpServer = this.app.listen(port, host, () => {
                    resolve();
                });
            });
        });
    }
    getHTTPServer() {
        return this.httpServer;
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.httpServer) {
                    this.httpServer.close(error => {
                        if (error) {
                            return reject(error);
                        }
                        process.exit();
                    });
                }
                return resolve();
            });
        });
    }
}
exports.Api = Api;
