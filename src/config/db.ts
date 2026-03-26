import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    port: 3000,
    user: 'root',
    password: 'bolina123',
    database: 'bsit-21',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

export default pool;