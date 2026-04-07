import { Router } from "express";
import { createReviewHandler,getReviewsHandler  } from "./reviews.controller";
import { authenticate } from "../../shared/middleware/auth.middleware";

const router = Router({mergeParams: true});

/**
 * @swagger
 * /api/books/{id}/reviews:
 *   post:
 *     summary: Create a review for a book
 *     tags: [Reviews]
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
 *             required: [rating, comment]
 *             properties:
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review created
 *       400:
 *         description: Invalid rating
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, createReviewHandler);

/**
 * @swagger
 * /api/books/{id}/reviews:
 *   get:
 *     summary: Get all reviews for a book
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of reviews
 */
router.get("/", getReviewsHandler);

export default router;