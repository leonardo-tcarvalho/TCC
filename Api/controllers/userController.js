const { createUser, findUserByEmail, findUserData } = require('../models/userModel');
const { hashPassword, comparePassword } = require('../utils/hash')
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res) {
    try {
        const { firstName, lastName, email, userType, phone, birthDate, password } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        const hashedPassword = await hashPassword(password, 10);

        await createUser({ firstName, lastName, email, userType, phone, birthDate, password: hashedPassword });

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error: error.message });
    }
}


async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'E-mail ou senha inválidos' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'E-mail ou senha inválidos' });
        }

        const token = jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userId: user.userId });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login', error });
    }
}

async function getMe(req, res) {
    try {
        const { userId } = req.body;
        const user = await findUserData(userId);
        res.json({ userId: user.userId });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuário', error });
    }
}

module.exports = { register, login, getMe };
