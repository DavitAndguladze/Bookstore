import express from 'express';
import authRoutes from './modules/auth/auth.routes';
import { errorHandler } from './shared/middleware/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import bookRoutes from './modules/books/books.routes';
import cartRoutes from './modules/cart/cart.routes';
import orderRoutes from './modules/orders/orders.routes';
import nytRoutes from "./modules/nyt/nyt.routes";
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books',bookRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/nyt', nytRoutes);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(errorHandler);
export default app;