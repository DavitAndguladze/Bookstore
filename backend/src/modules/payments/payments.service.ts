import { AppError } from "../../shared/middleware/error.middleware";
import * as OrderRepository from "../orders/orders.repository";
import Stripe from "stripe";
import * as PaymentsRepository from "./payments.repository";
import env from "../../config/env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (orderId: bigint, userId: bigint) => {
  const order = await OrderRepository.findOrderById(orderId);

  if (!order) throw new AppError(404, "Order not found");
  if (order.userId !== userId) throw new AppError(403, "Forbidden");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(Number(order.totalAmount) * 100),
    currency: "usd",
    metadata: { orderId: orderId.toString() },
  });

  await PaymentsRepository.updateOrderPayment(
    orderId,
    paymentIntent.id,
    "PENDING",
  );

  return { clientSecret: paymentIntent.client_secret };
};

export const handleWebhookEvent = async (
  payload: Buffer,
  signature: string,
) => {
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    throw new AppError(400, "Invalid webhook signature");
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const orderId = BigInt(intent.metadata.orderId);
    await PaymentsRepository.updateOrderPayment(orderId, intent.id, "PAID");
  }

  if (event.type === "payment_intent.payment_failed") {
    const intent = event.data.object as Stripe.PaymentIntent;
    const orderId = BigInt(intent.metadata.orderId);
    await PaymentsRepository.updateOrderPayment(orderId, intent.id, "FAILED");
  }
};
