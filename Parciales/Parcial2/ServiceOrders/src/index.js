require("reflect-metadata");
const { DataSource } = require("typeorm");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema/typeDefs");
const resolversFactory = require("./schema/resolvers");
const Envio = require("./entity/Envio");

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "envios_bd",
    synchronize: true,
    logging: false,
    entities: [Envio]
});

async function startServer() {
    const app = express();
    await AppDataSource.initialize();
    console.log("Conectado a la base de datos");

    const resolvers = resolversFactory(AppDataSource);

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });
    await server.start();
    server.applyMiddleware({ app });

    app.listen(4000, () => {
        console.log(`Servidor listo en http://localhost:4000${server.graphqlPath}`);
    });
}
startServer();