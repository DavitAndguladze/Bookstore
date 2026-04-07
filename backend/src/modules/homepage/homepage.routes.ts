import { Router } from "express";
import {
  getFeaturedHandler,
  addFeatureHandler,
  removeFeatureHandler,
} from "./homepage.controller";
import {
  authenticate,
  authorize,
} from "../../shared/middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/homepage:
 *   get:
 *     summary: Get all featured books on the homepage
 *     tags: [Homepage]
 *     responses:
 *       200:
 *         description: List of featured books
 */
router.get("/", getFeaturedHandler);

/**
 * @swagger
 * /api/homepage:
 *   post:
 *     summary: Add a book to the homepage
 *     tags: [Homepage]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [bookId, section, position]
 *             properties:
 *               bookId:
 *                 type: string
 *               section:
 *                 type: string
 *               position:
 *                 type: number
 *     responses:
 *       201:
 *         description: Feature created
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.post("/", authenticate, authorize("admin"), addFeatureHandler);

/**
 * @swagger
 * /api/homepage/{id}:
 *   delete:
 *     summary: Remove a book from the homepage
 *     tags: [Homepage]
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
 *         description: Feature removed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Feature not found
 */
router.delete('/:id', authenticate, authorize("admin"), removeFeatureHandler);

export default router;

