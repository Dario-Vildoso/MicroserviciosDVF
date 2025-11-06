const { gql } = require("apollo-server-express");
const typeDefs = gql`
type Envio {
    id: ID!
    usuario_id: Int!
    vehiculo_id: Int!
    origen: String!
    destino: String!
    fecha_envio: String!
    estado: String!
  }
type Query {
    getEnvios: [Envio!]!
    getEnvioById(id: ID!): Envio
}
type Mutation {
    createEnvio(
      usuario_id: Int!
      vehiculo_id: Int!
      origen: String!
      destino: String!
    ): Envio!
}
`;
module.exports = typeDefs;