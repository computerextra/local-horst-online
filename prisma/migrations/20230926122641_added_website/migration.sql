-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "URL" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lieferanten" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Firma" TEXT NOT NULL,
    "Kundennummer" TEXT NOT NULL,
    "websiteId" TEXT,
    CONSTRAINT "Lieferanten_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lieferanten" ("Firma", "Kundennummer", "id") SELECT "Firma", "Kundennummer", "id" FROM "Lieferanten";
DROP TABLE "Lieferanten";
ALTER TABLE "new_Lieferanten" RENAME TO "Lieferanten";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
