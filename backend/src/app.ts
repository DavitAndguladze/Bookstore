import express from 'express';
import authRoutes from './modules/auth/auth.routes';
import { errorHandler } from './shared/middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import bookRoutes from './modules/books/books.routes';
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books',bookRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(errorHandler);
export default app;