-- AlterTable
ALTER TABLE `store` MODIFY `regionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
