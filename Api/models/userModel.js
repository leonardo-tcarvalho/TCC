const sql = require('mssql');

async function createUser({ firstName, lastName, email, userType, phone, birthDate, password }) {
    try {
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
            .input('phone', sql.NVarChar, phone)
            .input('birthDate', sql.Date, birthDate)
            .input('password', sql.NVarChar, password)
            .query(query);
    } catch (error) {
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
        throw error;
    }
}

async function findUserData(userId) {
    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('userId', sql.Int, userId)
            .query(`
                SELECT * 
                FROM UserProfile 
                WHERE userId = @userId
            `);
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
}

module.exports = { createUser, findUserByEmail, findUserData };
