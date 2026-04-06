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

/**
 * @swagger
 * /api/nyt/sync-all:
 *   post:
 *     summary: Manually trigger a sync for all NYT lists (for testing)
 *     tags: [NYT]
 *     responses:
 *       200:
 *         description: All lists synced
 */
router.post("/sync-all", async (_req, res, next) => {
    try {
        const lists = [
            "hardcover-fiction",
            "combined-print-and-e-book-fiction",
            "audio-fiction",
            "hardcover-nonfiction",
            "combined-print-and-e-book-nonfiction",
            "audio-nonfiction",
            "young-adult-hardcover"
        ]
        for (const list of lists) {
            try {
                await NytService.syncNytList(list)
                console.log(`Synced: ${list}`)
            } catch (error) {
                console.error(`Failed: ${list}`, error)
            }
            await new Promise(resolve => setTimeout(resolve, 7000))
        }
        res.status(200).json({ message: "All lists synced" })
    } catch (error) {
        next(error)
    }
})


export default router;