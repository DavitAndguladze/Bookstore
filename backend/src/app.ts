import express from 'express';
import authRoutes from './modules/auth/auth.routes';
import { errorHandler } from './shared/middleware/error.middleware';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);


app.use(errorHandler);
export default app;