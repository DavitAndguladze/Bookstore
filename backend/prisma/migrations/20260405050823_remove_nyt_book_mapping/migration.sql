/*
  Warnings:

  - You are about to drop the `nyt_book_mapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "nyt_book_mapping" DROP CONSTRAINT "nyt_book_mapping_book_id_fkey";

-- DropTable
DROP TABLE "nyt_book_mapping";
