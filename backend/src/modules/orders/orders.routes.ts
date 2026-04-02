import { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import { placeOrderHandler, getMyOrdersHandler, getMyOrderByIdHandler } from "./orders.controller";

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post: 
 *     summary: Create an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       400:
 *         description: Cart is empty
 *       401:
 *         description: Unauthorized
 */
router.post('/', authenticate, placeOrderHandler);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       401: 
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.get('/', authenticate, getMyOrdersHandler);


/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by id
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *       401: 
 *         description: Unauthorized
 *       404:
 *         description: Order not found
 */
router.get('/:id', authenticate, getMyOrderByIdHandler);

export default router;
