/*
  Warnings:

  - The primary key for the `PostCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryTitle` on the `PostCategory` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `PostCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PostCategory` DROP FOREIGN KEY `PostCategory_categoryTitle_fkey`;

-- AlterTable
ALTER TABLE `PostCategory` DROP PRIMARY KEY,
    DROP COLUMN `categoryTitle`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`postId`, `categoryId`);

-- AddForeignKey
ALTER TABLE `PostCategory` ADD CONSTRAINT `PostCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
