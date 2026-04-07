import { Router } from "express";
import { getAddressHandler, addAddressHandler, removeAddressHandler } from "./address.controller";
import { authenticate } from "../../shared/middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Get all addresses for the logged-in user
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of addresses
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, getAddressHandler);

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Add a new address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [street, city, state, postalCode, countryId, isDefault]
 *             properties:
 *               street:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               postalCode:
 *                 type: string
 *               countryId:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Address created
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticate, addAddressHandler);

/**
 * @swagger
 * /api/addresses/{id}:
 *   delete:
 *     summary: Delete an address
 *     tags: [Addresses]
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
 *         description: Address deleted
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: You do not own this address
 *       404:
 *         description: Address not found
 */
router.delete("/:id", authenticate, removeAddressHandler);

export default router;