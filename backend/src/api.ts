import express, { Application, json, Router, urlencoded } from "express";
import * as http from "http";
import session from "express-session";
import cookieParser from "cookie-parser";
import morgan from "morgan";

/**https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment */
import compression from "compression";
import helmet from "helmet";
/**------------------------------------------------------------------------------------ */
import cors from "cors";
import passport from "passport";
import { MongoDbConnection } from "./infrastructure/database/mongo-connection";
import { Configuration } from "./config/configuration";
import { loginPassport } from "./auth/passport-config";

export interface ApplicationConfig {
    port: number,
    host: string,
    router: Router
}

export class Api {

    public app: Application;
    private httpServer?: http.Server;
    private mongoDbConnection: MongoDbConnection;

    constructor() {
        this.app = express();
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors({
            origin: ['http://localhost:4000', 'http://testracing.ddns.net:80'],
            credentials: true,
        }));
        this.app.use(urlencoded({ extended: true }));
        this.app.use(json());
        this.app.use(session({
            secret: 'testracingdev',
            resave: true,
            saveUninitialized: true
        }));
        this.app.use(cookieParser('testracingdev'));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(morgan('dev'));
        this.mongoDbConnection = new MongoDbConnection(new Configuration());
    }

    async init(config: ApplicationConfig): Promise<void> {
        await this.mongoDbConnection.connect();
        loginPassport(passport);
        this.app.use(config.router);
        return this.listen(config.port, config.host);
    }

    async listen(port: number, host: string): Promise<void> {
        return new Promise(resolve => {
            this.httpServer = this.app.listen(port, host, () => {
                resolve();
            });
        });
    }

    getHTTPServer() {
        return this.httpServer;
    }

    async stop(): Promise<void> {
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
    }

}
