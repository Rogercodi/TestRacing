import {  MongoDbConfiguration, ApplicationConfiguration, ServerConfiguration } from "./configuration-types";
import "dotenv/config";

export interface ConfigurationGetter {
    getConfiguration(): ApplicationConfiguration;
}

export class Configuration implements ConfigurationGetter {

    public getConfiguration(): ApplicationConfiguration {
        return {
            server: this.getServerConfig(),
            mongoDb: this.getMongoConfig(),
            // jwt: this.getJwtConfig()
        };
    }

    private getServerConfig(): ServerConfiguration {

        const port: number = parseInt(<string>process.env.PORT);
        const host: string = <string>process.env.HOST;
        const node_env: string = <string>process.env.NODE_ENV;

        return { node_env, host, port };
    }

    private getMongoConfig(): MongoDbConfiguration {

        const connectionString = <string>process.env.MONGODB_URI;

        return { connectionString };
    }
}