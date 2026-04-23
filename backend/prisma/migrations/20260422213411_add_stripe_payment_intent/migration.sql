/*
  Warnings:

  - A unique constraint covering the columns `[stripe_payment_intent_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "stripe_payment_intent_id" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "orders_stripe_payment_intent_id_key" ON "orders"("stripe_payment_intent_id");
