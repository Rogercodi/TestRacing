import { Api } from "./api";
import { Configuration } from "./config/configuration";
import "dotenv/config";

//configuration
const configuration = new Configuration().getConfiguration();

// Constants
const port: number = configuration.server.port;
const host: string = configuration.server.host;
const node_env: string = configuration.server.node_env;
const application = new Api();
import router from "./router/router";

const allEnvVariablesInitialized = (port: number, host: string, node_env: string) => {
    return port && host && node_env;
};

// App
export const main = async () => {
    if (!allEnvVariablesInitialized(port, host, node_env)) {
        throw new Error("Missing env variables!");
    } else {
        await application.init({ port, host, router });
        console.info(`\x1b[36m 🌿 Server runnig on \x1b[33m http://${host}:${port} \x1b[36m in ${node_env.toUpperCase()} mode 🌿 \n \x1b[0m`);
    }
};

main().catch((err) => {
    //Error handling
    console.log("main err", err);
});

process.on("uncaughtException", err => {
    process.exit(1);
});