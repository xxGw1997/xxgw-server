/*
  Warnings:

  - The primary key for the `PostCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `PostCategory` table. All the data in the column will be lost.
  - You are about to drop the `_PostCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryTitle` to the `PostCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PostCategory` DROP FOREIGN KEY `PostCategory_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `_PostCategories` DROP FOREIGN KEY `_PostCategories_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PostCategories` DROP FOREIGN KEY `_PostCategories_B_fkey`;

-- AlterTable
ALTER TABLE `PostCategory` DROP PRIMARY KEY,
    DROP COLUMN `categoryId`,
    ADD COLUMN `categoryTitle` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`postId`, `categoryTitle`);

-- DropTable
DROP TABLE `_PostCategories`;

-- AddForeignKey
ALTER TABLE `PostCategory` ADD CONSTRAINT `PostCategory_categoryTitle_fkey` FOREIGN KEY (`categoryTitle`) REFERENCES `Category`(`title`) ON DELETE RESTRICT ON UPDATE CASCADE;
