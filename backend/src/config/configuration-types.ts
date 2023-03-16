export interface ApplicationConfiguration {
    server: ServerConfiguration,
    mongoDb: MongoDbConfiguration,
    // jwt: JwtConfiguration
}

export interface ServerConfiguration {
    node_env: string;
    host: string;
    port: number;
}

export interface MongoDbConfiguration {
    connectionString: string;
}
