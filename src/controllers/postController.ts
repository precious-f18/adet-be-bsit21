import { Context } from 'hono';
import pool from '../config/db';

export const getAllPosts = async (c: Context) => {
    try {
        const [rows] = await pool.query('SELECT * FROM posts');
        return c.json({ success: true, data: rows });
    } catch (error: any) {
        return c.json({ success: false, message: error.message }, 500);
    }
};

export const getPostById = async (c: Context) => {
    const id = c.req.param('id');
    try {
        const [rows]: any = await pool.query('SELECT * FROM posts WHERE post_id = ?', [id]);
        if (rows.length === 0) return c.json({ success: false, message: "Post not found" }, 404);
        return c.json({ success: true, data: rows[0] });
    } catch (error: any) {
        return c.json({ success: false, message: error.message }, 500);
    }
};

export const createPost = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { title, description } = body;
        const [result]: any = await pool.query('INSERT INTO posts (title, description) VALUES (?, ?)', [title, description]);
        return c.json({ success: true, id: result.insertId }, 201);
    } catch (error: any) {
        return c.json({ success: false, message: error.message }, 500);
    }
};

export const updatePostById = async (c: Context) => {
    const id = c.req.param('id');
    try {
        const body = await c.req.json();
        const { title, description } = body;
        await pool.query('UPDATE posts SET title = ?, description = ? WHERE post_id = ?', [title, description, id]);
        return c.json({ success: true, message: "Post updated" });
    } catch (error: any) {
        return c.json({ success: false, message: error.message }, 500);
    }
};

export const deletePostById = async (c: Context) => {
    const id = c.req.param('id');
    try {
        await pool.query('DELETE FROM posts WHERE post_id = ?', [id]);
        return c.json({ success: true, message: "Post deleted successfully" });
    } catch (error: any) {
        return c.json({ success: false, message: error.message }, 500);
    }
};