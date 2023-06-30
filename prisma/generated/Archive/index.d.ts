
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model mitarbeiter
 * 
 */
export type mitarbeiter = {
  id: number
  Name: string
  Mail: string | null
  Durchwahl: string | null
  Telefon1: string | null
  Telefon2: string | null
  Mobil: string | null
  Einkauf: string | null
  Geld: string | null
  Pfand: string | null
  Bild1: string | null
  Bild2: string | null
  Bild3: string | null
  Bild1Type: string | null
  Bild2Type: string | null
  Bild3Type: string | null
  Kurz: string | null
  isAzubi: number
  HomeOffice: string | null
  Datum: Date | null
  Abonniert: number | null
}

/**
 * Model pdfs
 * 
 */
export type pdfs = {
  id: number
  title: string
  body: string
}

/**
 * Model shorts
 * 
 */
export type shorts = {
  id: number
  origin: string
  short: string
  count: number | null
  user: string
}

/**
 * Model warenlieferung
 * 
 */
export type warenlieferung = {
  id: number
  Artikelnummer: string
  Artikelname: string
  Artikelname_alt: string | null
  Datum_Importiert: Date | null
  Datum_Modifiziert: Date | null
  Datum_Lieferung: Date | null
  Datum_Neu: Date | null
  Datum_Alter_Preis: Date | null
  Datum_Neuer_Preis: Date | null
  Alter_Preis: string | null
  Neuer_Preis: string | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Mitarbeiters
 * const mitarbeiters = await prisma.mitarbeiter.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Mitarbeiters
   * const mitarbeiters = await prisma.mitarbeiter.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.mitarbeiter`: Exposes CRUD operations for the **mitarbeiter** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mitarbeiters
    * const mitarbeiters = await prisma.mitarbeiter.findMany()
    * ```
    */
  get mitarbeiter(): Prisma.mitarbeiterDelegate<GlobalReject>;

  /**
   * `prisma.pdfs`: Exposes CRUD operations for the **pdfs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pdfs
    * const pdfs = await prisma.pdfs.findMany()
    * ```
    */
  get pdfs(): Prisma.pdfsDelegate<GlobalReject>;

  /**
   * `prisma.shorts`: Exposes CRUD operations for the **shorts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shorts
    * const shorts = await prisma.shorts.findMany()
    * ```
    */
  get shorts(): Prisma.shortsDelegate<GlobalReject>;

  /**
   * `prisma.warenlieferung`: Exposes CRUD operations for the **warenlieferung** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Warenlieferungs
    * const warenlieferungs = await prisma.warenlieferung.findMany()
    * ```
    */
  get warenlieferung(): Prisma.warenlieferungDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.14.0
   * Query Engine version: d9a4c5988f480fa576d43970d5a23641aa77bc9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    mitarbeiter: 'mitarbeiter',
    pdfs: 'pdfs',
    shorts: 'shorts',
    warenlieferung: 'warenlieferung'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model mitarbeiter
   */


  export type AggregateMitarbeiter = {
    _count: MitarbeiterCountAggregateOutputType | null
    _avg: MitarbeiterAvgAggregateOutputType | null
    _sum: MitarbeiterSumAggregateOutputType | null
    _min: MitarbeiterMinAggregateOutputType | null
    _max: MitarbeiterMaxAggregateOutputType | null
  }

  export type MitarbeiterAvgAggregateOutputType = {
    id: number | null
    isAzubi: number | null
    Abonniert: number | null
  }

  export type MitarbeiterSumAggregateOutputType = {
    id: number | null
    isAzubi: number | null
    Abonniert: number | null
  }

  export type MitarbeiterMinAggregateOutputType = {
    id: number | null
    Name: string | null
    Mail: string | null
    Durchwahl: string | null
    Telefon1: string | null
    Telefon2: string | null
    Mobil: string | null
    Einkauf: string | null
    Geld: string | null
    Pfand: string | null
    Bild1: string | null
    Bild2: string | null
    Bild3: string | null
    Bild1Type: string | null
    Bild2Type: string | null
    Bild3Type: string | null
    Kurz: string | null
    isAzubi: number | null
    HomeOffice: string | null
    Datum: Date | null
    Abonniert: number | null
  }

  export type MitarbeiterMaxAggregateOutputType = {
    id: number | null
    Name: string | null
    Mail: string | null
    Durchwahl: string | null
    Telefon1: string | null
    Telefon2: string | null
    Mobil: string | null
    Einkauf: string | null
    Geld: string | null
    Pfand: string | null
    Bild1: string | null
    Bild2: string | null
    Bild3: string | null
    Bild1Type: string | null
    Bild2Type: string | null
    Bild3Type: string | null
    Kurz: string | null
    isAzubi: number | null
    HomeOffice: string | null
    Datum: Date | null
    Abonniert: number | null
  }

  export type MitarbeiterCountAggregateOutputType = {
    id: number
    Name: number
    Mail: number
    Durchwahl: number
    Telefon1: number
    Telefon2: number
    Mobil: number
    Einkauf: number
    Geld: number
    Pfand: number
    Bild1: number
    Bild2: number
    Bild3: number
    Bild1Type: number
    Bild2Type: number
    Bild3Type: number
    Kurz: number
    isAzubi: number
    HomeOffice: number
    Datum: number
    Abonniert: number
    _all: number
  }


  export type MitarbeiterAvgAggregateInputType = {
    id?: true
    isAzubi?: true
    Abonniert?: true
  }

  export type MitarbeiterSumAggregateInputType = {
    id?: true
    isAzubi?: true
    Abonniert?: true
  }

  export type MitarbeiterMinAggregateInputType = {
    id?: true
    Name?: true
    Mail?: true
    Durchwahl?: true
    Telefon1?: true
    Telefon2?: true
    Mobil?: true
    Einkauf?: true
    Geld?: true
    Pfand?: true
    Bild1?: true
    Bild2?: true
    Bild3?: true
    Bild1Type?: true
    Bild2Type?: true
    Bild3Type?: true
    Kurz?: true
    isAzubi?: true
    HomeOffice?: true
    Datum?: true
    Abonniert?: true
  }

  export type MitarbeiterMaxAggregateInputType = {
    id?: true
    Name?: true
    Mail?: true
    Durchwahl?: true
    Telefon1?: true
    Telefon2?: true
    Mobil?: true
    Einkauf?: true
    Geld?: true
    Pfand?: true
    Bild1?: true
    Bild2?: true
    Bild3?: true
    Bild1Type?: true
    Bild2Type?: true
    Bild3Type?: true
    Kurz?: true
    isAzubi?: true
    HomeOffice?: true
    Datum?: true
    Abonniert?: true
  }

  export type MitarbeiterCountAggregateInputType = {
    id?: true
    Name?: true
    Mail?: true
    Durchwahl?: true
    Telefon1?: true
    Telefon2?: true
    Mobil?: true
    Einkauf?: true
    Geld?: true
    Pfand?: true
    Bild1?: true
    Bild2?: true
    Bild3?: true
    Bild1Type?: true
    Bild2Type?: true
    Bild3Type?: true
    Kurz?: true
    isAzubi?: true
    HomeOffice?: true
    Datum?: true
    Abonniert?: true
    _all?: true
  }

  export type MitarbeiterAggregateArgs = {
    /**
     * Filter which mitarbeiter to aggregate.
     */
    where?: mitarbeiterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mitarbeiters to fetch.
     */
    orderBy?: Enumerable<mitarbeiterOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: mitarbeiterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mitarbeiters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mitarbeiters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned mitarbeiters
    **/
    _count?: true | MitarbeiterCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MitarbeiterAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MitarbeiterSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MitarbeiterMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MitarbeiterMaxAggregateInputType
  }

  export type GetMitarbeiterAggregateType<T extends MitarbeiterAggregateArgs> = {
        [P in keyof T & keyof AggregateMitarbeiter]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMitarbeiter[P]>
      : GetScalarType<T[P], AggregateMitarbeiter[P]>
  }




  export type MitarbeiterGroupByArgs = {
    where?: mitarbeiterWhereInput
    orderBy?: Enumerable<mitarbeiterOrderByWithAggregationInput>
    by: MitarbeiterScalarFieldEnum[]
    having?: mitarbeiterScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MitarbeiterCountAggregateInputType | true
    _avg?: MitarbeiterAvgAggregateInputType
    _sum?: MitarbeiterSumAggregateInputType
    _min?: MitarbeiterMinAggregateInputType
    _max?: MitarbeiterMaxAggregateInputType
  }


  export type MitarbeiterGroupByOutputType = {
    id: number
    Name: string
    Mail: string | null
    Durchwahl: string | null
    Telefon1: string | null
    Telefon2: string | null
    Mobil: string | null
    Einkauf: string | null
    Geld: string | null
    Pfand: string | null
    Bild1: string | null
    Bild2: string | null
    Bild3: string | null
    Bild1Type: string | null
    Bild2Type: string | null
    Bild3Type: string | null
    Kurz: string | null
    isAzubi: number
    HomeOffice: string | null
    Datum: Date | null
    Abonniert: number | null
    _count: MitarbeiterCountAggregateOutputType | null
    _avg: MitarbeiterAvgAggregateOutputType | null
    _sum: MitarbeiterSumAggregateOutputType | null
    _min: MitarbeiterMinAggregateOutputType | null
    _max: MitarbeiterMaxAggregateOutputType | null
  }

  type GetMitarbeiterGroupByPayload<T extends MitarbeiterGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<MitarbeiterGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MitarbeiterGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MitarbeiterGroupByOutputType[P]>
            : GetScalarType<T[P], MitarbeiterGroupByOutputType[P]>
        }
      >
    >


  export type mitarbeiterSelect = {
    id?: boolean
    Name?: boolean
    Mail?: boolean
    Durchwahl?: boolean
    Telefon1?: boolean
    Telefon2?: boolean
    Mobil?: boolean
    Einkauf?: boolean
    Geld?: boolean
    Pfand?: boolean
    Bild1?: boolean
    Bild2?: boolean
    Bild3?: boolean
    Bild1Type?: boolean
    Bild2Type?: boolean
    Bild3Type?: boolean
    Kurz?: boolean
    isAzubi?: boolean
    HomeOffice?: boolean
    Datum?: boolean
    Abonniert?: boolean
  }


  export type mitarbeiterGetPayload<S extends boolean | null | undefined | mitarbeiterArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? mitarbeiter :
    S extends undefined ? never :
    S extends { include: any } & (mitarbeiterArgs | mitarbeiterFindManyArgs)
    ? mitarbeiter 
    : S extends { select: any } & (mitarbeiterArgs | mitarbeiterFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof mitarbeiter ? mitarbeiter[P] : never
  } 
      : mitarbeiter


  type mitarbeiterCountArgs = 
    Omit<mitarbeiterFindManyArgs, 'select' | 'include'> & {
      select?: MitarbeiterCountAggregateInputType | true
    }

  export interface mitarbeiterDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Mitarbeiter that matches the filter.
     * @param {mitarbeiterFindUniqueArgs} args - Arguments to find a Mitarbeiter
     * @example
     * // Get one Mitarbeiter
     * const mitarbeiter = await prisma.mitarbeiter.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends mitarbeiterFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, mitarbeiterFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'mitarbeiter'> extends True ? Prisma__mitarbeiterClient<mitarbeiterGetPayload<T>> : Prisma__mitarbeiterClient<mitarbeiterGetPayload<T> | null, null>

    /**
     * Find one Mitarbeiter that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {mitarbeiterFindUniqueOrThrowArgs} args - Arguments to find a Mitarbeiter
     * @example
     * // Get one Mitarbeiter
     * const mitarbeiter = await prisma.mitarbeiter.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends mitarbeiterFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, mitarbeiterFindUniqueOrThrowArgs>
    ): Prisma__mitarbeiterClient<mitarbeiterGetPayload<T>>

    /**
     * Find the first Mitarbeiter that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mitarbeiterFindFirstArgs} args - Arguments to find a Mitarbeiter
     * @example
     * // Get one Mitarbeiter
     * const mitarbeiter = await prisma.mitarbeiter.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends mitarbeiterFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, mitarbeiterFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'mitarbeiter'> extends True ? Prisma__mitarbeiterClient<mitarbeiterGetPayload<T>> : Prisma__mitarbeiterClient<mitarbeiterGetPayload<T> | null, null>

    /**
     * Find the first Mitarbeiter that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mitarbeiterFindFirstOrThrowArgs} args - Arguments to find a Mitarbeiter
     * @example
     * // Get one Mitarbeiter
     * const mitarbeiter = await prisma.mitarbeiter.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends mitarbeiterFindFirstOrThrowArgs>(
      args?: SelectSubset<T, mitarbeiterFindFirstOrThrowArgs>
    ): Prisma__mitarbeiterClient<mitarbeiterGetPayload<T>>

    /**
     * Find zero or more Mitarbeiters that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mitarbeiterFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mitarbeiters
     * const mitarbeiters = await prisma.mitarbeiter.findMany()
     * 
     * // Get first 10 Mitarbeiters
     * const mitarbeiters = await prisma.mitarbeiter.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mitarbeiterWithIdOnly = await prisma.mitarbeiter.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends mitarbeiterFindManyArgs>(
      args?: SelectSubset<T, mitarbeiterFindManyArgs>
    ): Prisma.PrismaPromise<Array<mitarbeiterGetPayload<T>>>

    /**
     * Create a Mitarbeiter.
     * @param {mitarbeiterCreateArgs} args - Arguments to create a Mitarbeiter.
     * @example
     * // Create one Mitarbeiter
     * const Mitarbeiter = await prisma.mitarbeiter.create({
     *   data: {
     *     // ... data to create a Mitarbeiter
     *   }
     * })
     * 
    **/
    create<T extends mitarbeiterCreateArgs>(
      args: SelectSubset<T, mitarbeiterCreateArgs>
    ): Prisma__mitarbeiterClient<mitarbeiterGetPayload<T>>

    /**
     * Create many Mitarbeiters.
     *     @param {mitarbeiterCreateManyArgs} args - Arguments to create many Mitarbeiters.
     *     @example
     *     // Create many Mitarbeiters
     *     const mitarbeiter = await prisma.mitarbeiter.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends mitarbeiterCreateManyArgs>(
      args?: SelectSubset<T, mitarbeiterCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Mitarbeiter.
     * @param {mitarbeiterDeleteArgs} args - Arguments to delete one Mitarbeiter.
     * @example
     * // Delete one Mitarbeiter
     * const Mitarbeiter = await prisma.mitarbeiter.delete({
     *   where: {
     *     // ... filter to delete one Mitarbeiter
     *   }
     * })
     * 
    **/
    delete<T extends mitarbeiterDeleteArgs>(
      args: SelectSubset<T, mitarbeiterDeleteArgs>
    ): Prisma__mitarbeiterClient<mitarbeiterGetPayload<T>>

    /**
     * Update one Mitarbeiter.
     * @param {mitarbeiterUpdateArgs} args - Arguments to update one Mitarbeiter.
     * @example
     * // Update one Mitarbeiter
     * const mitarbeiter = await prisma.mitarbeiter.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends mitarbeiterUpdateArgs>(
      args: SelectSubset<T, mitarbeiterUpdateArgs>
    ): Prisma__mitarbeiterClient<mitarbeiterGetPayload<T>>

    /**
     * Delete zero or more Mitarbeiters.
     * @param {mitarbeiterDeleteManyArgs} args - Arguments to filter Mitarbeiters to delete.
     * @example
     * // Delete a few Mitarbeiters
     * const { count } = await prisma.mitarbeiter.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends mitarbeiterDeleteManyArgs>(
      args?: SelectSubset<T, mitarbeiterDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mitarbeiters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mitarbeiterUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mitarbeiters
     * const mitarbeiter = await prisma.mitarbeiter.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends mitarbeiterUpdateManyArgs>(
      args: SelectSubset<T, mitarbeiterUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mitarbeiter.
     * @param {mitarbeiterUpsertArgs} args - Arguments to update or create a Mitarbeiter.
     * @example
     * // Update or create a Mitarbeiter
     * const mitarbeiter = await prisma.mitarbeiter.upsert({
     *   create: {
     *     // ... data to create a Mitarbeiter
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mitarbeiter we want to update
     *   }
     * })
    **/
    upsert<T extends mitarbeiterUpsertArgs>(
      args: SelectSubset<T, mitarbeiterUpsertArgs>
    ): Prisma__mitarbeiterClient<mitarbeiterGetPayload<T>>

    /**
     * Count the number of Mitarbeiters.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {mitarbeiterCountArgs} args - Arguments to filter Mitarbeiters to count.
     * @example
     * // Count the number of Mitarbeiters
     * const count = await prisma.mitarbeiter.count({
     *   where: {
     *     // ... the filter for the Mitarbeiters we want to count
     *   }
     * })
    **/
    count<T extends mitarbeiterCountArgs>(
      args?: Subset<T, mitarbeiterCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MitarbeiterCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mitarbeiter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MitarbeiterAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MitarbeiterAggregateArgs>(args: Subset<T, MitarbeiterAggregateArgs>): Prisma.PrismaPromise<GetMitarbeiterAggregateType<T>>

    /**
     * Group by Mitarbeiter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MitarbeiterGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MitarbeiterGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MitarbeiterGroupByArgs['orderBy'] }
        : { orderBy?: MitarbeiterGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MitarbeiterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMitarbeiterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for mitarbeiter.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__mitarbeiterClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * mitarbeiter base type for findUnique actions
   */
  export type mitarbeiterFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
    /**
     * Filter, which mitarbeiter to fetch.
     */
    where: mitarbeiterWhereUniqueInput
  }

  /**
   * mitarbeiter findUnique
   */
  export interface mitarbeiterFindUniqueArgs extends mitarbeiterFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * mitarbeiter findUniqueOrThrow
   */
  export type mitarbeiterFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
    /**
     * Filter, which mitarbeiter to fetch.
     */
    where: mitarbeiterWhereUniqueInput
  }


  /**
   * mitarbeiter base type for findFirst actions
   */
  export type mitarbeiterFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
    /**
     * Filter, which mitarbeiter to fetch.
     */
    where?: mitarbeiterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mitarbeiters to fetch.
     */
    orderBy?: Enumerable<mitarbeiterOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mitarbeiters.
     */
    cursor?: mitarbeiterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mitarbeiters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mitarbeiters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mitarbeiters.
     */
    distinct?: Enumerable<MitarbeiterScalarFieldEnum>
  }

  /**
   * mitarbeiter findFirst
   */
  export interface mitarbeiterFindFirstArgs extends mitarbeiterFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * mitarbeiter findFirstOrThrow
   */
  export type mitarbeiterFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
    /**
     * Filter, which mitarbeiter to fetch.
     */
    where?: mitarbeiterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mitarbeiters to fetch.
     */
    orderBy?: Enumerable<mitarbeiterOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for mitarbeiters.
     */
    cursor?: mitarbeiterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mitarbeiters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mitarbeiters.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of mitarbeiters.
     */
    distinct?: Enumerable<MitarbeiterScalarFieldEnum>
  }


  /**
   * mitarbeiter findMany
   */
  export type mitarbeiterFindManyArgs = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
    /**
     * Filter, which mitarbeiters to fetch.
     */
    where?: mitarbeiterWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of mitarbeiters to fetch.
     */
    orderBy?: Enumerable<mitarbeiterOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing mitarbeiters.
     */
    cursor?: mitarbeiterWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` mitarbeiters from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` mitarbeiters.
     */
    skip?: number
    distinct?: Enumerable<MitarbeiterScalarFieldEnum>
  }


  /**
   * mitarbeiter create
   */
  export type mitarbeiterCreateArgs = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
    /**
     * The data needed to create a mitarbeiter.
     */
    data: XOR<mitarbeiterCreateInput, mitarbeiterUncheckedCreateInput>
  }


  /**
   * mitarbeiter createMany
   */
  export type mitarbeiterCreateManyArgs = {
    /**
     * The data used to create many mitarbeiters.
     */
    data: Enumerable<mitarbeiterCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * mitarbeiter update
   */
  export type mitarbeiterUpdateArgs = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
    /**
     * The data needed to update a mitarbeiter.
     */
    data: XOR<mitarbeiterUpdateInput, mitarbeiterUncheckedUpdateInput>
    /**
     * Choose, which mitarbeiter to update.
     */
    where: mitarbeiterWhereUniqueInput
  }


  /**
   * mitarbeiter updateMany
   */
  export type mitarbeiterUpdateManyArgs = {
    /**
     * The data used to update mitarbeiters.
     */
    data: XOR<mitarbeiterUpdateManyMutationInput, mitarbeiterUncheckedUpdateManyInput>
    /**
     * Filter which mitarbeiters to update
     */
    where?: mitarbeiterWhereInput
  }


  /**
   * mitarbeiter upsert
   */
  export type mitarbeiterUpsertArgs = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
    /**
     * The filter to search for the mitarbeiter to update in case it exists.
     */
    where: mitarbeiterWhereUniqueInput
    /**
     * In case the mitarbeiter found by the `where` argument doesn't exist, create a new mitarbeiter with this data.
     */
    create: XOR<mitarbeiterCreateInput, mitarbeiterUncheckedCreateInput>
    /**
     * In case the mitarbeiter was found with the provided `where` argument, update it with this data.
     */
    update: XOR<mitarbeiterUpdateInput, mitarbeiterUncheckedUpdateInput>
  }


  /**
   * mitarbeiter delete
   */
  export type mitarbeiterDeleteArgs = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
    /**
     * Filter which mitarbeiter to delete.
     */
    where: mitarbeiterWhereUniqueInput
  }


  /**
   * mitarbeiter deleteMany
   */
  export type mitarbeiterDeleteManyArgs = {
    /**
     * Filter which mitarbeiters to delete
     */
    where?: mitarbeiterWhereInput
  }


  /**
   * mitarbeiter without action
   */
  export type mitarbeiterArgs = {
    /**
     * Select specific fields to fetch from the mitarbeiter
     */
    select?: mitarbeiterSelect | null
  }



  /**
   * Model pdfs
   */


  export type AggregatePdfs = {
    _count: PdfsCountAggregateOutputType | null
    _avg: PdfsAvgAggregateOutputType | null
    _sum: PdfsSumAggregateOutputType | null
    _min: PdfsMinAggregateOutputType | null
    _max: PdfsMaxAggregateOutputType | null
  }

  export type PdfsAvgAggregateOutputType = {
    id: number | null
  }

  export type PdfsSumAggregateOutputType = {
    id: number | null
  }

  export type PdfsMinAggregateOutputType = {
    id: number | null
    title: string | null
    body: string | null
  }

  export type PdfsMaxAggregateOutputType = {
    id: number | null
    title: string | null
    body: string | null
  }

  export type PdfsCountAggregateOutputType = {
    id: number
    title: number
    body: number
    _all: number
  }


  export type PdfsAvgAggregateInputType = {
    id?: true
  }

  export type PdfsSumAggregateInputType = {
    id?: true
  }

  export type PdfsMinAggregateInputType = {
    id?: true
    title?: true
    body?: true
  }

  export type PdfsMaxAggregateInputType = {
    id?: true
    title?: true
    body?: true
  }

  export type PdfsCountAggregateInputType = {
    id?: true
    title?: true
    body?: true
    _all?: true
  }

  export type PdfsAggregateArgs = {
    /**
     * Filter which pdfs to aggregate.
     */
    where?: pdfsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pdfs to fetch.
     */
    orderBy?: Enumerable<pdfsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pdfsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pdfs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pdfs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pdfs
    **/
    _count?: true | PdfsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PdfsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PdfsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PdfsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PdfsMaxAggregateInputType
  }

  export type GetPdfsAggregateType<T extends PdfsAggregateArgs> = {
        [P in keyof T & keyof AggregatePdfs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePdfs[P]>
      : GetScalarType<T[P], AggregatePdfs[P]>
  }




  export type PdfsGroupByArgs = {
    where?: pdfsWhereInput
    orderBy?: Enumerable<pdfsOrderByWithAggregationInput>
    by: PdfsScalarFieldEnum[]
    having?: pdfsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PdfsCountAggregateInputType | true
    _avg?: PdfsAvgAggregateInputType
    _sum?: PdfsSumAggregateInputType
    _min?: PdfsMinAggregateInputType
    _max?: PdfsMaxAggregateInputType
  }


  export type PdfsGroupByOutputType = {
    id: number
    title: string
    body: string
    _count: PdfsCountAggregateOutputType | null
    _avg: PdfsAvgAggregateOutputType | null
    _sum: PdfsSumAggregateOutputType | null
    _min: PdfsMinAggregateOutputType | null
    _max: PdfsMaxAggregateOutputType | null
  }

  type GetPdfsGroupByPayload<T extends PdfsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<PdfsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PdfsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PdfsGroupByOutputType[P]>
            : GetScalarType<T[P], PdfsGroupByOutputType[P]>
        }
      >
    >


  export type pdfsSelect = {
    id?: boolean
    title?: boolean
    body?: boolean
  }


  export type pdfsGetPayload<S extends boolean | null | undefined | pdfsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? pdfs :
    S extends undefined ? never :
    S extends { include: any } & (pdfsArgs | pdfsFindManyArgs)
    ? pdfs 
    : S extends { select: any } & (pdfsArgs | pdfsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof pdfs ? pdfs[P] : never
  } 
      : pdfs


  type pdfsCountArgs = 
    Omit<pdfsFindManyArgs, 'select' | 'include'> & {
      select?: PdfsCountAggregateInputType | true
    }

  export interface pdfsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Pdfs that matches the filter.
     * @param {pdfsFindUniqueArgs} args - Arguments to find a Pdfs
     * @example
     * // Get one Pdfs
     * const pdfs = await prisma.pdfs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends pdfsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, pdfsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'pdfs'> extends True ? Prisma__pdfsClient<pdfsGetPayload<T>> : Prisma__pdfsClient<pdfsGetPayload<T> | null, null>

    /**
     * Find one Pdfs that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {pdfsFindUniqueOrThrowArgs} args - Arguments to find a Pdfs
     * @example
     * // Get one Pdfs
     * const pdfs = await prisma.pdfs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends pdfsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, pdfsFindUniqueOrThrowArgs>
    ): Prisma__pdfsClient<pdfsGetPayload<T>>

    /**
     * Find the first Pdfs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pdfsFindFirstArgs} args - Arguments to find a Pdfs
     * @example
     * // Get one Pdfs
     * const pdfs = await prisma.pdfs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends pdfsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, pdfsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'pdfs'> extends True ? Prisma__pdfsClient<pdfsGetPayload<T>> : Prisma__pdfsClient<pdfsGetPayload<T> | null, null>

    /**
     * Find the first Pdfs that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pdfsFindFirstOrThrowArgs} args - Arguments to find a Pdfs
     * @example
     * // Get one Pdfs
     * const pdfs = await prisma.pdfs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends pdfsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, pdfsFindFirstOrThrowArgs>
    ): Prisma__pdfsClient<pdfsGetPayload<T>>

    /**
     * Find zero or more Pdfs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pdfsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pdfs
     * const pdfs = await prisma.pdfs.findMany()
     * 
     * // Get first 10 Pdfs
     * const pdfs = await prisma.pdfs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pdfsWithIdOnly = await prisma.pdfs.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends pdfsFindManyArgs>(
      args?: SelectSubset<T, pdfsFindManyArgs>
    ): Prisma.PrismaPromise<Array<pdfsGetPayload<T>>>

    /**
     * Create a Pdfs.
     * @param {pdfsCreateArgs} args - Arguments to create a Pdfs.
     * @example
     * // Create one Pdfs
     * const Pdfs = await prisma.pdfs.create({
     *   data: {
     *     // ... data to create a Pdfs
     *   }
     * })
     * 
    **/
    create<T extends pdfsCreateArgs>(
      args: SelectSubset<T, pdfsCreateArgs>
    ): Prisma__pdfsClient<pdfsGetPayload<T>>

    /**
     * Create many Pdfs.
     *     @param {pdfsCreateManyArgs} args - Arguments to create many Pdfs.
     *     @example
     *     // Create many Pdfs
     *     const pdfs = await prisma.pdfs.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends pdfsCreateManyArgs>(
      args?: SelectSubset<T, pdfsCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pdfs.
     * @param {pdfsDeleteArgs} args - Arguments to delete one Pdfs.
     * @example
     * // Delete one Pdfs
     * const Pdfs = await prisma.pdfs.delete({
     *   where: {
     *     // ... filter to delete one Pdfs
     *   }
     * })
     * 
    **/
    delete<T extends pdfsDeleteArgs>(
      args: SelectSubset<T, pdfsDeleteArgs>
    ): Prisma__pdfsClient<pdfsGetPayload<T>>

    /**
     * Update one Pdfs.
     * @param {pdfsUpdateArgs} args - Arguments to update one Pdfs.
     * @example
     * // Update one Pdfs
     * const pdfs = await prisma.pdfs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends pdfsUpdateArgs>(
      args: SelectSubset<T, pdfsUpdateArgs>
    ): Prisma__pdfsClient<pdfsGetPayload<T>>

    /**
     * Delete zero or more Pdfs.
     * @param {pdfsDeleteManyArgs} args - Arguments to filter Pdfs to delete.
     * @example
     * // Delete a few Pdfs
     * const { count } = await prisma.pdfs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends pdfsDeleteManyArgs>(
      args?: SelectSubset<T, pdfsDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pdfs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pdfsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pdfs
     * const pdfs = await prisma.pdfs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends pdfsUpdateManyArgs>(
      args: SelectSubset<T, pdfsUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pdfs.
     * @param {pdfsUpsertArgs} args - Arguments to update or create a Pdfs.
     * @example
     * // Update or create a Pdfs
     * const pdfs = await prisma.pdfs.upsert({
     *   create: {
     *     // ... data to create a Pdfs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pdfs we want to update
     *   }
     * })
    **/
    upsert<T extends pdfsUpsertArgs>(
      args: SelectSubset<T, pdfsUpsertArgs>
    ): Prisma__pdfsClient<pdfsGetPayload<T>>

    /**
     * Count the number of Pdfs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pdfsCountArgs} args - Arguments to filter Pdfs to count.
     * @example
     * // Count the number of Pdfs
     * const count = await prisma.pdfs.count({
     *   where: {
     *     // ... the filter for the Pdfs we want to count
     *   }
     * })
    **/
    count<T extends pdfsCountArgs>(
      args?: Subset<T, pdfsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PdfsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pdfs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PdfsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PdfsAggregateArgs>(args: Subset<T, PdfsAggregateArgs>): Prisma.PrismaPromise<GetPdfsAggregateType<T>>

    /**
     * Group by Pdfs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PdfsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PdfsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PdfsGroupByArgs['orderBy'] }
        : { orderBy?: PdfsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PdfsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPdfsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for pdfs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__pdfsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * pdfs base type for findUnique actions
   */
  export type pdfsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
    /**
     * Filter, which pdfs to fetch.
     */
    where: pdfsWhereUniqueInput
  }

  /**
   * pdfs findUnique
   */
  export interface pdfsFindUniqueArgs extends pdfsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * pdfs findUniqueOrThrow
   */
  export type pdfsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
    /**
     * Filter, which pdfs to fetch.
     */
    where: pdfsWhereUniqueInput
  }


  /**
   * pdfs base type for findFirst actions
   */
  export type pdfsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
    /**
     * Filter, which pdfs to fetch.
     */
    where?: pdfsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pdfs to fetch.
     */
    orderBy?: Enumerable<pdfsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pdfs.
     */
    cursor?: pdfsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pdfs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pdfs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pdfs.
     */
    distinct?: Enumerable<PdfsScalarFieldEnum>
  }

  /**
   * pdfs findFirst
   */
  export interface pdfsFindFirstArgs extends pdfsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * pdfs findFirstOrThrow
   */
  export type pdfsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
    /**
     * Filter, which pdfs to fetch.
     */
    where?: pdfsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pdfs to fetch.
     */
    orderBy?: Enumerable<pdfsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pdfs.
     */
    cursor?: pdfsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pdfs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pdfs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pdfs.
     */
    distinct?: Enumerable<PdfsScalarFieldEnum>
  }


  /**
   * pdfs findMany
   */
  export type pdfsFindManyArgs = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
    /**
     * Filter, which pdfs to fetch.
     */
    where?: pdfsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pdfs to fetch.
     */
    orderBy?: Enumerable<pdfsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pdfs.
     */
    cursor?: pdfsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pdfs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pdfs.
     */
    skip?: number
    distinct?: Enumerable<PdfsScalarFieldEnum>
  }


  /**
   * pdfs create
   */
  export type pdfsCreateArgs = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
    /**
     * The data needed to create a pdfs.
     */
    data: XOR<pdfsCreateInput, pdfsUncheckedCreateInput>
  }


  /**
   * pdfs createMany
   */
  export type pdfsCreateManyArgs = {
    /**
     * The data used to create many pdfs.
     */
    data: Enumerable<pdfsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * pdfs update
   */
  export type pdfsUpdateArgs = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
    /**
     * The data needed to update a pdfs.
     */
    data: XOR<pdfsUpdateInput, pdfsUncheckedUpdateInput>
    /**
     * Choose, which pdfs to update.
     */
    where: pdfsWhereUniqueInput
  }


  /**
   * pdfs updateMany
   */
  export type pdfsUpdateManyArgs = {
    /**
     * The data used to update pdfs.
     */
    data: XOR<pdfsUpdateManyMutationInput, pdfsUncheckedUpdateManyInput>
    /**
     * Filter which pdfs to update
     */
    where?: pdfsWhereInput
  }


  /**
   * pdfs upsert
   */
  export type pdfsUpsertArgs = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
    /**
     * The filter to search for the pdfs to update in case it exists.
     */
    where: pdfsWhereUniqueInput
    /**
     * In case the pdfs found by the `where` argument doesn't exist, create a new pdfs with this data.
     */
    create: XOR<pdfsCreateInput, pdfsUncheckedCreateInput>
    /**
     * In case the pdfs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pdfsUpdateInput, pdfsUncheckedUpdateInput>
  }


  /**
   * pdfs delete
   */
  export type pdfsDeleteArgs = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
    /**
     * Filter which pdfs to delete.
     */
    where: pdfsWhereUniqueInput
  }


  /**
   * pdfs deleteMany
   */
  export type pdfsDeleteManyArgs = {
    /**
     * Filter which pdfs to delete
     */
    where?: pdfsWhereInput
  }


  /**
   * pdfs without action
   */
  export type pdfsArgs = {
    /**
     * Select specific fields to fetch from the pdfs
     */
    select?: pdfsSelect | null
  }



  /**
   * Model shorts
   */


  export type AggregateShorts = {
    _count: ShortsCountAggregateOutputType | null
    _avg: ShortsAvgAggregateOutputType | null
    _sum: ShortsSumAggregateOutputType | null
    _min: ShortsMinAggregateOutputType | null
    _max: ShortsMaxAggregateOutputType | null
  }

  export type ShortsAvgAggregateOutputType = {
    id: number | null
    count: number | null
  }

  export type ShortsSumAggregateOutputType = {
    id: number | null
    count: number | null
  }

  export type ShortsMinAggregateOutputType = {
    id: number | null
    origin: string | null
    short: string | null
    count: number | null
    user: string | null
  }

  export type ShortsMaxAggregateOutputType = {
    id: number | null
    origin: string | null
    short: string | null
    count: number | null
    user: string | null
  }

  export type ShortsCountAggregateOutputType = {
    id: number
    origin: number
    short: number
    count: number
    user: number
    _all: number
  }


  export type ShortsAvgAggregateInputType = {
    id?: true
    count?: true
  }

  export type ShortsSumAggregateInputType = {
    id?: true
    count?: true
  }

  export type ShortsMinAggregateInputType = {
    id?: true
    origin?: true
    short?: true
    count?: true
    user?: true
  }

  export type ShortsMaxAggregateInputType = {
    id?: true
    origin?: true
    short?: true
    count?: true
    user?: true
  }

  export type ShortsCountAggregateInputType = {
    id?: true
    origin?: true
    short?: true
    count?: true
    user?: true
    _all?: true
  }

  export type ShortsAggregateArgs = {
    /**
     * Filter which shorts to aggregate.
     */
    where?: shortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shorts to fetch.
     */
    orderBy?: Enumerable<shortsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: shortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned shorts
    **/
    _count?: true | ShortsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShortsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShortsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShortsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShortsMaxAggregateInputType
  }

  export type GetShortsAggregateType<T extends ShortsAggregateArgs> = {
        [P in keyof T & keyof AggregateShorts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShorts[P]>
      : GetScalarType<T[P], AggregateShorts[P]>
  }




  export type ShortsGroupByArgs = {
    where?: shortsWhereInput
    orderBy?: Enumerable<shortsOrderByWithAggregationInput>
    by: ShortsScalarFieldEnum[]
    having?: shortsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShortsCountAggregateInputType | true
    _avg?: ShortsAvgAggregateInputType
    _sum?: ShortsSumAggregateInputType
    _min?: ShortsMinAggregateInputType
    _max?: ShortsMaxAggregateInputType
  }


  export type ShortsGroupByOutputType = {
    id: number
    origin: string
    short: string
    count: number | null
    user: string
    _count: ShortsCountAggregateOutputType | null
    _avg: ShortsAvgAggregateOutputType | null
    _sum: ShortsSumAggregateOutputType | null
    _min: ShortsMinAggregateOutputType | null
    _max: ShortsMaxAggregateOutputType | null
  }

  type GetShortsGroupByPayload<T extends ShortsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ShortsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShortsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShortsGroupByOutputType[P]>
            : GetScalarType<T[P], ShortsGroupByOutputType[P]>
        }
      >
    >


  export type shortsSelect = {
    id?: boolean
    origin?: boolean
    short?: boolean
    count?: boolean
    user?: boolean
  }


  export type shortsGetPayload<S extends boolean | null | undefined | shortsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? shorts :
    S extends undefined ? never :
    S extends { include: any } & (shortsArgs | shortsFindManyArgs)
    ? shorts 
    : S extends { select: any } & (shortsArgs | shortsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof shorts ? shorts[P] : never
  } 
      : shorts


  type shortsCountArgs = 
    Omit<shortsFindManyArgs, 'select' | 'include'> & {
      select?: ShortsCountAggregateInputType | true
    }

  export interface shortsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Shorts that matches the filter.
     * @param {shortsFindUniqueArgs} args - Arguments to find a Shorts
     * @example
     * // Get one Shorts
     * const shorts = await prisma.shorts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends shortsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, shortsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'shorts'> extends True ? Prisma__shortsClient<shortsGetPayload<T>> : Prisma__shortsClient<shortsGetPayload<T> | null, null>

    /**
     * Find one Shorts that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {shortsFindUniqueOrThrowArgs} args - Arguments to find a Shorts
     * @example
     * // Get one Shorts
     * const shorts = await prisma.shorts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends shortsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, shortsFindUniqueOrThrowArgs>
    ): Prisma__shortsClient<shortsGetPayload<T>>

    /**
     * Find the first Shorts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shortsFindFirstArgs} args - Arguments to find a Shorts
     * @example
     * // Get one Shorts
     * const shorts = await prisma.shorts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends shortsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, shortsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'shorts'> extends True ? Prisma__shortsClient<shortsGetPayload<T>> : Prisma__shortsClient<shortsGetPayload<T> | null, null>

    /**
     * Find the first Shorts that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shortsFindFirstOrThrowArgs} args - Arguments to find a Shorts
     * @example
     * // Get one Shorts
     * const shorts = await prisma.shorts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends shortsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, shortsFindFirstOrThrowArgs>
    ): Prisma__shortsClient<shortsGetPayload<T>>

    /**
     * Find zero or more Shorts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shortsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shorts
     * const shorts = await prisma.shorts.findMany()
     * 
     * // Get first 10 Shorts
     * const shorts = await prisma.shorts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shortsWithIdOnly = await prisma.shorts.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends shortsFindManyArgs>(
      args?: SelectSubset<T, shortsFindManyArgs>
    ): Prisma.PrismaPromise<Array<shortsGetPayload<T>>>

    /**
     * Create a Shorts.
     * @param {shortsCreateArgs} args - Arguments to create a Shorts.
     * @example
     * // Create one Shorts
     * const Shorts = await prisma.shorts.create({
     *   data: {
     *     // ... data to create a Shorts
     *   }
     * })
     * 
    **/
    create<T extends shortsCreateArgs>(
      args: SelectSubset<T, shortsCreateArgs>
    ): Prisma__shortsClient<shortsGetPayload<T>>

    /**
     * Create many Shorts.
     *     @param {shortsCreateManyArgs} args - Arguments to create many Shorts.
     *     @example
     *     // Create many Shorts
     *     const shorts = await prisma.shorts.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends shortsCreateManyArgs>(
      args?: SelectSubset<T, shortsCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Shorts.
     * @param {shortsDeleteArgs} args - Arguments to delete one Shorts.
     * @example
     * // Delete one Shorts
     * const Shorts = await prisma.shorts.delete({
     *   where: {
     *     // ... filter to delete one Shorts
     *   }
     * })
     * 
    **/
    delete<T extends shortsDeleteArgs>(
      args: SelectSubset<T, shortsDeleteArgs>
    ): Prisma__shortsClient<shortsGetPayload<T>>

    /**
     * Update one Shorts.
     * @param {shortsUpdateArgs} args - Arguments to update one Shorts.
     * @example
     * // Update one Shorts
     * const shorts = await prisma.shorts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends shortsUpdateArgs>(
      args: SelectSubset<T, shortsUpdateArgs>
    ): Prisma__shortsClient<shortsGetPayload<T>>

    /**
     * Delete zero or more Shorts.
     * @param {shortsDeleteManyArgs} args - Arguments to filter Shorts to delete.
     * @example
     * // Delete a few Shorts
     * const { count } = await prisma.shorts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends shortsDeleteManyArgs>(
      args?: SelectSubset<T, shortsDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shortsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shorts
     * const shorts = await prisma.shorts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends shortsUpdateManyArgs>(
      args: SelectSubset<T, shortsUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Shorts.
     * @param {shortsUpsertArgs} args - Arguments to update or create a Shorts.
     * @example
     * // Update or create a Shorts
     * const shorts = await prisma.shorts.upsert({
     *   create: {
     *     // ... data to create a Shorts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shorts we want to update
     *   }
     * })
    **/
    upsert<T extends shortsUpsertArgs>(
      args: SelectSubset<T, shortsUpsertArgs>
    ): Prisma__shortsClient<shortsGetPayload<T>>

    /**
     * Count the number of Shorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {shortsCountArgs} args - Arguments to filter Shorts to count.
     * @example
     * // Count the number of Shorts
     * const count = await prisma.shorts.count({
     *   where: {
     *     // ... the filter for the Shorts we want to count
     *   }
     * })
    **/
    count<T extends shortsCountArgs>(
      args?: Subset<T, shortsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShortsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShortsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShortsAggregateArgs>(args: Subset<T, ShortsAggregateArgs>): Prisma.PrismaPromise<GetShortsAggregateType<T>>

    /**
     * Group by Shorts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShortsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShortsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShortsGroupByArgs['orderBy'] }
        : { orderBy?: ShortsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShortsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShortsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for shorts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__shortsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * shorts base type for findUnique actions
   */
  export type shortsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
    /**
     * Filter, which shorts to fetch.
     */
    where: shortsWhereUniqueInput
  }

  /**
   * shorts findUnique
   */
  export interface shortsFindUniqueArgs extends shortsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * shorts findUniqueOrThrow
   */
  export type shortsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
    /**
     * Filter, which shorts to fetch.
     */
    where: shortsWhereUniqueInput
  }


  /**
   * shorts base type for findFirst actions
   */
  export type shortsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
    /**
     * Filter, which shorts to fetch.
     */
    where?: shortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shorts to fetch.
     */
    orderBy?: Enumerable<shortsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for shorts.
     */
    cursor?: shortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of shorts.
     */
    distinct?: Enumerable<ShortsScalarFieldEnum>
  }

  /**
   * shorts findFirst
   */
  export interface shortsFindFirstArgs extends shortsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * shorts findFirstOrThrow
   */
  export type shortsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
    /**
     * Filter, which shorts to fetch.
     */
    where?: shortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shorts to fetch.
     */
    orderBy?: Enumerable<shortsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for shorts.
     */
    cursor?: shortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shorts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of shorts.
     */
    distinct?: Enumerable<ShortsScalarFieldEnum>
  }


  /**
   * shorts findMany
   */
  export type shortsFindManyArgs = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
    /**
     * Filter, which shorts to fetch.
     */
    where?: shortsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shorts to fetch.
     */
    orderBy?: Enumerable<shortsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing shorts.
     */
    cursor?: shortsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shorts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shorts.
     */
    skip?: number
    distinct?: Enumerable<ShortsScalarFieldEnum>
  }


  /**
   * shorts create
   */
  export type shortsCreateArgs = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
    /**
     * The data needed to create a shorts.
     */
    data: XOR<shortsCreateInput, shortsUncheckedCreateInput>
  }


  /**
   * shorts createMany
   */
  export type shortsCreateManyArgs = {
    /**
     * The data used to create many shorts.
     */
    data: Enumerable<shortsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * shorts update
   */
  export type shortsUpdateArgs = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
    /**
     * The data needed to update a shorts.
     */
    data: XOR<shortsUpdateInput, shortsUncheckedUpdateInput>
    /**
     * Choose, which shorts to update.
     */
    where: shortsWhereUniqueInput
  }


  /**
   * shorts updateMany
   */
  export type shortsUpdateManyArgs = {
    /**
     * The data used to update shorts.
     */
    data: XOR<shortsUpdateManyMutationInput, shortsUncheckedUpdateManyInput>
    /**
     * Filter which shorts to update
     */
    where?: shortsWhereInput
  }


  /**
   * shorts upsert
   */
  export type shortsUpsertArgs = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
    /**
     * The filter to search for the shorts to update in case it exists.
     */
    where: shortsWhereUniqueInput
    /**
     * In case the shorts found by the `where` argument doesn't exist, create a new shorts with this data.
     */
    create: XOR<shortsCreateInput, shortsUncheckedCreateInput>
    /**
     * In case the shorts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<shortsUpdateInput, shortsUncheckedUpdateInput>
  }


  /**
   * shorts delete
   */
  export type shortsDeleteArgs = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
    /**
     * Filter which shorts to delete.
     */
    where: shortsWhereUniqueInput
  }


  /**
   * shorts deleteMany
   */
  export type shortsDeleteManyArgs = {
    /**
     * Filter which shorts to delete
     */
    where?: shortsWhereInput
  }


  /**
   * shorts without action
   */
  export type shortsArgs = {
    /**
     * Select specific fields to fetch from the shorts
     */
    select?: shortsSelect | null
  }



  /**
   * Model warenlieferung
   */


  export type AggregateWarenlieferung = {
    _count: WarenlieferungCountAggregateOutputType | null
    _avg: WarenlieferungAvgAggregateOutputType | null
    _sum: WarenlieferungSumAggregateOutputType | null
    _min: WarenlieferungMinAggregateOutputType | null
    _max: WarenlieferungMaxAggregateOutputType | null
  }

  export type WarenlieferungAvgAggregateOutputType = {
    id: number | null
  }

  export type WarenlieferungSumAggregateOutputType = {
    id: number | null
  }

  export type WarenlieferungMinAggregateOutputType = {
    id: number | null
    Artikelnummer: string | null
    Artikelname: string | null
    Artikelname_alt: string | null
    Datum_Importiert: Date | null
    Datum_Modifiziert: Date | null
    Datum_Lieferung: Date | null
    Datum_Neu: Date | null
    Datum_Alter_Preis: Date | null
    Datum_Neuer_Preis: Date | null
    Alter_Preis: string | null
    Neuer_Preis: string | null
  }

  export type WarenlieferungMaxAggregateOutputType = {
    id: number | null
    Artikelnummer: string | null
    Artikelname: string | null
    Artikelname_alt: string | null
    Datum_Importiert: Date | null
    Datum_Modifiziert: Date | null
    Datum_Lieferung: Date | null
    Datum_Neu: Date | null
    Datum_Alter_Preis: Date | null
    Datum_Neuer_Preis: Date | null
    Alter_Preis: string | null
    Neuer_Preis: string | null
  }

  export type WarenlieferungCountAggregateOutputType = {
    id: number
    Artikelnummer: number
    Artikelname: number
    Artikelname_alt: number
    Datum_Importiert: number
    Datum_Modifiziert: number
    Datum_Lieferung: number
    Datum_Neu: number
    Datum_Alter_Preis: number
    Datum_Neuer_Preis: number
    Alter_Preis: number
    Neuer_Preis: number
    _all: number
  }


  export type WarenlieferungAvgAggregateInputType = {
    id?: true
  }

  export type WarenlieferungSumAggregateInputType = {
    id?: true
  }

  export type WarenlieferungMinAggregateInputType = {
    id?: true
    Artikelnummer?: true
    Artikelname?: true
    Artikelname_alt?: true
    Datum_Importiert?: true
    Datum_Modifiziert?: true
    Datum_Lieferung?: true
    Datum_Neu?: true
    Datum_Alter_Preis?: true
    Datum_Neuer_Preis?: true
    Alter_Preis?: true
    Neuer_Preis?: true
  }

  export type WarenlieferungMaxAggregateInputType = {
    id?: true
    Artikelnummer?: true
    Artikelname?: true
    Artikelname_alt?: true
    Datum_Importiert?: true
    Datum_Modifiziert?: true
    Datum_Lieferung?: true
    Datum_Neu?: true
    Datum_Alter_Preis?: true
    Datum_Neuer_Preis?: true
    Alter_Preis?: true
    Neuer_Preis?: true
  }

  export type WarenlieferungCountAggregateInputType = {
    id?: true
    Artikelnummer?: true
    Artikelname?: true
    Artikelname_alt?: true
    Datum_Importiert?: true
    Datum_Modifiziert?: true
    Datum_Lieferung?: true
    Datum_Neu?: true
    Datum_Alter_Preis?: true
    Datum_Neuer_Preis?: true
    Alter_Preis?: true
    Neuer_Preis?: true
    _all?: true
  }

  export type WarenlieferungAggregateArgs = {
    /**
     * Filter which warenlieferung to aggregate.
     */
    where?: warenlieferungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warenlieferungs to fetch.
     */
    orderBy?: Enumerable<warenlieferungOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: warenlieferungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warenlieferungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warenlieferungs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned warenlieferungs
    **/
    _count?: true | WarenlieferungCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WarenlieferungAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WarenlieferungSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WarenlieferungMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WarenlieferungMaxAggregateInputType
  }

  export type GetWarenlieferungAggregateType<T extends WarenlieferungAggregateArgs> = {
        [P in keyof T & keyof AggregateWarenlieferung]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWarenlieferung[P]>
      : GetScalarType<T[P], AggregateWarenlieferung[P]>
  }




  export type WarenlieferungGroupByArgs = {
    where?: warenlieferungWhereInput
    orderBy?: Enumerable<warenlieferungOrderByWithAggregationInput>
    by: WarenlieferungScalarFieldEnum[]
    having?: warenlieferungScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WarenlieferungCountAggregateInputType | true
    _avg?: WarenlieferungAvgAggregateInputType
    _sum?: WarenlieferungSumAggregateInputType
    _min?: WarenlieferungMinAggregateInputType
    _max?: WarenlieferungMaxAggregateInputType
  }


  export type WarenlieferungGroupByOutputType = {
    id: number
    Artikelnummer: string
    Artikelname: string
    Artikelname_alt: string | null
    Datum_Importiert: Date | null
    Datum_Modifiziert: Date | null
    Datum_Lieferung: Date | null
    Datum_Neu: Date | null
    Datum_Alter_Preis: Date | null
    Datum_Neuer_Preis: Date | null
    Alter_Preis: string | null
    Neuer_Preis: string | null
    _count: WarenlieferungCountAggregateOutputType | null
    _avg: WarenlieferungAvgAggregateOutputType | null
    _sum: WarenlieferungSumAggregateOutputType | null
    _min: WarenlieferungMinAggregateOutputType | null
    _max: WarenlieferungMaxAggregateOutputType | null
  }

  type GetWarenlieferungGroupByPayload<T extends WarenlieferungGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WarenlieferungGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WarenlieferungGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WarenlieferungGroupByOutputType[P]>
            : GetScalarType<T[P], WarenlieferungGroupByOutputType[P]>
        }
      >
    >


  export type warenlieferungSelect = {
    id?: boolean
    Artikelnummer?: boolean
    Artikelname?: boolean
    Artikelname_alt?: boolean
    Datum_Importiert?: boolean
    Datum_Modifiziert?: boolean
    Datum_Lieferung?: boolean
    Datum_Neu?: boolean
    Datum_Alter_Preis?: boolean
    Datum_Neuer_Preis?: boolean
    Alter_Preis?: boolean
    Neuer_Preis?: boolean
  }


  export type warenlieferungGetPayload<S extends boolean | null | undefined | warenlieferungArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? warenlieferung :
    S extends undefined ? never :
    S extends { include: any } & (warenlieferungArgs | warenlieferungFindManyArgs)
    ? warenlieferung 
    : S extends { select: any } & (warenlieferungArgs | warenlieferungFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof warenlieferung ? warenlieferung[P] : never
  } 
      : warenlieferung


  type warenlieferungCountArgs = 
    Omit<warenlieferungFindManyArgs, 'select' | 'include'> & {
      select?: WarenlieferungCountAggregateInputType | true
    }

  export interface warenlieferungDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Warenlieferung that matches the filter.
     * @param {warenlieferungFindUniqueArgs} args - Arguments to find a Warenlieferung
     * @example
     * // Get one Warenlieferung
     * const warenlieferung = await prisma.warenlieferung.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends warenlieferungFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, warenlieferungFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'warenlieferung'> extends True ? Prisma__warenlieferungClient<warenlieferungGetPayload<T>> : Prisma__warenlieferungClient<warenlieferungGetPayload<T> | null, null>

    /**
     * Find one Warenlieferung that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {warenlieferungFindUniqueOrThrowArgs} args - Arguments to find a Warenlieferung
     * @example
     * // Get one Warenlieferung
     * const warenlieferung = await prisma.warenlieferung.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends warenlieferungFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, warenlieferungFindUniqueOrThrowArgs>
    ): Prisma__warenlieferungClient<warenlieferungGetPayload<T>>

    /**
     * Find the first Warenlieferung that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warenlieferungFindFirstArgs} args - Arguments to find a Warenlieferung
     * @example
     * // Get one Warenlieferung
     * const warenlieferung = await prisma.warenlieferung.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends warenlieferungFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, warenlieferungFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'warenlieferung'> extends True ? Prisma__warenlieferungClient<warenlieferungGetPayload<T>> : Prisma__warenlieferungClient<warenlieferungGetPayload<T> | null, null>

    /**
     * Find the first Warenlieferung that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warenlieferungFindFirstOrThrowArgs} args - Arguments to find a Warenlieferung
     * @example
     * // Get one Warenlieferung
     * const warenlieferung = await prisma.warenlieferung.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends warenlieferungFindFirstOrThrowArgs>(
      args?: SelectSubset<T, warenlieferungFindFirstOrThrowArgs>
    ): Prisma__warenlieferungClient<warenlieferungGetPayload<T>>

    /**
     * Find zero or more Warenlieferungs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warenlieferungFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Warenlieferungs
     * const warenlieferungs = await prisma.warenlieferung.findMany()
     * 
     * // Get first 10 Warenlieferungs
     * const warenlieferungs = await prisma.warenlieferung.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const warenlieferungWithIdOnly = await prisma.warenlieferung.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends warenlieferungFindManyArgs>(
      args?: SelectSubset<T, warenlieferungFindManyArgs>
    ): Prisma.PrismaPromise<Array<warenlieferungGetPayload<T>>>

    /**
     * Create a Warenlieferung.
     * @param {warenlieferungCreateArgs} args - Arguments to create a Warenlieferung.
     * @example
     * // Create one Warenlieferung
     * const Warenlieferung = await prisma.warenlieferung.create({
     *   data: {
     *     // ... data to create a Warenlieferung
     *   }
     * })
     * 
    **/
    create<T extends warenlieferungCreateArgs>(
      args: SelectSubset<T, warenlieferungCreateArgs>
    ): Prisma__warenlieferungClient<warenlieferungGetPayload<T>>

    /**
     * Create many Warenlieferungs.
     *     @param {warenlieferungCreateManyArgs} args - Arguments to create many Warenlieferungs.
     *     @example
     *     // Create many Warenlieferungs
     *     const warenlieferung = await prisma.warenlieferung.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends warenlieferungCreateManyArgs>(
      args?: SelectSubset<T, warenlieferungCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Warenlieferung.
     * @param {warenlieferungDeleteArgs} args - Arguments to delete one Warenlieferung.
     * @example
     * // Delete one Warenlieferung
     * const Warenlieferung = await prisma.warenlieferung.delete({
     *   where: {
     *     // ... filter to delete one Warenlieferung
     *   }
     * })
     * 
    **/
    delete<T extends warenlieferungDeleteArgs>(
      args: SelectSubset<T, warenlieferungDeleteArgs>
    ): Prisma__warenlieferungClient<warenlieferungGetPayload<T>>

    /**
     * Update one Warenlieferung.
     * @param {warenlieferungUpdateArgs} args - Arguments to update one Warenlieferung.
     * @example
     * // Update one Warenlieferung
     * const warenlieferung = await prisma.warenlieferung.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends warenlieferungUpdateArgs>(
      args: SelectSubset<T, warenlieferungUpdateArgs>
    ): Prisma__warenlieferungClient<warenlieferungGetPayload<T>>

    /**
     * Delete zero or more Warenlieferungs.
     * @param {warenlieferungDeleteManyArgs} args - Arguments to filter Warenlieferungs to delete.
     * @example
     * // Delete a few Warenlieferungs
     * const { count } = await prisma.warenlieferung.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends warenlieferungDeleteManyArgs>(
      args?: SelectSubset<T, warenlieferungDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Warenlieferungs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warenlieferungUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Warenlieferungs
     * const warenlieferung = await prisma.warenlieferung.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends warenlieferungUpdateManyArgs>(
      args: SelectSubset<T, warenlieferungUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Warenlieferung.
     * @param {warenlieferungUpsertArgs} args - Arguments to update or create a Warenlieferung.
     * @example
     * // Update or create a Warenlieferung
     * const warenlieferung = await prisma.warenlieferung.upsert({
     *   create: {
     *     // ... data to create a Warenlieferung
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Warenlieferung we want to update
     *   }
     * })
    **/
    upsert<T extends warenlieferungUpsertArgs>(
      args: SelectSubset<T, warenlieferungUpsertArgs>
    ): Prisma__warenlieferungClient<warenlieferungGetPayload<T>>

    /**
     * Count the number of Warenlieferungs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {warenlieferungCountArgs} args - Arguments to filter Warenlieferungs to count.
     * @example
     * // Count the number of Warenlieferungs
     * const count = await prisma.warenlieferung.count({
     *   where: {
     *     // ... the filter for the Warenlieferungs we want to count
     *   }
     * })
    **/
    count<T extends warenlieferungCountArgs>(
      args?: Subset<T, warenlieferungCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WarenlieferungCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Warenlieferung.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarenlieferungAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WarenlieferungAggregateArgs>(args: Subset<T, WarenlieferungAggregateArgs>): Prisma.PrismaPromise<GetWarenlieferungAggregateType<T>>

    /**
     * Group by Warenlieferung.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WarenlieferungGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WarenlieferungGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WarenlieferungGroupByArgs['orderBy'] }
        : { orderBy?: WarenlieferungGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WarenlieferungGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWarenlieferungGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for warenlieferung.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__warenlieferungClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * warenlieferung base type for findUnique actions
   */
  export type warenlieferungFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
    /**
     * Filter, which warenlieferung to fetch.
     */
    where: warenlieferungWhereUniqueInput
  }

  /**
   * warenlieferung findUnique
   */
  export interface warenlieferungFindUniqueArgs extends warenlieferungFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * warenlieferung findUniqueOrThrow
   */
  export type warenlieferungFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
    /**
     * Filter, which warenlieferung to fetch.
     */
    where: warenlieferungWhereUniqueInput
  }


  /**
   * warenlieferung base type for findFirst actions
   */
  export type warenlieferungFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
    /**
     * Filter, which warenlieferung to fetch.
     */
    where?: warenlieferungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warenlieferungs to fetch.
     */
    orderBy?: Enumerable<warenlieferungOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for warenlieferungs.
     */
    cursor?: warenlieferungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warenlieferungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warenlieferungs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of warenlieferungs.
     */
    distinct?: Enumerable<WarenlieferungScalarFieldEnum>
  }

  /**
   * warenlieferung findFirst
   */
  export interface warenlieferungFindFirstArgs extends warenlieferungFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * warenlieferung findFirstOrThrow
   */
  export type warenlieferungFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
    /**
     * Filter, which warenlieferung to fetch.
     */
    where?: warenlieferungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warenlieferungs to fetch.
     */
    orderBy?: Enumerable<warenlieferungOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for warenlieferungs.
     */
    cursor?: warenlieferungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warenlieferungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warenlieferungs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of warenlieferungs.
     */
    distinct?: Enumerable<WarenlieferungScalarFieldEnum>
  }


  /**
   * warenlieferung findMany
   */
  export type warenlieferungFindManyArgs = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
    /**
     * Filter, which warenlieferungs to fetch.
     */
    where?: warenlieferungWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of warenlieferungs to fetch.
     */
    orderBy?: Enumerable<warenlieferungOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing warenlieferungs.
     */
    cursor?: warenlieferungWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` warenlieferungs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` warenlieferungs.
     */
    skip?: number
    distinct?: Enumerable<WarenlieferungScalarFieldEnum>
  }


  /**
   * warenlieferung create
   */
  export type warenlieferungCreateArgs = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
    /**
     * The data needed to create a warenlieferung.
     */
    data: XOR<warenlieferungCreateInput, warenlieferungUncheckedCreateInput>
  }


  /**
   * warenlieferung createMany
   */
  export type warenlieferungCreateManyArgs = {
    /**
     * The data used to create many warenlieferungs.
     */
    data: Enumerable<warenlieferungCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * warenlieferung update
   */
  export type warenlieferungUpdateArgs = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
    /**
     * The data needed to update a warenlieferung.
     */
    data: XOR<warenlieferungUpdateInput, warenlieferungUncheckedUpdateInput>
    /**
     * Choose, which warenlieferung to update.
     */
    where: warenlieferungWhereUniqueInput
  }


  /**
   * warenlieferung updateMany
   */
  export type warenlieferungUpdateManyArgs = {
    /**
     * The data used to update warenlieferungs.
     */
    data: XOR<warenlieferungUpdateManyMutationInput, warenlieferungUncheckedUpdateManyInput>
    /**
     * Filter which warenlieferungs to update
     */
    where?: warenlieferungWhereInput
  }


  /**
   * warenlieferung upsert
   */
  export type warenlieferungUpsertArgs = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
    /**
     * The filter to search for the warenlieferung to update in case it exists.
     */
    where: warenlieferungWhereUniqueInput
    /**
     * In case the warenlieferung found by the `where` argument doesn't exist, create a new warenlieferung with this data.
     */
    create: XOR<warenlieferungCreateInput, warenlieferungUncheckedCreateInput>
    /**
     * In case the warenlieferung was found with the provided `where` argument, update it with this data.
     */
    update: XOR<warenlieferungUpdateInput, warenlieferungUncheckedUpdateInput>
  }


  /**
   * warenlieferung delete
   */
  export type warenlieferungDeleteArgs = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
    /**
     * Filter which warenlieferung to delete.
     */
    where: warenlieferungWhereUniqueInput
  }


  /**
   * warenlieferung deleteMany
   */
  export type warenlieferungDeleteManyArgs = {
    /**
     * Filter which warenlieferungs to delete
     */
    where?: warenlieferungWhereInput
  }


  /**
   * warenlieferung without action
   */
  export type warenlieferungArgs = {
    /**
     * Select specific fields to fetch from the warenlieferung
     */
    select?: warenlieferungSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const MitarbeiterScalarFieldEnum: {
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

  export type MitarbeiterScalarFieldEnum = (typeof MitarbeiterScalarFieldEnum)[keyof typeof MitarbeiterScalarFieldEnum]


  export const PdfsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    body: 'body'
  };

  export type PdfsScalarFieldEnum = (typeof PdfsScalarFieldEnum)[keyof typeof PdfsScalarFieldEnum]


  export const ShortsScalarFieldEnum: {
    id: 'id',
    origin: 'origin',
    short: 'short',
    count: 'count',
    user: 'user'
  };

  export type ShortsScalarFieldEnum = (typeof ShortsScalarFieldEnum)[keyof typeof ShortsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const WarenlieferungScalarFieldEnum: {
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

  export type WarenlieferungScalarFieldEnum = (typeof WarenlieferungScalarFieldEnum)[keyof typeof WarenlieferungScalarFieldEnum]


  export const mitarbeiterOrderByRelevanceFieldEnum: {
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

  export type mitarbeiterOrderByRelevanceFieldEnum = (typeof mitarbeiterOrderByRelevanceFieldEnum)[keyof typeof mitarbeiterOrderByRelevanceFieldEnum]


  export const pdfsOrderByRelevanceFieldEnum: {
    title: 'title',
    body: 'body'
  };

  export type pdfsOrderByRelevanceFieldEnum = (typeof pdfsOrderByRelevanceFieldEnum)[keyof typeof pdfsOrderByRelevanceFieldEnum]


  export const shortsOrderByRelevanceFieldEnum: {
    origin: 'origin',
    short: 'short',
    user: 'user'
  };

  export type shortsOrderByRelevanceFieldEnum = (typeof shortsOrderByRelevanceFieldEnum)[keyof typeof shortsOrderByRelevanceFieldEnum]


  export const warenlieferungOrderByRelevanceFieldEnum: {
    Artikelnummer: 'Artikelnummer',
    Artikelname: 'Artikelname',
    Artikelname_alt: 'Artikelname_alt',
    Alter_Preis: 'Alter_Preis',
    Neuer_Preis: 'Neuer_Preis'
  };

  export type warenlieferungOrderByRelevanceFieldEnum = (typeof warenlieferungOrderByRelevanceFieldEnum)[keyof typeof warenlieferungOrderByRelevanceFieldEnum]


  /**
   * Deep Input Types
   */


  export type mitarbeiterWhereInput = {
    AND?: Enumerable<mitarbeiterWhereInput>
    OR?: Enumerable<mitarbeiterWhereInput>
    NOT?: Enumerable<mitarbeiterWhereInput>
    id?: IntFilter | number
    Name?: StringFilter | string
    Mail?: StringNullableFilter | string | null
    Durchwahl?: StringNullableFilter | string | null
    Telefon1?: StringNullableFilter | string | null
    Telefon2?: StringNullableFilter | string | null
    Mobil?: StringNullableFilter | string | null
    Einkauf?: StringNullableFilter | string | null
    Geld?: StringNullableFilter | string | null
    Pfand?: StringNullableFilter | string | null
    Bild1?: StringNullableFilter | string | null
    Bild2?: StringNullableFilter | string | null
    Bild3?: StringNullableFilter | string | null
    Bild1Type?: StringNullableFilter | string | null
    Bild2Type?: StringNullableFilter | string | null
    Bild3Type?: StringNullableFilter | string | null
    Kurz?: StringNullableFilter | string | null
    isAzubi?: IntFilter | number
    HomeOffice?: StringNullableFilter | string | null
    Datum?: DateTimeNullableFilter | Date | string | null
    Abonniert?: IntNullableFilter | number | null
  }

  export type mitarbeiterOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    Name?: SortOrder
    Mail?: SortOrder
    Durchwahl?: SortOrder
    Telefon1?: SortOrder
    Telefon2?: SortOrder
    Mobil?: SortOrder
    Einkauf?: SortOrder
    Geld?: SortOrder
    Pfand?: SortOrder
    Bild1?: SortOrder
    Bild2?: SortOrder
    Bild3?: SortOrder
    Bild1Type?: SortOrder
    Bild2Type?: SortOrder
    Bild3Type?: SortOrder
    Kurz?: SortOrder
    isAzubi?: SortOrder
    HomeOffice?: SortOrder
    Datum?: SortOrder
    Abonniert?: SortOrder
    _relevance?: mitarbeiterOrderByRelevanceInput
  }

  export type mitarbeiterWhereUniqueInput = {
    id?: number
  }

  export type mitarbeiterOrderByWithAggregationInput = {
    id?: SortOrder
    Name?: SortOrder
    Mail?: SortOrder
    Durchwahl?: SortOrder
    Telefon1?: SortOrder
    Telefon2?: SortOrder
    Mobil?: SortOrder
    Einkauf?: SortOrder
    Geld?: SortOrder
    Pfand?: SortOrder
    Bild1?: SortOrder
    Bild2?: SortOrder
    Bild3?: SortOrder
    Bild1Type?: SortOrder
    Bild2Type?: SortOrder
    Bild3Type?: SortOrder
    Kurz?: SortOrder
    isAzubi?: SortOrder
    HomeOffice?: SortOrder
    Datum?: SortOrder
    Abonniert?: SortOrder
    _count?: mitarbeiterCountOrderByAggregateInput
    _avg?: mitarbeiterAvgOrderByAggregateInput
    _max?: mitarbeiterMaxOrderByAggregateInput
    _min?: mitarbeiterMinOrderByAggregateInput
    _sum?: mitarbeiterSumOrderByAggregateInput
  }

  export type mitarbeiterScalarWhereWithAggregatesInput = {
    AND?: Enumerable<mitarbeiterScalarWhereWithAggregatesInput>
    OR?: Enumerable<mitarbeiterScalarWhereWithAggregatesInput>
    NOT?: Enumerable<mitarbeiterScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    Name?: StringWithAggregatesFilter | string
    Mail?: StringNullableWithAggregatesFilter | string | null
    Durchwahl?: StringNullableWithAggregatesFilter | string | null
    Telefon1?: StringNullableWithAggregatesFilter | string | null
    Telefon2?: StringNullableWithAggregatesFilter | string | null
    Mobil?: StringNullableWithAggregatesFilter | string | null
    Einkauf?: StringNullableWithAggregatesFilter | string | null
    Geld?: StringNullableWithAggregatesFilter | string | null
    Pfand?: StringNullableWithAggregatesFilter | string | null
    Bild1?: StringNullableWithAggregatesFilter | string | null
    Bild2?: StringNullableWithAggregatesFilter | string | null
    Bild3?: StringNullableWithAggregatesFilter | string | null
    Bild1Type?: StringNullableWithAggregatesFilter | string | null
    Bild2Type?: StringNullableWithAggregatesFilter | string | null
    Bild3Type?: StringNullableWithAggregatesFilter | string | null
    Kurz?: StringNullableWithAggregatesFilter | string | null
    isAzubi?: IntWithAggregatesFilter | number
    HomeOffice?: StringNullableWithAggregatesFilter | string | null
    Datum?: DateTimeNullableWithAggregatesFilter | Date | string | null
    Abonniert?: IntNullableWithAggregatesFilter | number | null
  }

  export type pdfsWhereInput = {
    AND?: Enumerable<pdfsWhereInput>
    OR?: Enumerable<pdfsWhereInput>
    NOT?: Enumerable<pdfsWhereInput>
    id?: IntFilter | number
    title?: StringFilter | string
    body?: StringFilter | string
  }

  export type pdfsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    _relevance?: pdfsOrderByRelevanceInput
  }

  export type pdfsWhereUniqueInput = {
    id?: number
  }

  export type pdfsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    _count?: pdfsCountOrderByAggregateInput
    _avg?: pdfsAvgOrderByAggregateInput
    _max?: pdfsMaxOrderByAggregateInput
    _min?: pdfsMinOrderByAggregateInput
    _sum?: pdfsSumOrderByAggregateInput
  }

  export type pdfsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<pdfsScalarWhereWithAggregatesInput>
    OR?: Enumerable<pdfsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<pdfsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    title?: StringWithAggregatesFilter | string
    body?: StringWithAggregatesFilter | string
  }

  export type shortsWhereInput = {
    AND?: Enumerable<shortsWhereInput>
    OR?: Enumerable<shortsWhereInput>
    NOT?: Enumerable<shortsWhereInput>
    id?: IntFilter | number
    origin?: StringFilter | string
    short?: StringFilter | string
    count?: IntNullableFilter | number | null
    user?: StringFilter | string
  }

  export type shortsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    origin?: SortOrder
    short?: SortOrder
    count?: SortOrder
    user?: SortOrder
    _relevance?: shortsOrderByRelevanceInput
  }

  export type shortsWhereUniqueInput = {
    id?: number
    short?: string
  }

  export type shortsOrderByWithAggregationInput = {
    id?: SortOrder
    origin?: SortOrder
    short?: SortOrder
    count?: SortOrder
    user?: SortOrder
    _count?: shortsCountOrderByAggregateInput
    _avg?: shortsAvgOrderByAggregateInput
    _max?: shortsMaxOrderByAggregateInput
    _min?: shortsMinOrderByAggregateInput
    _sum?: shortsSumOrderByAggregateInput
  }

  export type shortsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<shortsScalarWhereWithAggregatesInput>
    OR?: Enumerable<shortsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<shortsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    origin?: StringWithAggregatesFilter | string
    short?: StringWithAggregatesFilter | string
    count?: IntNullableWithAggregatesFilter | number | null
    user?: StringWithAggregatesFilter | string
  }

  export type warenlieferungWhereInput = {
    AND?: Enumerable<warenlieferungWhereInput>
    OR?: Enumerable<warenlieferungWhereInput>
    NOT?: Enumerable<warenlieferungWhereInput>
    id?: IntFilter | number
    Artikelnummer?: StringFilter | string
    Artikelname?: StringFilter | string
    Artikelname_alt?: StringNullableFilter | string | null
    Datum_Importiert?: DateTimeNullableFilter | Date | string | null
    Datum_Modifiziert?: DateTimeNullableFilter | Date | string | null
    Datum_Lieferung?: DateTimeNullableFilter | Date | string | null
    Datum_Neu?: DateTimeNullableFilter | Date | string | null
    Datum_Alter_Preis?: DateTimeNullableFilter | Date | string | null
    Datum_Neuer_Preis?: DateTimeNullableFilter | Date | string | null
    Alter_Preis?: StringNullableFilter | string | null
    Neuer_Preis?: StringNullableFilter | string | null
  }

  export type warenlieferungOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    Artikelnummer?: SortOrder
    Artikelname?: SortOrder
    Artikelname_alt?: SortOrder
    Datum_Importiert?: SortOrder
    Datum_Modifiziert?: SortOrder
    Datum_Lieferung?: SortOrder
    Datum_Neu?: SortOrder
    Datum_Alter_Preis?: SortOrder
    Datum_Neuer_Preis?: SortOrder
    Alter_Preis?: SortOrder
    Neuer_Preis?: SortOrder
    _relevance?: warenlieferungOrderByRelevanceInput
  }

  export type warenlieferungWhereUniqueInput = {
    id?: number
  }

  export type warenlieferungOrderByWithAggregationInput = {
    id?: SortOrder
    Artikelnummer?: SortOrder
    Artikelname?: SortOrder
    Artikelname_alt?: SortOrder
    Datum_Importiert?: SortOrder
    Datum_Modifiziert?: SortOrder
    Datum_Lieferung?: SortOrder
    Datum_Neu?: SortOrder
    Datum_Alter_Preis?: SortOrder
    Datum_Neuer_Preis?: SortOrder
    Alter_Preis?: SortOrder
    Neuer_Preis?: SortOrder
    _count?: warenlieferungCountOrderByAggregateInput
    _avg?: warenlieferungAvgOrderByAggregateInput
    _max?: warenlieferungMaxOrderByAggregateInput
    _min?: warenlieferungMinOrderByAggregateInput
    _sum?: warenlieferungSumOrderByAggregateInput
  }

  export type warenlieferungScalarWhereWithAggregatesInput = {
    AND?: Enumerable<warenlieferungScalarWhereWithAggregatesInput>
    OR?: Enumerable<warenlieferungScalarWhereWithAggregatesInput>
    NOT?: Enumerable<warenlieferungScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    Artikelnummer?: StringWithAggregatesFilter | string
    Artikelname?: StringWithAggregatesFilter | string
    Artikelname_alt?: StringNullableWithAggregatesFilter | string | null
    Datum_Importiert?: DateTimeNullableWithAggregatesFilter | Date | string | null
    Datum_Modifiziert?: DateTimeNullableWithAggregatesFilter | Date | string | null
    Datum_Lieferung?: DateTimeNullableWithAggregatesFilter | Date | string | null
    Datum_Neu?: DateTimeNullableWithAggregatesFilter | Date | string | null
    Datum_Alter_Preis?: DateTimeNullableWithAggregatesFilter | Date | string | null
    Datum_Neuer_Preis?: DateTimeNullableWithAggregatesFilter | Date | string | null
    Alter_Preis?: StringNullableWithAggregatesFilter | string | null
    Neuer_Preis?: StringNullableWithAggregatesFilter | string | null
  }

  export type mitarbeiterCreateInput = {
    Name: string
    Mail?: string | null
    Durchwahl?: string | null
    Telefon1?: string | null
    Telefon2?: string | null
    Mobil?: string | null
    Einkauf?: string | null
    Geld?: string | null
    Pfand?: string | null
    Bild1?: string | null
    Bild2?: string | null
    Bild3?: string | null
    Bild1Type?: string | null
    Bild2Type?: string | null
    Bild3Type?: string | null
    Kurz?: string | null
    isAzubi: number
    HomeOffice?: string | null
    Datum?: Date | string | null
    Abonniert?: number | null
  }

  export type mitarbeiterUncheckedCreateInput = {
    id?: number
    Name: string
    Mail?: string | null
    Durchwahl?: string | null
    Telefon1?: string | null
    Telefon2?: string | null
    Mobil?: string | null
    Einkauf?: string | null
    Geld?: string | null
    Pfand?: string | null
    Bild1?: string | null
    Bild2?: string | null
    Bild3?: string | null
    Bild1Type?: string | null
    Bild2Type?: string | null
    Bild3Type?: string | null
    Kurz?: string | null
    isAzubi: number
    HomeOffice?: string | null
    Datum?: Date | string | null
    Abonniert?: number | null
  }

  export type mitarbeiterUpdateInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Mail?: NullableStringFieldUpdateOperationsInput | string | null
    Durchwahl?: NullableStringFieldUpdateOperationsInput | string | null
    Telefon1?: NullableStringFieldUpdateOperationsInput | string | null
    Telefon2?: NullableStringFieldUpdateOperationsInput | string | null
    Mobil?: NullableStringFieldUpdateOperationsInput | string | null
    Einkauf?: NullableStringFieldUpdateOperationsInput | string | null
    Geld?: NullableStringFieldUpdateOperationsInput | string | null
    Pfand?: NullableStringFieldUpdateOperationsInput | string | null
    Bild1?: NullableStringFieldUpdateOperationsInput | string | null
    Bild2?: NullableStringFieldUpdateOperationsInput | string | null
    Bild3?: NullableStringFieldUpdateOperationsInput | string | null
    Bild1Type?: NullableStringFieldUpdateOperationsInput | string | null
    Bild2Type?: NullableStringFieldUpdateOperationsInput | string | null
    Bild3Type?: NullableStringFieldUpdateOperationsInput | string | null
    Kurz?: NullableStringFieldUpdateOperationsInput | string | null
    isAzubi?: IntFieldUpdateOperationsInput | number
    HomeOffice?: NullableStringFieldUpdateOperationsInput | string | null
    Datum?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Abonniert?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type mitarbeiterUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Mail?: NullableStringFieldUpdateOperationsInput | string | null
    Durchwahl?: NullableStringFieldUpdateOperationsInput | string | null
    Telefon1?: NullableStringFieldUpdateOperationsInput | string | null
    Telefon2?: NullableStringFieldUpdateOperationsInput | string | null
    Mobil?: NullableStringFieldUpdateOperationsInput | string | null
    Einkauf?: NullableStringFieldUpdateOperationsInput | string | null
    Geld?: NullableStringFieldUpdateOperationsInput | string | null
    Pfand?: NullableStringFieldUpdateOperationsInput | string | null
    Bild1?: NullableStringFieldUpdateOperationsInput | string | null
    Bild2?: NullableStringFieldUpdateOperationsInput | string | null
    Bild3?: NullableStringFieldUpdateOperationsInput | string | null
    Bild1Type?: NullableStringFieldUpdateOperationsInput | string | null
    Bild2Type?: NullableStringFieldUpdateOperationsInput | string | null
    Bild3Type?: NullableStringFieldUpdateOperationsInput | string | null
    Kurz?: NullableStringFieldUpdateOperationsInput | string | null
    isAzubi?: IntFieldUpdateOperationsInput | number
    HomeOffice?: NullableStringFieldUpdateOperationsInput | string | null
    Datum?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Abonniert?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type mitarbeiterCreateManyInput = {
    id?: number
    Name: string
    Mail?: string | null
    Durchwahl?: string | null
    Telefon1?: string | null
    Telefon2?: string | null
    Mobil?: string | null
    Einkauf?: string | null
    Geld?: string | null
    Pfand?: string | null
    Bild1?: string | null
    Bild2?: string | null
    Bild3?: string | null
    Bild1Type?: string | null
    Bild2Type?: string | null
    Bild3Type?: string | null
    Kurz?: string | null
    isAzubi: number
    HomeOffice?: string | null
    Datum?: Date | string | null
    Abonniert?: number | null
  }

  export type mitarbeiterUpdateManyMutationInput = {
    Name?: StringFieldUpdateOperationsInput | string
    Mail?: NullableStringFieldUpdateOperationsInput | string | null
    Durchwahl?: NullableStringFieldUpdateOperationsInput | string | null
    Telefon1?: NullableStringFieldUpdateOperationsInput | string | null
    Telefon2?: NullableStringFieldUpdateOperationsInput | string | null
    Mobil?: NullableStringFieldUpdateOperationsInput | string | null
    Einkauf?: NullableStringFieldUpdateOperationsInput | string | null
    Geld?: NullableStringFieldUpdateOperationsInput | string | null
    Pfand?: NullableStringFieldUpdateOperationsInput | string | null
    Bild1?: NullableStringFieldUpdateOperationsInput | string | null
    Bild2?: NullableStringFieldUpdateOperationsInput | string | null
    Bild3?: NullableStringFieldUpdateOperationsInput | string | null
    Bild1Type?: NullableStringFieldUpdateOperationsInput | string | null
    Bild2Type?: NullableStringFieldUpdateOperationsInput | string | null
    Bild3Type?: NullableStringFieldUpdateOperationsInput | string | null
    Kurz?: NullableStringFieldUpdateOperationsInput | string | null
    isAzubi?: IntFieldUpdateOperationsInput | number
    HomeOffice?: NullableStringFieldUpdateOperationsInput | string | null
    Datum?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Abonniert?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type mitarbeiterUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    Name?: StringFieldUpdateOperationsInput | string
    Mail?: NullableStringFieldUpdateOperationsInput | string | null
    Durchwahl?: NullableStringFieldUpdateOperationsInput | string | null
    Telefon1?: NullableStringFieldUpdateOperationsInput | string | null
    Telefon2?: NullableStringFieldUpdateOperationsInput | string | null
    Mobil?: NullableStringFieldUpdateOperationsInput | string | null
    Einkauf?: NullableStringFieldUpdateOperationsInput | string | null
    Geld?: NullableStringFieldUpdateOperationsInput | string | null
    Pfand?: NullableStringFieldUpdateOperationsInput | string | null
    Bild1?: NullableStringFieldUpdateOperationsInput | string | null
    Bild2?: NullableStringFieldUpdateOperationsInput | string | null
    Bild3?: NullableStringFieldUpdateOperationsInput | string | null
    Bild1Type?: NullableStringFieldUpdateOperationsInput | string | null
    Bild2Type?: NullableStringFieldUpdateOperationsInput | string | null
    Bild3Type?: NullableStringFieldUpdateOperationsInput | string | null
    Kurz?: NullableStringFieldUpdateOperationsInput | string | null
    isAzubi?: IntFieldUpdateOperationsInput | number
    HomeOffice?: NullableStringFieldUpdateOperationsInput | string | null
    Datum?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Abonniert?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type pdfsCreateInput = {
    title: string
    body: string
  }

  export type pdfsUncheckedCreateInput = {
    id?: number
    title: string
    body: string
  }

  export type pdfsUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
  }

  export type pdfsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
  }

  export type pdfsCreateManyInput = {
    id?: number
    title: string
    body: string
  }

  export type pdfsUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
  }

  export type pdfsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
  }

  export type shortsCreateInput = {
    origin: string
    short: string
    count?: number | null
    user: string
  }

  export type shortsUncheckedCreateInput = {
    id?: number
    origin: string
    short: string
    count?: number | null
    user: string
  }

  export type shortsUpdateInput = {
    origin?: StringFieldUpdateOperationsInput | string
    short?: StringFieldUpdateOperationsInput | string
    count?: NullableIntFieldUpdateOperationsInput | number | null
    user?: StringFieldUpdateOperationsInput | string
  }

  export type shortsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    origin?: StringFieldUpdateOperationsInput | string
    short?: StringFieldUpdateOperationsInput | string
    count?: NullableIntFieldUpdateOperationsInput | number | null
    user?: StringFieldUpdateOperationsInput | string
  }

  export type shortsCreateManyInput = {
    id?: number
    origin: string
    short: string
    count?: number | null
    user: string
  }

  export type shortsUpdateManyMutationInput = {
    origin?: StringFieldUpdateOperationsInput | string
    short?: StringFieldUpdateOperationsInput | string
    count?: NullableIntFieldUpdateOperationsInput | number | null
    user?: StringFieldUpdateOperationsInput | string
  }

  export type shortsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    origin?: StringFieldUpdateOperationsInput | string
    short?: StringFieldUpdateOperationsInput | string
    count?: NullableIntFieldUpdateOperationsInput | number | null
    user?: StringFieldUpdateOperationsInput | string
  }

  export type warenlieferungCreateInput = {
    id: number
    Artikelnummer: string
    Artikelname: string
    Artikelname_alt?: string | null
    Datum_Importiert?: Date | string | null
    Datum_Modifiziert?: Date | string | null
    Datum_Lieferung?: Date | string | null
    Datum_Neu?: Date | string | null
    Datum_Alter_Preis?: Date | string | null
    Datum_Neuer_Preis?: Date | string | null
    Alter_Preis?: string | null
    Neuer_Preis?: string | null
  }

  export type warenlieferungUncheckedCreateInput = {
    id: number
    Artikelnummer: string
    Artikelname: string
    Artikelname_alt?: string | null
    Datum_Importiert?: Date | string | null
    Datum_Modifiziert?: Date | string | null
    Datum_Lieferung?: Date | string | null
    Datum_Neu?: Date | string | null
    Datum_Alter_Preis?: Date | string | null
    Datum_Neuer_Preis?: Date | string | null
    Alter_Preis?: string | null
    Neuer_Preis?: string | null
  }

  export type warenlieferungUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    Artikelnummer?: StringFieldUpdateOperationsInput | string
    Artikelname?: StringFieldUpdateOperationsInput | string
    Artikelname_alt?: NullableStringFieldUpdateOperationsInput | string | null
    Datum_Importiert?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Modifiziert?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Lieferung?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Neu?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Alter_Preis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Neuer_Preis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Alter_Preis?: NullableStringFieldUpdateOperationsInput | string | null
    Neuer_Preis?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type warenlieferungUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    Artikelnummer?: StringFieldUpdateOperationsInput | string
    Artikelname?: StringFieldUpdateOperationsInput | string
    Artikelname_alt?: NullableStringFieldUpdateOperationsInput | string | null
    Datum_Importiert?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Modifiziert?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Lieferung?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Neu?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Alter_Preis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Neuer_Preis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Alter_Preis?: NullableStringFieldUpdateOperationsInput | string | null
    Neuer_Preis?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type warenlieferungCreateManyInput = {
    id: number
    Artikelnummer: string
    Artikelname: string
    Artikelname_alt?: string | null
    Datum_Importiert?: Date | string | null
    Datum_Modifiziert?: Date | string | null
    Datum_Lieferung?: Date | string | null
    Datum_Neu?: Date | string | null
    Datum_Alter_Preis?: Date | string | null
    Datum_Neuer_Preis?: Date | string | null
    Alter_Preis?: string | null
    Neuer_Preis?: string | null
  }

  export type warenlieferungUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    Artikelnummer?: StringFieldUpdateOperationsInput | string
    Artikelname?: StringFieldUpdateOperationsInput | string
    Artikelname_alt?: NullableStringFieldUpdateOperationsInput | string | null
    Datum_Importiert?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Modifiziert?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Lieferung?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Neu?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Alter_Preis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Neuer_Preis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Alter_Preis?: NullableStringFieldUpdateOperationsInput | string | null
    Neuer_Preis?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type warenlieferungUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    Artikelnummer?: StringFieldUpdateOperationsInput | string
    Artikelname?: StringFieldUpdateOperationsInput | string
    Artikelname_alt?: NullableStringFieldUpdateOperationsInput | string | null
    Datum_Importiert?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Modifiziert?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Lieferung?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Neu?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Alter_Preis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Datum_Neuer_Preis?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    Alter_Preis?: NullableStringFieldUpdateOperationsInput | string | null
    Neuer_Preis?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type mitarbeiterOrderByRelevanceInput = {
    fields: Enumerable<mitarbeiterOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type mitarbeiterCountOrderByAggregateInput = {
    id?: SortOrder
    Name?: SortOrder
    Mail?: SortOrder
    Durchwahl?: SortOrder
    Telefon1?: SortOrder
    Telefon2?: SortOrder
    Mobil?: SortOrder
    Einkauf?: SortOrder
    Geld?: SortOrder
    Pfand?: SortOrder
    Bild1?: SortOrder
    Bild2?: SortOrder
    Bild3?: SortOrder
    Bild1Type?: SortOrder
    Bild2Type?: SortOrder
    Bild3Type?: SortOrder
    Kurz?: SortOrder
    isAzubi?: SortOrder
    HomeOffice?: SortOrder
    Datum?: SortOrder
    Abonniert?: SortOrder
  }

  export type mitarbeiterAvgOrderByAggregateInput = {
    id?: SortOrder
    isAzubi?: SortOrder
    Abonniert?: SortOrder
  }

  export type mitarbeiterMaxOrderByAggregateInput = {
    id?: SortOrder
    Name?: SortOrder
    Mail?: SortOrder
    Durchwahl?: SortOrder
    Telefon1?: SortOrder
    Telefon2?: SortOrder
    Mobil?: SortOrder
    Einkauf?: SortOrder
    Geld?: SortOrder
    Pfand?: SortOrder
    Bild1?: SortOrder
    Bild2?: SortOrder
    Bild3?: SortOrder
    Bild1Type?: SortOrder
    Bild2Type?: SortOrder
    Bild3Type?: SortOrder
    Kurz?: SortOrder
    isAzubi?: SortOrder
    HomeOffice?: SortOrder
    Datum?: SortOrder
    Abonniert?: SortOrder
  }

  export type mitarbeiterMinOrderByAggregateInput = {
    id?: SortOrder
    Name?: SortOrder
    Mail?: SortOrder
    Durchwahl?: SortOrder
    Telefon1?: SortOrder
    Telefon2?: SortOrder
    Mobil?: SortOrder
    Einkauf?: SortOrder
    Geld?: SortOrder
    Pfand?: SortOrder
    Bild1?: SortOrder
    Bild2?: SortOrder
    Bild3?: SortOrder
    Bild1Type?: SortOrder
    Bild2Type?: SortOrder
    Bild3Type?: SortOrder
    Kurz?: SortOrder
    isAzubi?: SortOrder
    HomeOffice?: SortOrder
    Datum?: SortOrder
    Abonniert?: SortOrder
  }

  export type mitarbeiterSumOrderByAggregateInput = {
    id?: SortOrder
    isAzubi?: SortOrder
    Abonniert?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type pdfsOrderByRelevanceInput = {
    fields: Enumerable<pdfsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type pdfsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
  }

  export type pdfsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type pdfsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
  }

  export type pdfsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
  }

  export type pdfsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type shortsOrderByRelevanceInput = {
    fields: Enumerable<shortsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type shortsCountOrderByAggregateInput = {
    id?: SortOrder
    origin?: SortOrder
    short?: SortOrder
    count?: SortOrder
    user?: SortOrder
  }

  export type shortsAvgOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
  }

  export type shortsMaxOrderByAggregateInput = {
    id?: SortOrder
    origin?: SortOrder
    short?: SortOrder
    count?: SortOrder
    user?: SortOrder
  }

  export type shortsMinOrderByAggregateInput = {
    id?: SortOrder
    origin?: SortOrder
    short?: SortOrder
    count?: SortOrder
    user?: SortOrder
  }

  export type shortsSumOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
  }

  export type warenlieferungOrderByRelevanceInput = {
    fields: Enumerable<warenlieferungOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type warenlieferungCountOrderByAggregateInput = {
    id?: SortOrder
    Artikelnummer?: SortOrder
    Artikelname?: SortOrder
    Artikelname_alt?: SortOrder
    Datum_Importiert?: SortOrder
    Datum_Modifiziert?: SortOrder
    Datum_Lieferung?: SortOrder
    Datum_Neu?: SortOrder
    Datum_Alter_Preis?: SortOrder
    Datum_Neuer_Preis?: SortOrder
    Alter_Preis?: SortOrder
    Neuer_Preis?: SortOrder
  }

  export type warenlieferungAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type warenlieferungMaxOrderByAggregateInput = {
    id?: SortOrder
    Artikelnummer?: SortOrder
    Artikelname?: SortOrder
    Artikelname_alt?: SortOrder
    Datum_Importiert?: SortOrder
    Datum_Modifiziert?: SortOrder
    Datum_Lieferung?: SortOrder
    Datum_Neu?: SortOrder
    Datum_Alter_Preis?: SortOrder
    Datum_Neuer_Preis?: SortOrder
    Alter_Preis?: SortOrder
    Neuer_Preis?: SortOrder
  }

  export type warenlieferungMinOrderByAggregateInput = {
    id?: SortOrder
    Artikelnummer?: SortOrder
    Artikelname?: SortOrder
    Artikelname_alt?: SortOrder
    Datum_Importiert?: SortOrder
    Datum_Modifiziert?: SortOrder
    Datum_Lieferung?: SortOrder
    Datum_Neu?: SortOrder
    Datum_Alter_Preis?: SortOrder
    Datum_Neuer_Preis?: SortOrder
    Alter_Preis?: SortOrder
    Neuer_Preis?: SortOrder
  }

  export type warenlieferungSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}