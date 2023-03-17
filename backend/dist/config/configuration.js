"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
require("dotenv/config");
class Configuration {
    getConfiguration() {
        return {
            server: this.getServerConfig(),
            mongoDb: this.getMongoConfig(),
            // jwt: this.getJwtConfig()
        };
    }
    getServerConfig() {
        const port = parseInt(process.env.PORT);
        const host = process.env.HOST;
        const node_env = process.env.NODE_ENV;
        return { node_env, host, port };
    }
    getMongoConfig() {
        const connectionString = process.env.MONGODB_URI;
        return { connectionString };
    }
}
exports.Configuration = Configuration;
