const resolvers = {
  Query: {
    getLibros: async (_, __, { dataSource }) => {
      const repo = dataSource.getRepository("Libro");
      return await repo.find({ relations: ["prestamos"] });
    },
    getPrestamos: async (_, __, { dataSource }) => {
      const repo = dataSource.getRepository("Prestamo");
      return await repo.find();
    },
    getPrestamoById: async (_, { id }, { dataSource }) => {
      const repo = dataSource.getRepository("Prestamo");
      return await repo.findOne({ where: { id } });
    },
    getPrestamosByUsuario: async (_, { usuario }, { dataSource }) => {
      const repo = dataSource.getRepository("Prestamo");
      return await repo.find({
        where: { usuario },
        relations: ["libro"],
      });
    },
  },

  Mutation: {
    createLibro: async (_, args, { dataSource }) => {
      const repo = dataSource.getRepository("Libro");
      const libro = repo.create(args);
      return await repo.save(libro);
    },
    createPrestamo: async (_, { usuario, fecha_prestamo, fecha_devolucion, libroId }, { dataSource }) => {
      const prestamoRepo = dataSource.getRepository("Prestamo");
      const libroRepo = dataSource.getRepository("Libro");

      const libro = await libroRepo.findOne({ where: { id: libroId } });
      if (!libro) throw new Error("Libro no encontrado");

      const prestamo = prestamoRepo.create({
        usuario,
        fecha_prestamo,
        fecha_devolucion,
        libro,
      });

      return await prestamoRepo.save(prestamo);
    },
  },
};

module.exports = resolvers;
