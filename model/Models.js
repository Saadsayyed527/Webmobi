const db =require('../database/db');

class User{
    static async create(username,email,password) {  //take username , email, password from user
        const [result]=await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
        return  result;
    }

    static async findByEmail(email) {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
    static async findById(id) {
        const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0]
    }
}

module.exports = User;
