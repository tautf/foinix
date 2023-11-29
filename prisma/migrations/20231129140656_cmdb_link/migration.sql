-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cmdb_link" TEXT;

INSERT INTO "ProductType" ("name",description,"createdAt","updatedAt",icon) VALUES
	 ('Other',NULL,'2023-11-29 15:17:00.000','2023-11-29 15:17:00.000','WrenchIcon'),
	 ('Computer','A desktop computer','2023-11-29 15:17:00.000','2023-11-29 15:17:00.000','DesktopComputerIcon'),
	 ('Software','Software','2023-11-29 15:17:00.000','2023-11-29 15:17:00.000','CommandLineIcon'),
	 ('Server','A server','2023-11-29 15:17:00.000','2023-11-29 15:17:00.000','ServerIcon'),
	 ('Subscription','A subscription','2023-11-29 15:17:00.000','2023-11-29 15:17:00.000','ArrowPathIcon'),
	 ('Mobile Device','Mobile device like Laptops','2023-11-29 15:17:00.000','2023-11-29 15:17:00.000','DevicePhoneMobileIcon'),
	 ('Network Device','Network devices like switches','2023-11-29 15:17:00.000','2023-11-29 15:17:00.000','CpuChipIcon');
