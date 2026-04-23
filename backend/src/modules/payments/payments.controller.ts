import { Request, Response, NextFunction } from "express";
import * as PaymentService from "./payments.service";

export const createPaymentIntentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await PaymentService.createPaymentIntent(
      BigInt(req.params.orderId as string),
      req.user!.userId,
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const webhookHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const signature = req.headers["stripe-signature"] as string;
    await PaymentService.handleWebhookEvent(req.body, signature);
    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
};
