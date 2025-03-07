require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Conectar ao banco de dados
const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log("Conectado ao banco de dados!");
    } catch (error) {
        console.error("Erro ao conectar no banco:", error);
    }
};

module.exports = { connectDB, sql };
