import { Router } from "express";
import { getAllListsHandler, getBooksOnListHandler } from "./nyt.controller";
import * as NytService from "./nyt.service";

const router = Router();

/**
 * @swagger
 * /api/nyt:
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
 * /api/nyt/{listNameEncoded}:
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

/**
 * @swagger
 * /api/nyt/sync/{listNameEncoded}:
 *   post:
 *     summary: Manually trigger a sync for a specific NYT list (for testing)
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
 *         description: Sync complete
 */
router.post("/sync/:listNameEncoded", async (req, res, next) => {
    try {
        const { listNameEncoded } = req.params
        await NytService.syncNytList(listNameEncoded)
        res.status(200).json({ message: "Sync complete" })
    } catch (error) {
        next(error)
    }
})

export default router;