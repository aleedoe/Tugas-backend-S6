-- CreateTable
CREATE TABLE `ProductBrands` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand_name` VARCHAR(50) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCatalogs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(50) NULL,
    `type` VARCHAR(50) NULL,
    `brand_id` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductCatalogs` ADD CONSTRAINT `ProductCatalogs_brand_id_fkey` FOREIGN KEY (`brand_id`) REFERENCES `ProductBrands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
