import { Hono } from 'hono';
import { getAllPosts, createPost } from '../controllers/postController.js';

const postRoutes = new Hono();

postRoutes.get('/', getAllPosts);

postRoutes.post('/', createPost);

export default postRoutes;