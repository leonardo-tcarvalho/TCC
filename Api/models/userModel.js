const sql = require('mssql');

async function createUser({ firstName, lastName, email, userType, phone, birthDate, password }) {
    try {
        const newPhone = phone.replace(/\D/g, '');
        const newBirthDate = new Date(birthDate).toISOString().split('T')[0];

        const query = `
            INSERT INTO UserProfile (
                firstName, 
                lastName, 
                email, 
                userType,
                phone, 
                birthDate, 
                password, 
                createAt
            )
            VALUES (
                @firstName, 
                @lastName, 
                @email,
                @userType, 
                @phone, 
                @birthDate, 
                @password, 
                GETDATE()
            );
        `;
        const pool = await sql.connect();
        await pool.request()
            .input('firstName', sql.NVarChar, firstName)
            .input('lastName', sql.NVarChar, lastName)
            .input('email', sql.NVarChar, email)
            .input('userType', sql.NVarChar, userType)
            .input('phone', sql.NVarChar, newPhone)
            .input('birthDate', sql.Date, newBirthDate)
            .input('password', sql.NVarChar, password)
            .query(query);
    } catch (error) {
        console.error('Error creating user:', error); // Adicionar log
        throw error;
    }
}

async function findUserByEmail(email) {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query(`
                SELECT * 
                FROM UserProfile 
                WHERE email = @email
            `);
        return result.recordset[0];
    } catch (error) {
        console.error('Error finding user by email:', error); // Adicionar log
        throw error;
    }
}

module.exports = { createUser, findUserByEmail };
