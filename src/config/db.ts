import mysql from 'mysql2/promise';

const dbConfig = {
    host: '127.0.0.1',
    port: 3000, 
    user: 'root',
    password: '',
    database: 'bsitdb21',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

export default pool;