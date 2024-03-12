
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.14.0
 * Query Engine version: d9a4c5988f480fa576d43970d5a23641aa77bc9c
 */
Prisma.prismaVersion = {
  client: "4.14.0",
  engine: "d9a4c5988f480fa576d43970d5a23641aa77bc9c"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.MitarbeiterScalarFieldEnum = {
  id: 'id',
  Name: 'Name',
  Mail: 'Mail',
  Durchwahl: 'Durchwahl',
  Telefon1: 'Telefon1',
  Telefon2: 'Telefon2',
  Mobil: 'Mobil',
  Einkauf: 'Einkauf',
  Geld: 'Geld',
  Pfand: 'Pfand',
  Bild1: 'Bild1',
  Bild2: 'Bild2',
  Bild3: 'Bild3',
  Bild1Type: 'Bild1Type',
  Bild2Type: 'Bild2Type',
  Bild3Type: 'Bild3Type',
  Kurz: 'Kurz',
  isAzubi: 'isAzubi',
  HomeOffice: 'HomeOffice',
  Datum: 'Datum',
  Abonniert: 'Abonniert'
};

exports.Prisma.PdfsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  body: 'body'
};

exports.Prisma.ShortsScalarFieldEnum = {
  id: 'id',
  origin: 'origin',
  short: 'short',
  count: 'count',
  user: 'user'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.WarenlieferungScalarFieldEnum = {
  id: 'id',
  Artikelnummer: 'Artikelnummer',
  Artikelname: 'Artikelname',
  Artikelname_alt: 'Artikelname_alt',
  Datum_Importiert: 'Datum_Importiert',
  Datum_Modifiziert: 'Datum_Modifiziert',
  Datum_Lieferung: 'Datum_Lieferung',
  Datum_Neu: 'Datum_Neu',
  Datum_Alter_Preis: 'Datum_Alter_Preis',
  Datum_Neuer_Preis: 'Datum_Neuer_Preis',
  Alter_Preis: 'Alter_Preis',
  Neuer_Preis: 'Neuer_Preis'
};

exports.Prisma.mitarbeiterOrderByRelevanceFieldEnum = {
  Name: 'Name',
  Mail: 'Mail',
  Durchwahl: 'Durchwahl',
  Telefon1: 'Telefon1',
  Telefon2: 'Telefon2',
  Mobil: 'Mobil',
  Einkauf: 'Einkauf',
  Geld: 'Geld',
  Pfand: 'Pfand',
  Bild1: 'Bild1',
  Bild2: 'Bild2',
  Bild3: 'Bild3',
  Bild1Type: 'Bild1Type',
  Bild2Type: 'Bild2Type',
  Bild3Type: 'Bild3Type',
  Kurz: 'Kurz',
  HomeOffice: 'HomeOffice'
};

exports.Prisma.pdfsOrderByRelevanceFieldEnum = {
  title: 'title',
  body: 'body'
};

exports.Prisma.shortsOrderByRelevanceFieldEnum = {
  origin: 'origin',
  short: 'short',
  user: 'user'
};

exports.Prisma.warenlieferungOrderByRelevanceFieldEnum = {
  Artikelnummer: 'Artikelnummer',
  Artikelname: 'Artikelname',
  Artikelname_alt: 'Artikelname_alt',
  Alter_Preis: 'Alter_Preis',
  Neuer_Preis: 'Neuer_Preis'
};


exports.Prisma.ModelName = {
  mitarbeiter: 'mitarbeiter',
  pdfs: 'pdfs',
  shorts: 'shorts',
  warenlieferung: 'warenlieferung'
};

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
