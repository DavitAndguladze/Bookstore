-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('physical', 'digital');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('draft', 'published', 'hidden');

-- CreateTable
CREATE TABLE "books" (
    "book_id" BIGSERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "book_image_url" TEXT NOT NULL,
    "product_type" "ProductType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "visibility" "Visibility" NOT NULL DEFAULT 'draft',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "book_genres" (
    "book_id" BIGINT NOT NULL,
    "genre_id" BIGINT NOT NULL,

    CONSTRAINT "book_genres_pkey" PRIMARY KEY ("book_id","genre_id")
);

-- AddForeignKey
ALTER TABLE "book_genres" ADD CONSTRAINT "book_genres_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_genres" ADD CONSTRAINT "book_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("genre_id") ON DELETE RESTRICT ON UPDATE CASCADE;
