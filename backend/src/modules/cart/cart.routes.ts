import { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import { getCartHandler, addItemHandler, updateItemHandler, removeItemHandler } from "./cart.controller";


const router = Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get current user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getCartHandler);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add a book to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bookId, quantity]
 *             properties:
 *               bookId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item added to cart
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Book not found
 */
router.post("/items", authenticate, addItemHandler);

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   patch:
 *     summary: Update cart item quantity
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [quantity]
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cart item updated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Cart item not found
 */
router.patch("/items/:itemId", authenticate, updateItemHandler);


/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item removed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Cart item not found
 */
router.delete("/items/:itemId", authenticate, removeItemHandler);




export default router;