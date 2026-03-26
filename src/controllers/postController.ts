import type { Context } from "hono";
import db from "../config/db";
import type { Post } from "../models/post.models";
import type { ResultSetHeader } from "mysql2";

export async function getAllPosts(c: Context) {
  try {
    const [rows] = await db.query<Post[]>(`SELECT * FROM posts`);
    return c.json(rows, 200);
  } catch (error) {
    console.log(error);
    return c.json({ message: 'Internal server error' }, 500);
  }
}

export async function getPostById(c: Context) {
  try {
    const id = c.req.param('id');
    const [rows] = await db.query<Post[]>("SELECT * FROM posts WHERE post_id = ?", [id]);

    if (!rows || rows.length === 0) {
      return c.json({ success: false, message: "Post not found" }, 404); 
    }
    return c.json(rows[0], 200);
  } catch (error: any) {
    return c.json({ message: "Server error", error: error.message }, 500);
  }
}

export async function createPost(c: Context) {
  try {
    const body = await c.req.json();
    
    if (!body.title) {
      return c.json({ message: "Title is required" }, 400);
    }
    
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO posts (title, description, status) VALUES (?, ?, ?)`, 
      [body.title, body.description || '', body.status || 'Active']
    );

    if (result.insertId) {
      return c.json({ message: "Post created", id: result.insertId }, 201);
    }
    return c.json({ message: "Failed to create post" }, 400);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Internal server error" }, 500);
  }
}

export async function deletePostById(c: Context) {
  try {
    const id = c.req.param('id');
    const [result] = await db.query<ResultSetHeader>(`DELETE FROM posts WHERE post_id = ?`, [id]);

    if (result.affectedRows > 0) {
      return c.json({ message: "Post successfully deleted" }, 200);
    }
    return c.json({ message: "Post not found" }, 404);
  } catch (error) {
    return c.json({ message: "Internal server error" }, 500);
  }
}