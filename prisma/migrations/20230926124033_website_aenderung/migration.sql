/*
  Warnings:

  - You are about to drop the `Website` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `websiteId` on the `Lieferanten` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Website";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lieferanten" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Firma" TEXT NOT NULL,
    "Kundennummer" TEXT NOT NULL,
    "WebsiteName" TEXT,
    "WebsiteUrl" TEXT
);
INSERT INTO "new_Lieferanten" ("Firma", "Kundennummer", "id") SELECT "Firma", "Kundennummer", "id" FROM "Lieferanten";
DROP TABLE "Lieferanten";
ALTER TABLE "new_Lieferanten" RENAME TO "Lieferanten";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
