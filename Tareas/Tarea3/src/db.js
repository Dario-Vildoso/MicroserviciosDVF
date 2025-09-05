import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false
  }
);

// modelos
import Product from "./models/Product.js";
import Client from "./models/Client.js";
import Invoice from "./models/Invoice.js";
import InvoiceDetail from "./models/InvoiceDetail.js";

// inicializar modelos
export const ProductModel = Product(sequelize);
export const ClientModel  = Client(sequelize);
export const InvoiceModel = Invoice(sequelize);
export const InvoiceDetailModel = InvoiceDetail(sequelize);

// asociaciones
ClientModel.hasMany(InvoiceModel, { foreignKey: "cliente_id", as: "facturas" });
InvoiceModel.belongsTo(ClientModel, { foreignKey: "cliente_id", as: "cliente" });

InvoiceModel.hasMany(InvoiceDetailModel, { foreignKey: "factura_id", as: "detalles", onDelete: "CASCADE" });
InvoiceDetailModel.belongsTo(InvoiceModel, { foreignKey: "factura_id", as: "factura" });

ProductModel.hasMany(InvoiceDetailModel, { foreignKey: "producto_id", as: "detalles" });
InvoiceDetailModel.belongsTo(ProductModel, { foreignKey: "producto_id", as: "producto" });

export async function connectAndSync() {
  await sequelize.authenticate();
  await sequelize.sync(); // en dev: { alter: true } si quieres auto-migrar
}
