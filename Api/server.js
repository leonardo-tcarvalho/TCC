const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: '*', // Permite todas as origens
};

app.use(express.json());
app.use(cors(corsOptions));

connectDB();

app.use('/api/users', userRoutes);
app.get('/healt', (req, res) => {
    res.send('API rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
