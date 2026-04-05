import { Router } from "express";
import { getAllListsHandler, getBooksOnListHandler } from "./nyt.controller";

const router = Router();

/**
 * @swagger
 * /api/nyt/lists:
 *   get:
 *     summary: Get all NYT bestseller lists
 *     tags: [NYT]
 *     responses:
 *       200:
 *         description: List of all NYT bestseller lists
 */
router.get("/", getAllListsHandler);

/**
 * @swagger
 * /api/nyt/lists/{listNameEncoded}:
 *   get:
 *     summary: Get books on a specific NYT bestseller list
 *     tags: [NYT]
 *     parameters:
 *       - in: path
 *         name: listNameEncoded
 *         required: true
 *         schema:
 *           type: string
 *         example: hardcover-fiction
 *     responses:
 *       200:
 *         description: Books on the specified list with their rank
 *       404:
 *         description: List not found
 */
router.get("/:listNameEncoded", getBooksOnListHandler);

export default router;