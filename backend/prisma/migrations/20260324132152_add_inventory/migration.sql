-- CreateTable
CREATE TABLE "inventory" (
    "book_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "inventory_pkey" PRIMARY KEY ("book_id")
);

-- AddForeignKey
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;
