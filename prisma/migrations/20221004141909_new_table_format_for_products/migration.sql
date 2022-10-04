/*
  Warnings:

  - You are about to drop the column `productName` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imgUrl` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "products_productName_key";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "productName",
ADD COLUMN     "imgUrl" VARCHAR(255) NOT NULL,
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_title_key" ON "products"("title");
