import { Context } from 'hono';
import pool from '../config/db';

export const getPostById = async (c: Context) => {
    const id = c.req.param('id');
    
    try {
        const [rows]: any = await pool.query('SELECT * FROM posts WHERE post_id = ?', [id]);
        
        if (!rows || rows.length === 0) {
            return c.json({ success: false, message: "Post not found in database" }, 404);
        }
        
        return c.json({ success: true, data: rows[0] });
    } catch (error: any) {
        return c.json({ success: false, error: error.message }, 500);
    }
};

export const getAllPosts = async (c: Context) => {
    try {
        const [rows] = await pool.query('SELECT * FROM posts');
        return c.json({ success: true, data: rows });
    } catch (error: any) {
        return c.json({ success: false, error: error.message }, 500);
    }
};