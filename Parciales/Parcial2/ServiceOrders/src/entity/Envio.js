const { EntitySchema } = require("typeorm");
module.exports = new EntitySchema({
    name: "Envio",
    tableName: "envio",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true
        },
        usuario_id: {
            type: Number,
        },
        vehiculo_id: {
            type: Number,
        },
        origen: {
            type: String,
        },
        destino: {
            type: String,
        },
        fecha_envio: {
            type: "timestamp",
        },
        estado: {
            type: String,
        }
    }
});