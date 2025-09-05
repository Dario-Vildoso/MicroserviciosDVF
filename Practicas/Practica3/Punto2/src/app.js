const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { DataSource } = require("typeorm");

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

const Libro = require("./entity/Libro");
const Prestamo = require("./entity/Prestamo");

const app = express();

const AppDataSource = new DataSource({
  type: "mysql",       
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "biblioteca",
  synchronize: true,
  logging: true,
  entities: [Libro, Prestamo],
});

async function startServer() {
  await AppDataSource.initialize();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ dataSource: AppDataSource }),
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Servidor listo en http://localhost:4000" + server.graphqlPath);
  });
}

startServer();
