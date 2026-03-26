import type { Context } from 'hono';
import db from '../config/db';
import { Post } from '../models/post.model';
import type { ResultSetHeader } from 'mysql2';

export const getAllPosts = async (c: Context) => {
try {
const [rows] = await db.query<Post[]>('SELECT * FROM posts');
return c.json(rows);
} catch (error: any) {
return c.json({ error: error.message }, 500);
}
};

export const createPost = async (c: Context) => {
try {
const { title, description } = await c.req.json();
const [result] = await db.query(
'INSERT INTO posts (title, description) VALUES (?, ?)',
[title, description]
);
return c.json({
message: 'Post created successfully',
post_id: result.insertId
}, 201);
} catch (error: any) {
return c.json({ error: error.message }, 500);
}
};