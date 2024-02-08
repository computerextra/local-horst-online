-- CreateTable
CREATE TABLE "Ansprechpartner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Telefon" TEXT,
    "Mobil" TEXT,
    "Mail" TEXT,
    "lieferantenId" TEXT,
    CONSTRAINT "Ansprechpartner_lieferantenId_fkey" FOREIGN KEY ("lieferantenId") REFERENCES "Lieferanten" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fach" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Farbe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Input" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Kabel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Artikelnummer" TEXT NOT NULL,
    "inputId" TEXT NOT NULL,
    "outputId" TEXT NOT NULL,
    "laengeId" TEXT NOT NULL,
    "farbeId" TEXT NOT NULL,
    "fachId" TEXT NOT NULL,
    "reiheId" TEXT NOT NULL,
    "regalId" TEXT NOT NULL,
    CONSTRAINT "Kabel_regalId_fkey" FOREIGN KEY ("regalId") REFERENCES "Regal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kabel_reiheId_fkey" FOREIGN KEY ("reiheId") REFERENCES "Reihe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kabel_fachId_fkey" FOREIGN KEY ("fachId") REFERENCES "Fach" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kabel_farbeId_fkey" FOREIGN KEY ("farbeId") REFERENCES "Farbe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kabel_laengeId_fkey" FOREIGN KEY ("laengeId") REFERENCES "Laenge" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kabel_outputId_fkey" FOREIGN KEY ("outputId") REFERENCES "Output" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Kabel_inputId_fkey" FOREIGN KEY ("inputId") REFERENCES "Input" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Laenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lieferanten" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Firma" TEXT NOT NULL,
    "Kundennummer" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Mitarbeiter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "Mail" TEXT,
    "Durchwahl" TEXT,
    "Telefon1" TEXT,
    "Telefon2" TEXT,
    "Mobil" TEXT,
    "Einkauf" TEXT,
    "Geld" TEXT,
    "Pfand" TEXT,
    "Bild1" TEXT,
    "Bild2" TEXT,
    "Bild3" TEXT,
    "Bild1Type" TEXT,
    "Bild2Type" TEXT,
    "Bild3Type" TEXT,
    "Kurz" TEXT,
    "Azubi" BOOLEAN NOT NULL,
    "HomeOffice" TEXT,
    "Datum" DATETIME,
    "Abonniert" BOOLEAN,
    "Geburtstag" TEXT
);

-- CreateTable
CREATE TABLE "Output" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Regal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reihe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Warenlieferung" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Artikelnummer" TEXT,
    "Artikelname" TEXT,
    "Importiert" DATETIME,
    "Geliefert" DATETIME,
    "Neu" DATETIME,
    "AlterPreis" TEXT,
    "NeuerPreis" TEXT,
    "Modifiziert" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "Mitarbeiter_Name_key" ON "Mitarbeiter"("Name");
