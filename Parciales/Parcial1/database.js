const { createConnection } = require("typeorm");
const { Medico } = require("./entity/Medico");

const connectDB = async () => {
  try {
    await createConnection({
      type: "mysql",
      host: process.env.DB_HOST || 'localhost', 
      port: 3306, // Puerto de MySQL (por defecto)
      username: process.env.DB_USER || 'root', 
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'medicos_db', //Base de datos
      entities: [Medico], 
      synchronize: true, // Solo para desarrollo (crea automáticamente las tablas)
    });
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
