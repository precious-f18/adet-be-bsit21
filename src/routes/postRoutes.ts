import { Hono } from 'hono';
import { 
    getAllPosts, 
    getPostById, 
    createPost, 
    updatePostById, 
    deletePostById,
    patchPostById 
} from '../controllers/postController';

const router = new Hono();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePostById);
router.patch('/:id', patchPostById);
router.delete('/:id', deletePostById);

export default router;