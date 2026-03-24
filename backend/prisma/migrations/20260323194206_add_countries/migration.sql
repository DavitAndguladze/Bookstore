-- CreateTable
CREATE TABLE "countries" (
    "country_id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" CHAR(2) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("country_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_code_key" ON "countries"("code");
