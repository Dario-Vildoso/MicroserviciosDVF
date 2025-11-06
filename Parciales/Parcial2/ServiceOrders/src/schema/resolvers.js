const Envio = require("../entity/Envio");
module.exports = (AppDataSource) => ({
  Query: {
    getEnvios: async () => {
      return await AppDataSource.getRepository(Envio).find();
    },

    getEnvioById: async (_, { id }) => {
      return await AppDataSource.getRepository(Envio).findOne({
        where: { id }
      });
    },
  },
  Mutation: {
    createEnvio: async (_, { usuario_id, vehiculo_id, origen, destino }) => {
      const repo = AppDataSource.getRepository(Envio);
      const envio = repo.create({ 
        usuario_id,
        vehiculo_id,
        origen,
        destino,
        fecha_envio: new Date(),
        estado: "pendiente"
      });
      return await repo.save(envio);
    },
  }
});