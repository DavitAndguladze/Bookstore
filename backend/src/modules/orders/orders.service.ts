import { CartStatus, Prisma } from "../../generated/prisma";
import { AppError } from "../../shared/middleware/error.middleware";
import * as OrdersRepository from "./orders.repository";
import * as CartRepository from "../cart/cart.repository";

export const placeOrder = async (userId: bigint) => {
  const activeCart = await CartRepository.findActiveCart(userId);
  if (!activeCart) throw new AppError(400, "Cart is empty");
  if (activeCart.cartItems.length === 0)
    throw new AppError(400, "Cart is empty");

  const totalAmount = activeCart.cartItems.reduce((sum, item) => {
    return sum.plus(item.priceAtAdded.times(item.quantity));
  }, new Prisma.Decimal(0));

  const order = await OrdersRepository.createOrder(userId, totalAmount);

  for (const item of activeCart.cartItems) {
    await OrdersRepository.createOrderItem(
      order.id,
      item.bookId,
      item.book.title,
      item.priceAtAdded,
      item.quantity,
    );
  }

  await OrdersRepository.updateCartStatus(activeCart.id, CartStatus.COMPLETED);
  return order;
};

export const getMyOrders = async (userId: bigint) => {
  const orders = await OrdersRepository.findOrderByUser(userId);

  return orders.map((order) => ({
    ...order,
    id: order.id.toString(),
    userId: order.userId.toString(),
    orderItems: order.orderItems.map((item) => ({
      ...item,
      id: item.id.toString(),
      orderId: item.orderId.toString(),
      bookId: item.bookId.toString(),
    })),
  }));
};

export const getMyOrderById = async (userId: bigint, orderId: bigint) => {
  const order = await OrdersRepository.findOrderById(orderId);
  if (!order) throw new AppError(404, "Order not found");
  if (order.userId.toString() !== userId.toString())
    throw new AppError(403, "Forbidden");

 return {
  ...order,
  id: order.id.toString(),
  userId: order.userId.toString(),
  orderItems: order.orderItems.map(item => ({
    ...item,
    id: item.id.toString(),
    orderId: item.orderId.toString(),
    bookId: item.bookId.toString()
  }))
 }
};
