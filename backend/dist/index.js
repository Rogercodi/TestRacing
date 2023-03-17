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
exports.main = void 0;
const api_1 = require("./api");
const configuration_1 = require("./config/configuration");
require("dotenv/config");
//configuration
const configuration = new configuration_1.Configuration().getConfiguration();
// Constants
const port = configuration.server.port;
const host = configuration.server.host;
const node_env = configuration.server.node_env;
const application = new api_1.Api();
const router_1 = __importDefault(require("./router/router"));
const allEnvVariablesInitialized = (port, host, node_env) => {
    return port && host && node_env;
};
// App
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!allEnvVariablesInitialized(port, host, node_env)) {
        throw new Error("Missing env variables!");
    }
    else {
        yield application.init({ port, host, router: router_1.default });
        console.info(`\x1b[36m 🌿 Server runnig on \x1b[33m http://${host}:${port} \x1b[36m in ${node_env.toUpperCase()} mode 🌿 \n \x1b[0m`);
    }
});
exports.main = main;
(0, exports.main)().catch((err) => {
    //Error handling
    console.log("main err", err);
});
process.on("uncaughtException", err => {
    console.log("uncaughtException", err);
});
