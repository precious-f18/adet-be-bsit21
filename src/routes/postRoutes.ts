import { Hono } from "hono";
import { 
    createPost, 
    deletePostById, 
    getAllPosts, 
    getPostById, 
    updatePostStatus 
} from "../controllers/postController";

const postsRoute = new Hono();

postsRoute.get('/', getAllPosts);
postsRoute.get('/:id', getPostById);
postsRoute.post('/', createPost);
postsRoute.delete('/:id', deletePostById);
postsRoute.patch('/:id', updatePostStatus);

export default postsRoute;