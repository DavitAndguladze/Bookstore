/*
  Warnings:

  - A unique constraint covering the columns `[isbn13]` on the table `books` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isbn10` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isbn13` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "isbn10" VARCHAR(10) NOT NULL,
ADD COLUMN     "isbn13" VARCHAR(13) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn13_key" ON "books"("isbn13");
