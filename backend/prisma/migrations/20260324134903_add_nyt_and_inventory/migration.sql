-- CreateTable
CREATE TABLE "nyt_lists" (
    "id" BIGSERIAL NOT NULL,
    "list_name" VARCHAR(255) NOT NULL,
    "list_name_encoded" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nyt_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book_nyt_lists" (
    "book_id" BIGINT NOT NULL,
    "nyt_list_id" BIGINT NOT NULL,
    "rank" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "book_nyt_lists_pkey" PRIMARY KEY ("book_id","nyt_list_id")
);

-- CreateTable
CREATE TABLE "nyt_book_mapping" (
    "book_id" BIGINT NOT NULL,
    "isbn13" VARCHAR(13) NOT NULL,
    "isbn10" VARCHAR(10) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nyt_book_mapping_pkey" PRIMARY KEY ("book_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nyt_lists_list_name_encoded_key" ON "nyt_lists"("list_name_encoded");

-- AddForeignKey
ALTER TABLE "book_nyt_lists" ADD CONSTRAINT "book_nyt_lists_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_nyt_lists" ADD CONSTRAINT "book_nyt_lists_nyt_list_id_fkey" FOREIGN KEY ("nyt_list_id") REFERENCES "nyt_lists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nyt_book_mapping" ADD CONSTRAINT "nyt_book_mapping_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;
