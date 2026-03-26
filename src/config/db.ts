import mysql from 'mysql2/promise';
import 'dotenv/config';

const dbConfig = {
host: '127.0.0.1',
port: 3306,
user: 'root',
password: process.env.DB_PASSWORD || '',
database: 'bsit-21',
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0,
connectTimeout: 5000
};

const pool = mysql.createPool(dbConfig);

export default pool;