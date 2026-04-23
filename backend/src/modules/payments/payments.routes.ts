import express, { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import {
  createPaymentIntentHandler,
  webhookHandler,
} from "./payments.controller";

const router = Router();

/**
 * @swagger
 * /api/payments/webhook:
 *   post:
 *     summary: Stripe webhook handler
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Webhook received
 *       400:
 *         description: Invalid webhook signature
 */
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler,
);

/**
 * @swagger
 * /api/payments/{orderId}:
 *   post:
 *     summary: Create a Stripe Payment Intent for an order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Payment Intent created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Order not found
 */
router.post("/:orderId", authenticate, createPaymentIntentHandler);

export default router;
