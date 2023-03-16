import mongoose from "mongoose";
import { Configuration } from "../../config/configuration";

export class MongoDbConnection{

    constructor( private configuration: Configuration  ) {}

    public async connect(): Promise<void> {
        const configuration = this.configuration.getConfiguration().mongoDb.connectionString;
        mongoose.set('strictQuery', false);
        await mongoose.connect(configuration);
        console.info(`\x1b[36m 🍃 MongoDB connected and running 🍃 \x1b[0m`);
        
    }

    public async shutDown(): Promise<void> {
        if (mongoose.connection.readyState === mongoose.STATES.connected) {
            return await mongoose.connection.close().then(() => {
                console.info("\x1b[36m  MongoDB is down \x1b[0m");
            });
        }
    }
}