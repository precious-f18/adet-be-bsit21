import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import postsRoute from './routes/postRoutes';

const app = new Hono();

app.route('/posts', postsRoute); 

app.get('/', (c) => c.text('API is working!'));

serve({ fetch: app.fetch, port: 3001 });