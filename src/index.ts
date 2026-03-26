import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import postsRoute from './routes/postRoutes';
import pool from './config/db';

const app = new Hono();

app.route('/posts', postsRoute);

app.get('/', (c) => c.text('✅ API IS LIVE AND CONNECTED!'));

const port = 3000;

serve({
fetch: app.fetch,
port: port,
hostname: '0.0.0.0'
}, (info) => {
console.log("--- DEBUG: STARTING SERVER ---");
console.log("🚀 SERVER LIVE: http://localhost:3000");
console.log("🔗 TRY THIS LINK: http://127.0.0.1:3000/posts");
});

pool.getConnection()
.then(conn => {
console.log("✅ DATABASE: Connected to MySQL Workbench!");
conn.release();
})
.catch(err => {
console.error("❌ DATABASE ERROR:", err.message);
});

export default app;