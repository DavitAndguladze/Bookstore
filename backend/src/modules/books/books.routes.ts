import { Router } from "express";
import { getAllBooksHandler, getBookByIdHandler, createBookHandler, updateBookHandler, deleteBookHandler } from "./books.controller";
import { authenticate, authorize } from "../../shared/middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all published books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all published books
 */
router.get("/", getAllBooksHandler);


/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
router.get("/:id", getBookByIdHandler);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, author, publisher, description, bookImageUrl, productType, price]
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               description:
 *                 type: string
 *               bookImageUrl:
 *                 type: string
 *               productType:
 *                 type: string
 *                 enum: [PHYSICAL, DIGITAL]
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Book created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/", authenticate, authorize('admin'), createBookHandler);

/**
 * @swagger
 * /api/books/{id}:
 *   patch:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               publisher:
 *                 type: string
 *               description:
 *                 type: string
 *               bookImageUrl:
 *                 type: string
 *               productType:
 *                 type: string
 *                 enum: [PHYSICAL, DIGITAL]
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.patch("/:id", authenticate, authorize('admin'), updateBookHandler);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204: 
 *         description: Book deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.delete("/:id", authenticate, authorize('admin'), deleteBookHandler);

export default router;