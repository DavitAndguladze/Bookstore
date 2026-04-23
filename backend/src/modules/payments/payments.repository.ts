import { prisma } from "../../config/db";

export const updateOrderPayment = async (
  orderId: bigint,
  stripePaymentIntentId: string,
  status: string,
) => {
  return prisma.order.update({
    where: { id: orderId },
    data: { stripePaymentIntentId, status },
  });
};
