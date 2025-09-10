
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model NAMASTECode
 * 
 */
export type NAMASTECode = $Result.DefaultSelection<Prisma.$NAMASTECodePayload>
/**
 * Model ProcessingStats
 * 
 */
export type ProcessingStats = $Result.DefaultSelection<Prisma.$ProcessingStatsPayload>
/**
 * Model WHOCode
 * 
 */
export type WHOCode = $Result.DefaultSelection<Prisma.$WHOCodePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more NAMASTECodes
 * const nAMASTECodes = await prisma.nAMASTECode.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more NAMASTECodes
   * const nAMASTECodes = await prisma.nAMASTECode.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.nAMASTECode`: Exposes CRUD operations for the **NAMASTECode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NAMASTECodes
    * const nAMASTECodes = await prisma.nAMASTECode.findMany()
    * ```
    */
  get nAMASTECode(): Prisma.NAMASTECodeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.processingStats`: Exposes CRUD operations for the **ProcessingStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessingStats
    * const processingStats = await prisma.processingStats.findMany()
    * ```
    */
  get processingStats(): Prisma.ProcessingStatsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.wHOCode`: Exposes CRUD operations for the **WHOCode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WHOCodes
    * const wHOCodes = await prisma.wHOCode.findMany()
    * ```
    */
  get wHOCode(): Prisma.WHOCodeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    NAMASTECode: 'NAMASTECode',
    ProcessingStats: 'ProcessingStats',
    WHOCode: 'WHOCode'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "nAMASTECode" | "processingStats" | "wHOCode"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      NAMASTECode: {
        payload: Prisma.$NAMASTECodePayload<ExtArgs>
        fields: Prisma.NAMASTECodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NAMASTECodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NAMASTECodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload>
          }
          findFirst: {
            args: Prisma.NAMASTECodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NAMASTECodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload>
          }
          findMany: {
            args: Prisma.NAMASTECodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload>[]
          }
          create: {
            args: Prisma.NAMASTECodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload>
          }
          createMany: {
            args: Prisma.NAMASTECodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NAMASTECodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload>[]
          }
          delete: {
            args: Prisma.NAMASTECodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload>
          }
          update: {
            args: Prisma.NAMASTECodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload>
          }
          deleteMany: {
            args: Prisma.NAMASTECodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NAMASTECodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NAMASTECodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload>[]
          }
          upsert: {
            args: Prisma.NAMASTECodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NAMASTECodePayload>
          }
          aggregate: {
            args: Prisma.NAMASTECodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNAMASTECode>
          }
          groupBy: {
            args: Prisma.NAMASTECodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<NAMASTECodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.NAMASTECodeCountArgs<ExtArgs>
            result: $Utils.Optional<NAMASTECodeCountAggregateOutputType> | number
          }
        }
      }
      ProcessingStats: {
        payload: Prisma.$ProcessingStatsPayload<ExtArgs>
        fields: Prisma.ProcessingStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessingStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessingStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload>
          }
          findFirst: {
            args: Prisma.ProcessingStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessingStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload>
          }
          findMany: {
            args: Prisma.ProcessingStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload>[]
          }
          create: {
            args: Prisma.ProcessingStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload>
          }
          createMany: {
            args: Prisma.ProcessingStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessingStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload>[]
          }
          delete: {
            args: Prisma.ProcessingStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload>
          }
          update: {
            args: Prisma.ProcessingStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload>
          }
          deleteMany: {
            args: Prisma.ProcessingStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessingStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProcessingStatsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload>[]
          }
          upsert: {
            args: Prisma.ProcessingStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingStatsPayload>
          }
          aggregate: {
            args: Prisma.ProcessingStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessingStats>
          }
          groupBy: {
            args: Prisma.ProcessingStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessingStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessingStatsCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessingStatsCountAggregateOutputType> | number
          }
        }
      }
      WHOCode: {
        payload: Prisma.$WHOCodePayload<ExtArgs>
        fields: Prisma.WHOCodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WHOCodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WHOCodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload>
          }
          findFirst: {
            args: Prisma.WHOCodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WHOCodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload>
          }
          findMany: {
            args: Prisma.WHOCodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload>[]
          }
          create: {
            args: Prisma.WHOCodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload>
          }
          createMany: {
            args: Prisma.WHOCodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WHOCodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload>[]
          }
          delete: {
            args: Prisma.WHOCodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload>
          }
          update: {
            args: Prisma.WHOCodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload>
          }
          deleteMany: {
            args: Prisma.WHOCodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WHOCodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WHOCodeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload>[]
          }
          upsert: {
            args: Prisma.WHOCodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WHOCodePayload>
          }
          aggregate: {
            args: Prisma.WHOCodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWHOCode>
          }
          groupBy: {
            args: Prisma.WHOCodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<WHOCodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.WHOCodeCountArgs<ExtArgs>
            result: $Utils.Optional<WHOCodeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    nAMASTECode?: NAMASTECodeOmit
    processingStats?: ProcessingStatsOmit
    wHOCode?: WHOCodeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

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
   * Model NAMASTECode
   */

  export type AggregateNAMASTECode = {
    _count: NAMASTECodeCountAggregateOutputType | null
    _min: NAMASTECodeMinAggregateOutputType | null
    _max: NAMASTECodeMaxAggregateOutputType | null
  }

  export type NAMASTECodeMinAggregateOutputType = {
    id: string | null
    code: string | null
    display: string | null
    definition: string | null
    system: string | null
    language: string | null
    parent: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NAMASTECodeMaxAggregateOutputType = {
    id: string | null
    code: string | null
    display: string | null
    definition: string | null
    system: string | null
    language: string | null
    parent: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NAMASTECodeCountAggregateOutputType = {
    id: number
    code: number
    display: number
    definition: number
    system: number
    language: number
    synonyms: number
    parent: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NAMASTECodeMinAggregateInputType = {
    id?: true
    code?: true
    display?: true
    definition?: true
    system?: true
    language?: true
    parent?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NAMASTECodeMaxAggregateInputType = {
    id?: true
    code?: true
    display?: true
    definition?: true
    system?: true
    language?: true
    parent?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NAMASTECodeCountAggregateInputType = {
    id?: true
    code?: true
    display?: true
    definition?: true
    system?: true
    language?: true
    synonyms?: true
    parent?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NAMASTECodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NAMASTECode to aggregate.
     */
    where?: NAMASTECodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NAMASTECodes to fetch.
     */
    orderBy?: NAMASTECodeOrderByWithRelationInput | NAMASTECodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NAMASTECodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NAMASTECodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NAMASTECodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NAMASTECodes
    **/
    _count?: true | NAMASTECodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NAMASTECodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NAMASTECodeMaxAggregateInputType
  }

  export type GetNAMASTECodeAggregateType<T extends NAMASTECodeAggregateArgs> = {
        [P in keyof T & keyof AggregateNAMASTECode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNAMASTECode[P]>
      : GetScalarType<T[P], AggregateNAMASTECode[P]>
  }




  export type NAMASTECodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NAMASTECodeWhereInput
    orderBy?: NAMASTECodeOrderByWithAggregationInput | NAMASTECodeOrderByWithAggregationInput[]
    by: NAMASTECodeScalarFieldEnum[] | NAMASTECodeScalarFieldEnum
    having?: NAMASTECodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NAMASTECodeCountAggregateInputType | true
    _min?: NAMASTECodeMinAggregateInputType
    _max?: NAMASTECodeMaxAggregateInputType
  }

  export type NAMASTECodeGroupByOutputType = {
    id: string
    code: string
    display: string
    definition: string | null
    system: string
    language: string
    synonyms: string[]
    parent: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: NAMASTECodeCountAggregateOutputType | null
    _min: NAMASTECodeMinAggregateOutputType | null
    _max: NAMASTECodeMaxAggregateOutputType | null
  }

  type GetNAMASTECodeGroupByPayload<T extends NAMASTECodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NAMASTECodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NAMASTECodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NAMASTECodeGroupByOutputType[P]>
            : GetScalarType<T[P], NAMASTECodeGroupByOutputType[P]>
        }
      >
    >


  export type NAMASTECodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    display?: boolean
    definition?: boolean
    system?: boolean
    language?: boolean
    synonyms?: boolean
    parent?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["nAMASTECode"]>

  export type NAMASTECodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    display?: boolean
    definition?: boolean
    system?: boolean
    language?: boolean
    synonyms?: boolean
    parent?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["nAMASTECode"]>

  export type NAMASTECodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    display?: boolean
    definition?: boolean
    system?: boolean
    language?: boolean
    synonyms?: boolean
    parent?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["nAMASTECode"]>

  export type NAMASTECodeSelectScalar = {
    id?: boolean
    code?: boolean
    display?: boolean
    definition?: boolean
    system?: boolean
    language?: boolean
    synonyms?: boolean
    parent?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NAMASTECodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "display" | "definition" | "system" | "language" | "synonyms" | "parent" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["nAMASTECode"]>

  export type $NAMASTECodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NAMASTECode"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      display: string
      definition: string | null
      system: string
      language: string
      synonyms: string[]
      parent: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["nAMASTECode"]>
    composites: {}
  }

  type NAMASTECodeGetPayload<S extends boolean | null | undefined | NAMASTECodeDefaultArgs> = $Result.GetResult<Prisma.$NAMASTECodePayload, S>

  type NAMASTECodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NAMASTECodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NAMASTECodeCountAggregateInputType | true
    }

  export interface NAMASTECodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NAMASTECode'], meta: { name: 'NAMASTECode' } }
    /**
     * Find zero or one NAMASTECode that matches the filter.
     * @param {NAMASTECodeFindUniqueArgs} args - Arguments to find a NAMASTECode
     * @example
     * // Get one NAMASTECode
     * const nAMASTECode = await prisma.nAMASTECode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NAMASTECodeFindUniqueArgs>(args: SelectSubset<T, NAMASTECodeFindUniqueArgs<ExtArgs>>): Prisma__NAMASTECodeClient<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NAMASTECode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NAMASTECodeFindUniqueOrThrowArgs} args - Arguments to find a NAMASTECode
     * @example
     * // Get one NAMASTECode
     * const nAMASTECode = await prisma.nAMASTECode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NAMASTECodeFindUniqueOrThrowArgs>(args: SelectSubset<T, NAMASTECodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NAMASTECodeClient<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NAMASTECode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NAMASTECodeFindFirstArgs} args - Arguments to find a NAMASTECode
     * @example
     * // Get one NAMASTECode
     * const nAMASTECode = await prisma.nAMASTECode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NAMASTECodeFindFirstArgs>(args?: SelectSubset<T, NAMASTECodeFindFirstArgs<ExtArgs>>): Prisma__NAMASTECodeClient<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NAMASTECode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NAMASTECodeFindFirstOrThrowArgs} args - Arguments to find a NAMASTECode
     * @example
     * // Get one NAMASTECode
     * const nAMASTECode = await prisma.nAMASTECode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NAMASTECodeFindFirstOrThrowArgs>(args?: SelectSubset<T, NAMASTECodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__NAMASTECodeClient<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NAMASTECodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NAMASTECodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NAMASTECodes
     * const nAMASTECodes = await prisma.nAMASTECode.findMany()
     * 
     * // Get first 10 NAMASTECodes
     * const nAMASTECodes = await prisma.nAMASTECode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nAMASTECodeWithIdOnly = await prisma.nAMASTECode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NAMASTECodeFindManyArgs>(args?: SelectSubset<T, NAMASTECodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NAMASTECode.
     * @param {NAMASTECodeCreateArgs} args - Arguments to create a NAMASTECode.
     * @example
     * // Create one NAMASTECode
     * const NAMASTECode = await prisma.nAMASTECode.create({
     *   data: {
     *     // ... data to create a NAMASTECode
     *   }
     * })
     * 
     */
    create<T extends NAMASTECodeCreateArgs>(args: SelectSubset<T, NAMASTECodeCreateArgs<ExtArgs>>): Prisma__NAMASTECodeClient<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NAMASTECodes.
     * @param {NAMASTECodeCreateManyArgs} args - Arguments to create many NAMASTECodes.
     * @example
     * // Create many NAMASTECodes
     * const nAMASTECode = await prisma.nAMASTECode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NAMASTECodeCreateManyArgs>(args?: SelectSubset<T, NAMASTECodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NAMASTECodes and returns the data saved in the database.
     * @param {NAMASTECodeCreateManyAndReturnArgs} args - Arguments to create many NAMASTECodes.
     * @example
     * // Create many NAMASTECodes
     * const nAMASTECode = await prisma.nAMASTECode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NAMASTECodes and only return the `id`
     * const nAMASTECodeWithIdOnly = await prisma.nAMASTECode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NAMASTECodeCreateManyAndReturnArgs>(args?: SelectSubset<T, NAMASTECodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NAMASTECode.
     * @param {NAMASTECodeDeleteArgs} args - Arguments to delete one NAMASTECode.
     * @example
     * // Delete one NAMASTECode
     * const NAMASTECode = await prisma.nAMASTECode.delete({
     *   where: {
     *     // ... filter to delete one NAMASTECode
     *   }
     * })
     * 
     */
    delete<T extends NAMASTECodeDeleteArgs>(args: SelectSubset<T, NAMASTECodeDeleteArgs<ExtArgs>>): Prisma__NAMASTECodeClient<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NAMASTECode.
     * @param {NAMASTECodeUpdateArgs} args - Arguments to update one NAMASTECode.
     * @example
     * // Update one NAMASTECode
     * const nAMASTECode = await prisma.nAMASTECode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NAMASTECodeUpdateArgs>(args: SelectSubset<T, NAMASTECodeUpdateArgs<ExtArgs>>): Prisma__NAMASTECodeClient<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NAMASTECodes.
     * @param {NAMASTECodeDeleteManyArgs} args - Arguments to filter NAMASTECodes to delete.
     * @example
     * // Delete a few NAMASTECodes
     * const { count } = await prisma.nAMASTECode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NAMASTECodeDeleteManyArgs>(args?: SelectSubset<T, NAMASTECodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NAMASTECodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NAMASTECodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NAMASTECodes
     * const nAMASTECode = await prisma.nAMASTECode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NAMASTECodeUpdateManyArgs>(args: SelectSubset<T, NAMASTECodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NAMASTECodes and returns the data updated in the database.
     * @param {NAMASTECodeUpdateManyAndReturnArgs} args - Arguments to update many NAMASTECodes.
     * @example
     * // Update many NAMASTECodes
     * const nAMASTECode = await prisma.nAMASTECode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NAMASTECodes and only return the `id`
     * const nAMASTECodeWithIdOnly = await prisma.nAMASTECode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NAMASTECodeUpdateManyAndReturnArgs>(args: SelectSubset<T, NAMASTECodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NAMASTECode.
     * @param {NAMASTECodeUpsertArgs} args - Arguments to update or create a NAMASTECode.
     * @example
     * // Update or create a NAMASTECode
     * const nAMASTECode = await prisma.nAMASTECode.upsert({
     *   create: {
     *     // ... data to create a NAMASTECode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NAMASTECode we want to update
     *   }
     * })
     */
    upsert<T extends NAMASTECodeUpsertArgs>(args: SelectSubset<T, NAMASTECodeUpsertArgs<ExtArgs>>): Prisma__NAMASTECodeClient<$Result.GetResult<Prisma.$NAMASTECodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NAMASTECodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NAMASTECodeCountArgs} args - Arguments to filter NAMASTECodes to count.
     * @example
     * // Count the number of NAMASTECodes
     * const count = await prisma.nAMASTECode.count({
     *   where: {
     *     // ... the filter for the NAMASTECodes we want to count
     *   }
     * })
    **/
    count<T extends NAMASTECodeCountArgs>(
      args?: Subset<T, NAMASTECodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NAMASTECodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NAMASTECode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NAMASTECodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NAMASTECodeAggregateArgs>(args: Subset<T, NAMASTECodeAggregateArgs>): Prisma.PrismaPromise<GetNAMASTECodeAggregateType<T>>

    /**
     * Group by NAMASTECode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NAMASTECodeGroupByArgs} args - Group by arguments.
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
      T extends NAMASTECodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NAMASTECodeGroupByArgs['orderBy'] }
        : { orderBy?: NAMASTECodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, NAMASTECodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNAMASTECodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NAMASTECode model
   */
  readonly fields: NAMASTECodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NAMASTECode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NAMASTECodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NAMASTECode model
   */
  interface NAMASTECodeFieldRefs {
    readonly id: FieldRef<"NAMASTECode", 'String'>
    readonly code: FieldRef<"NAMASTECode", 'String'>
    readonly display: FieldRef<"NAMASTECode", 'String'>
    readonly definition: FieldRef<"NAMASTECode", 'String'>
    readonly system: FieldRef<"NAMASTECode", 'String'>
    readonly language: FieldRef<"NAMASTECode", 'String'>
    readonly synonyms: FieldRef<"NAMASTECode", 'String[]'>
    readonly parent: FieldRef<"NAMASTECode", 'String'>
    readonly status: FieldRef<"NAMASTECode", 'String'>
    readonly createdAt: FieldRef<"NAMASTECode", 'DateTime'>
    readonly updatedAt: FieldRef<"NAMASTECode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NAMASTECode findUnique
   */
  export type NAMASTECodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * Filter, which NAMASTECode to fetch.
     */
    where: NAMASTECodeWhereUniqueInput
  }

  /**
   * NAMASTECode findUniqueOrThrow
   */
  export type NAMASTECodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * Filter, which NAMASTECode to fetch.
     */
    where: NAMASTECodeWhereUniqueInput
  }

  /**
   * NAMASTECode findFirst
   */
  export type NAMASTECodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * Filter, which NAMASTECode to fetch.
     */
    where?: NAMASTECodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NAMASTECodes to fetch.
     */
    orderBy?: NAMASTECodeOrderByWithRelationInput | NAMASTECodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NAMASTECodes.
     */
    cursor?: NAMASTECodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NAMASTECodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NAMASTECodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NAMASTECodes.
     */
    distinct?: NAMASTECodeScalarFieldEnum | NAMASTECodeScalarFieldEnum[]
  }

  /**
   * NAMASTECode findFirstOrThrow
   */
  export type NAMASTECodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * Filter, which NAMASTECode to fetch.
     */
    where?: NAMASTECodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NAMASTECodes to fetch.
     */
    orderBy?: NAMASTECodeOrderByWithRelationInput | NAMASTECodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NAMASTECodes.
     */
    cursor?: NAMASTECodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NAMASTECodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NAMASTECodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NAMASTECodes.
     */
    distinct?: NAMASTECodeScalarFieldEnum | NAMASTECodeScalarFieldEnum[]
  }

  /**
   * NAMASTECode findMany
   */
  export type NAMASTECodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * Filter, which NAMASTECodes to fetch.
     */
    where?: NAMASTECodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NAMASTECodes to fetch.
     */
    orderBy?: NAMASTECodeOrderByWithRelationInput | NAMASTECodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NAMASTECodes.
     */
    cursor?: NAMASTECodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NAMASTECodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NAMASTECodes.
     */
    skip?: number
    distinct?: NAMASTECodeScalarFieldEnum | NAMASTECodeScalarFieldEnum[]
  }

  /**
   * NAMASTECode create
   */
  export type NAMASTECodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * The data needed to create a NAMASTECode.
     */
    data: XOR<NAMASTECodeCreateInput, NAMASTECodeUncheckedCreateInput>
  }

  /**
   * NAMASTECode createMany
   */
  export type NAMASTECodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NAMASTECodes.
     */
    data: NAMASTECodeCreateManyInput | NAMASTECodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NAMASTECode createManyAndReturn
   */
  export type NAMASTECodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * The data used to create many NAMASTECodes.
     */
    data: NAMASTECodeCreateManyInput | NAMASTECodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * NAMASTECode update
   */
  export type NAMASTECodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * The data needed to update a NAMASTECode.
     */
    data: XOR<NAMASTECodeUpdateInput, NAMASTECodeUncheckedUpdateInput>
    /**
     * Choose, which NAMASTECode to update.
     */
    where: NAMASTECodeWhereUniqueInput
  }

  /**
   * NAMASTECode updateMany
   */
  export type NAMASTECodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NAMASTECodes.
     */
    data: XOR<NAMASTECodeUpdateManyMutationInput, NAMASTECodeUncheckedUpdateManyInput>
    /**
     * Filter which NAMASTECodes to update
     */
    where?: NAMASTECodeWhereInput
    /**
     * Limit how many NAMASTECodes to update.
     */
    limit?: number
  }

  /**
   * NAMASTECode updateManyAndReturn
   */
  export type NAMASTECodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * The data used to update NAMASTECodes.
     */
    data: XOR<NAMASTECodeUpdateManyMutationInput, NAMASTECodeUncheckedUpdateManyInput>
    /**
     * Filter which NAMASTECodes to update
     */
    where?: NAMASTECodeWhereInput
    /**
     * Limit how many NAMASTECodes to update.
     */
    limit?: number
  }

  /**
   * NAMASTECode upsert
   */
  export type NAMASTECodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * The filter to search for the NAMASTECode to update in case it exists.
     */
    where: NAMASTECodeWhereUniqueInput
    /**
     * In case the NAMASTECode found by the `where` argument doesn't exist, create a new NAMASTECode with this data.
     */
    create: XOR<NAMASTECodeCreateInput, NAMASTECodeUncheckedCreateInput>
    /**
     * In case the NAMASTECode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NAMASTECodeUpdateInput, NAMASTECodeUncheckedUpdateInput>
  }

  /**
   * NAMASTECode delete
   */
  export type NAMASTECodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
    /**
     * Filter which NAMASTECode to delete.
     */
    where: NAMASTECodeWhereUniqueInput
  }

  /**
   * NAMASTECode deleteMany
   */
  export type NAMASTECodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NAMASTECodes to delete
     */
    where?: NAMASTECodeWhereInput
    /**
     * Limit how many NAMASTECodes to delete.
     */
    limit?: number
  }

  /**
   * NAMASTECode without action
   */
  export type NAMASTECodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NAMASTECode
     */
    select?: NAMASTECodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NAMASTECode
     */
    omit?: NAMASTECodeOmit<ExtArgs> | null
  }


  /**
   * Model ProcessingStats
   */

  export type AggregateProcessingStats = {
    _count: ProcessingStatsCountAggregateOutputType | null
    _avg: ProcessingStatsAvgAggregateOutputType | null
    _sum: ProcessingStatsSumAggregateOutputType | null
    _min: ProcessingStatsMinAggregateOutputType | null
    _max: ProcessingStatsMaxAggregateOutputType | null
  }

  export type ProcessingStatsAvgAggregateOutputType = {
    totalRecords: number | null
    validRecords: number | null
  }

  export type ProcessingStatsSumAggregateOutputType = {
    totalRecords: number | null
    validRecords: number | null
  }

  export type ProcessingStatsMinAggregateOutputType = {
    id: string | null
    system: string | null
    totalRecords: number | null
    validRecords: number | null
    lastUpload: Date | null
    lastUpdated: Date | null
    createdAt: Date | null
  }

  export type ProcessingStatsMaxAggregateOutputType = {
    id: string | null
    system: string | null
    totalRecords: number | null
    validRecords: number | null
    lastUpload: Date | null
    lastUpdated: Date | null
    createdAt: Date | null
  }

  export type ProcessingStatsCountAggregateOutputType = {
    id: number
    system: number
    totalRecords: number
    validRecords: number
    lastUpload: number
    lastUpdated: number
    createdAt: number
    _all: number
  }


  export type ProcessingStatsAvgAggregateInputType = {
    totalRecords?: true
    validRecords?: true
  }

  export type ProcessingStatsSumAggregateInputType = {
    totalRecords?: true
    validRecords?: true
  }

  export type ProcessingStatsMinAggregateInputType = {
    id?: true
    system?: true
    totalRecords?: true
    validRecords?: true
    lastUpload?: true
    lastUpdated?: true
    createdAt?: true
  }

  export type ProcessingStatsMaxAggregateInputType = {
    id?: true
    system?: true
    totalRecords?: true
    validRecords?: true
    lastUpload?: true
    lastUpdated?: true
    createdAt?: true
  }

  export type ProcessingStatsCountAggregateInputType = {
    id?: true
    system?: true
    totalRecords?: true
    validRecords?: true
    lastUpload?: true
    lastUpdated?: true
    createdAt?: true
    _all?: true
  }

  export type ProcessingStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessingStats to aggregate.
     */
    where?: ProcessingStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingStats to fetch.
     */
    orderBy?: ProcessingStatsOrderByWithRelationInput | ProcessingStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessingStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessingStats
    **/
    _count?: true | ProcessingStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProcessingStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProcessingStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessingStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessingStatsMaxAggregateInputType
  }

  export type GetProcessingStatsAggregateType<T extends ProcessingStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessingStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessingStats[P]>
      : GetScalarType<T[P], AggregateProcessingStats[P]>
  }




  export type ProcessingStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessingStatsWhereInput
    orderBy?: ProcessingStatsOrderByWithAggregationInput | ProcessingStatsOrderByWithAggregationInput[]
    by: ProcessingStatsScalarFieldEnum[] | ProcessingStatsScalarFieldEnum
    having?: ProcessingStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessingStatsCountAggregateInputType | true
    _avg?: ProcessingStatsAvgAggregateInputType
    _sum?: ProcessingStatsSumAggregateInputType
    _min?: ProcessingStatsMinAggregateInputType
    _max?: ProcessingStatsMaxAggregateInputType
  }

  export type ProcessingStatsGroupByOutputType = {
    id: string
    system: string
    totalRecords: number
    validRecords: number
    lastUpload: Date | null
    lastUpdated: Date
    createdAt: Date
    _count: ProcessingStatsCountAggregateOutputType | null
    _avg: ProcessingStatsAvgAggregateOutputType | null
    _sum: ProcessingStatsSumAggregateOutputType | null
    _min: ProcessingStatsMinAggregateOutputType | null
    _max: ProcessingStatsMaxAggregateOutputType | null
  }

  type GetProcessingStatsGroupByPayload<T extends ProcessingStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessingStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessingStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessingStatsGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessingStatsGroupByOutputType[P]>
        }
      >
    >


  export type ProcessingStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    system?: boolean
    totalRecords?: boolean
    validRecords?: boolean
    lastUpload?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["processingStats"]>

  export type ProcessingStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    system?: boolean
    totalRecords?: boolean
    validRecords?: boolean
    lastUpload?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["processingStats"]>

  export type ProcessingStatsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    system?: boolean
    totalRecords?: boolean
    validRecords?: boolean
    lastUpload?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["processingStats"]>

  export type ProcessingStatsSelectScalar = {
    id?: boolean
    system?: boolean
    totalRecords?: boolean
    validRecords?: boolean
    lastUpload?: boolean
    lastUpdated?: boolean
    createdAt?: boolean
  }

  export type ProcessingStatsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "system" | "totalRecords" | "validRecords" | "lastUpload" | "lastUpdated" | "createdAt", ExtArgs["result"]["processingStats"]>

  export type $ProcessingStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessingStats"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      system: string
      totalRecords: number
      validRecords: number
      lastUpload: Date | null
      lastUpdated: Date
      createdAt: Date
    }, ExtArgs["result"]["processingStats"]>
    composites: {}
  }

  type ProcessingStatsGetPayload<S extends boolean | null | undefined | ProcessingStatsDefaultArgs> = $Result.GetResult<Prisma.$ProcessingStatsPayload, S>

  type ProcessingStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProcessingStatsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProcessingStatsCountAggregateInputType | true
    }

  export interface ProcessingStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessingStats'], meta: { name: 'ProcessingStats' } }
    /**
     * Find zero or one ProcessingStats that matches the filter.
     * @param {ProcessingStatsFindUniqueArgs} args - Arguments to find a ProcessingStats
     * @example
     * // Get one ProcessingStats
     * const processingStats = await prisma.processingStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessingStatsFindUniqueArgs>(args: SelectSubset<T, ProcessingStatsFindUniqueArgs<ExtArgs>>): Prisma__ProcessingStatsClient<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProcessingStats that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProcessingStatsFindUniqueOrThrowArgs} args - Arguments to find a ProcessingStats
     * @example
     * // Get one ProcessingStats
     * const processingStats = await prisma.processingStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessingStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessingStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessingStatsClient<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessingStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingStatsFindFirstArgs} args - Arguments to find a ProcessingStats
     * @example
     * // Get one ProcessingStats
     * const processingStats = await prisma.processingStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessingStatsFindFirstArgs>(args?: SelectSubset<T, ProcessingStatsFindFirstArgs<ExtArgs>>): Prisma__ProcessingStatsClient<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProcessingStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingStatsFindFirstOrThrowArgs} args - Arguments to find a ProcessingStats
     * @example
     * // Get one ProcessingStats
     * const processingStats = await prisma.processingStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessingStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessingStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessingStatsClient<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProcessingStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessingStats
     * const processingStats = await prisma.processingStats.findMany()
     * 
     * // Get first 10 ProcessingStats
     * const processingStats = await prisma.processingStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processingStatsWithIdOnly = await prisma.processingStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessingStatsFindManyArgs>(args?: SelectSubset<T, ProcessingStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProcessingStats.
     * @param {ProcessingStatsCreateArgs} args - Arguments to create a ProcessingStats.
     * @example
     * // Create one ProcessingStats
     * const ProcessingStats = await prisma.processingStats.create({
     *   data: {
     *     // ... data to create a ProcessingStats
     *   }
     * })
     * 
     */
    create<T extends ProcessingStatsCreateArgs>(args: SelectSubset<T, ProcessingStatsCreateArgs<ExtArgs>>): Prisma__ProcessingStatsClient<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProcessingStats.
     * @param {ProcessingStatsCreateManyArgs} args - Arguments to create many ProcessingStats.
     * @example
     * // Create many ProcessingStats
     * const processingStats = await prisma.processingStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessingStatsCreateManyArgs>(args?: SelectSubset<T, ProcessingStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessingStats and returns the data saved in the database.
     * @param {ProcessingStatsCreateManyAndReturnArgs} args - Arguments to create many ProcessingStats.
     * @example
     * // Create many ProcessingStats
     * const processingStats = await prisma.processingStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessingStats and only return the `id`
     * const processingStatsWithIdOnly = await prisma.processingStats.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessingStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessingStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProcessingStats.
     * @param {ProcessingStatsDeleteArgs} args - Arguments to delete one ProcessingStats.
     * @example
     * // Delete one ProcessingStats
     * const ProcessingStats = await prisma.processingStats.delete({
     *   where: {
     *     // ... filter to delete one ProcessingStats
     *   }
     * })
     * 
     */
    delete<T extends ProcessingStatsDeleteArgs>(args: SelectSubset<T, ProcessingStatsDeleteArgs<ExtArgs>>): Prisma__ProcessingStatsClient<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProcessingStats.
     * @param {ProcessingStatsUpdateArgs} args - Arguments to update one ProcessingStats.
     * @example
     * // Update one ProcessingStats
     * const processingStats = await prisma.processingStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessingStatsUpdateArgs>(args: SelectSubset<T, ProcessingStatsUpdateArgs<ExtArgs>>): Prisma__ProcessingStatsClient<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProcessingStats.
     * @param {ProcessingStatsDeleteManyArgs} args - Arguments to filter ProcessingStats to delete.
     * @example
     * // Delete a few ProcessingStats
     * const { count } = await prisma.processingStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessingStatsDeleteManyArgs>(args?: SelectSubset<T, ProcessingStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessingStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessingStats
     * const processingStats = await prisma.processingStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessingStatsUpdateManyArgs>(args: SelectSubset<T, ProcessingStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessingStats and returns the data updated in the database.
     * @param {ProcessingStatsUpdateManyAndReturnArgs} args - Arguments to update many ProcessingStats.
     * @example
     * // Update many ProcessingStats
     * const processingStats = await prisma.processingStats.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProcessingStats and only return the `id`
     * const processingStatsWithIdOnly = await prisma.processingStats.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProcessingStatsUpdateManyAndReturnArgs>(args: SelectSubset<T, ProcessingStatsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProcessingStats.
     * @param {ProcessingStatsUpsertArgs} args - Arguments to update or create a ProcessingStats.
     * @example
     * // Update or create a ProcessingStats
     * const processingStats = await prisma.processingStats.upsert({
     *   create: {
     *     // ... data to create a ProcessingStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessingStats we want to update
     *   }
     * })
     */
    upsert<T extends ProcessingStatsUpsertArgs>(args: SelectSubset<T, ProcessingStatsUpsertArgs<ExtArgs>>): Prisma__ProcessingStatsClient<$Result.GetResult<Prisma.$ProcessingStatsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProcessingStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingStatsCountArgs} args - Arguments to filter ProcessingStats to count.
     * @example
     * // Count the number of ProcessingStats
     * const count = await prisma.processingStats.count({
     *   where: {
     *     // ... the filter for the ProcessingStats we want to count
     *   }
     * })
    **/
    count<T extends ProcessingStatsCountArgs>(
      args?: Subset<T, ProcessingStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessingStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessingStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProcessingStatsAggregateArgs>(args: Subset<T, ProcessingStatsAggregateArgs>): Prisma.PrismaPromise<GetProcessingStatsAggregateType<T>>

    /**
     * Group by ProcessingStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingStatsGroupByArgs} args - Group by arguments.
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
      T extends ProcessingStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessingStatsGroupByArgs['orderBy'] }
        : { orderBy?: ProcessingStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, ProcessingStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessingStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessingStats model
   */
  readonly fields: ProcessingStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessingStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessingStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessingStats model
   */
  interface ProcessingStatsFieldRefs {
    readonly id: FieldRef<"ProcessingStats", 'String'>
    readonly system: FieldRef<"ProcessingStats", 'String'>
    readonly totalRecords: FieldRef<"ProcessingStats", 'Int'>
    readonly validRecords: FieldRef<"ProcessingStats", 'Int'>
    readonly lastUpload: FieldRef<"ProcessingStats", 'DateTime'>
    readonly lastUpdated: FieldRef<"ProcessingStats", 'DateTime'>
    readonly createdAt: FieldRef<"ProcessingStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessingStats findUnique
   */
  export type ProcessingStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * Filter, which ProcessingStats to fetch.
     */
    where: ProcessingStatsWhereUniqueInput
  }

  /**
   * ProcessingStats findUniqueOrThrow
   */
  export type ProcessingStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * Filter, which ProcessingStats to fetch.
     */
    where: ProcessingStatsWhereUniqueInput
  }

  /**
   * ProcessingStats findFirst
   */
  export type ProcessingStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * Filter, which ProcessingStats to fetch.
     */
    where?: ProcessingStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingStats to fetch.
     */
    orderBy?: ProcessingStatsOrderByWithRelationInput | ProcessingStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessingStats.
     */
    cursor?: ProcessingStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessingStats.
     */
    distinct?: ProcessingStatsScalarFieldEnum | ProcessingStatsScalarFieldEnum[]
  }

  /**
   * ProcessingStats findFirstOrThrow
   */
  export type ProcessingStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * Filter, which ProcessingStats to fetch.
     */
    where?: ProcessingStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingStats to fetch.
     */
    orderBy?: ProcessingStatsOrderByWithRelationInput | ProcessingStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessingStats.
     */
    cursor?: ProcessingStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessingStats.
     */
    distinct?: ProcessingStatsScalarFieldEnum | ProcessingStatsScalarFieldEnum[]
  }

  /**
   * ProcessingStats findMany
   */
  export type ProcessingStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * Filter, which ProcessingStats to fetch.
     */
    where?: ProcessingStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingStats to fetch.
     */
    orderBy?: ProcessingStatsOrderByWithRelationInput | ProcessingStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessingStats.
     */
    cursor?: ProcessingStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingStats.
     */
    skip?: number
    distinct?: ProcessingStatsScalarFieldEnum | ProcessingStatsScalarFieldEnum[]
  }

  /**
   * ProcessingStats create
   */
  export type ProcessingStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * The data needed to create a ProcessingStats.
     */
    data: XOR<ProcessingStatsCreateInput, ProcessingStatsUncheckedCreateInput>
  }

  /**
   * ProcessingStats createMany
   */
  export type ProcessingStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessingStats.
     */
    data: ProcessingStatsCreateManyInput | ProcessingStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessingStats createManyAndReturn
   */
  export type ProcessingStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * The data used to create many ProcessingStats.
     */
    data: ProcessingStatsCreateManyInput | ProcessingStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessingStats update
   */
  export type ProcessingStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * The data needed to update a ProcessingStats.
     */
    data: XOR<ProcessingStatsUpdateInput, ProcessingStatsUncheckedUpdateInput>
    /**
     * Choose, which ProcessingStats to update.
     */
    where: ProcessingStatsWhereUniqueInput
  }

  /**
   * ProcessingStats updateMany
   */
  export type ProcessingStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessingStats.
     */
    data: XOR<ProcessingStatsUpdateManyMutationInput, ProcessingStatsUncheckedUpdateManyInput>
    /**
     * Filter which ProcessingStats to update
     */
    where?: ProcessingStatsWhereInput
    /**
     * Limit how many ProcessingStats to update.
     */
    limit?: number
  }

  /**
   * ProcessingStats updateManyAndReturn
   */
  export type ProcessingStatsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * The data used to update ProcessingStats.
     */
    data: XOR<ProcessingStatsUpdateManyMutationInput, ProcessingStatsUncheckedUpdateManyInput>
    /**
     * Filter which ProcessingStats to update
     */
    where?: ProcessingStatsWhereInput
    /**
     * Limit how many ProcessingStats to update.
     */
    limit?: number
  }

  /**
   * ProcessingStats upsert
   */
  export type ProcessingStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * The filter to search for the ProcessingStats to update in case it exists.
     */
    where: ProcessingStatsWhereUniqueInput
    /**
     * In case the ProcessingStats found by the `where` argument doesn't exist, create a new ProcessingStats with this data.
     */
    create: XOR<ProcessingStatsCreateInput, ProcessingStatsUncheckedCreateInput>
    /**
     * In case the ProcessingStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessingStatsUpdateInput, ProcessingStatsUncheckedUpdateInput>
  }

  /**
   * ProcessingStats delete
   */
  export type ProcessingStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
    /**
     * Filter which ProcessingStats to delete.
     */
    where: ProcessingStatsWhereUniqueInput
  }

  /**
   * ProcessingStats deleteMany
   */
  export type ProcessingStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessingStats to delete
     */
    where?: ProcessingStatsWhereInput
    /**
     * Limit how many ProcessingStats to delete.
     */
    limit?: number
  }

  /**
   * ProcessingStats without action
   */
  export type ProcessingStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingStats
     */
    select?: ProcessingStatsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProcessingStats
     */
    omit?: ProcessingStatsOmit<ExtArgs> | null
  }


  /**
   * Model WHOCode
   */

  export type AggregateWHOCode = {
    _count: WHOCodeCountAggregateOutputType | null
    _min: WHOCodeMinAggregateOutputType | null
    _max: WHOCodeMaxAggregateOutputType | null
  }

  export type WHOCodeMinAggregateOutputType = {
    id: string | null
    entityId: string | null
    title: string | null
    definition: string | null
    system: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WHOCodeMaxAggregateOutputType = {
    id: string | null
    entityId: string | null
    title: string | null
    definition: string | null
    system: string | null
    language: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WHOCodeCountAggregateOutputType = {
    id: number
    entityId: number
    title: number
    definition: number
    system: number
    language: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WHOCodeMinAggregateInputType = {
    id?: true
    entityId?: true
    title?: true
    definition?: true
    system?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WHOCodeMaxAggregateInputType = {
    id?: true
    entityId?: true
    title?: true
    definition?: true
    system?: true
    language?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WHOCodeCountAggregateInputType = {
    id?: true
    entityId?: true
    title?: true
    definition?: true
    system?: true
    language?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WHOCodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WHOCode to aggregate.
     */
    where?: WHOCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WHOCodes to fetch.
     */
    orderBy?: WHOCodeOrderByWithRelationInput | WHOCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WHOCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WHOCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WHOCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WHOCodes
    **/
    _count?: true | WHOCodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WHOCodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WHOCodeMaxAggregateInputType
  }

  export type GetWHOCodeAggregateType<T extends WHOCodeAggregateArgs> = {
        [P in keyof T & keyof AggregateWHOCode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWHOCode[P]>
      : GetScalarType<T[P], AggregateWHOCode[P]>
  }




  export type WHOCodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WHOCodeWhereInput
    orderBy?: WHOCodeOrderByWithAggregationInput | WHOCodeOrderByWithAggregationInput[]
    by: WHOCodeScalarFieldEnum[] | WHOCodeScalarFieldEnum
    having?: WHOCodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WHOCodeCountAggregateInputType | true
    _min?: WHOCodeMinAggregateInputType
    _max?: WHOCodeMaxAggregateInputType
  }

  export type WHOCodeGroupByOutputType = {
    id: string
    entityId: string
    title: string
    definition: string | null
    system: string
    language: string
    createdAt: Date
    updatedAt: Date
    _count: WHOCodeCountAggregateOutputType | null
    _min: WHOCodeMinAggregateOutputType | null
    _max: WHOCodeMaxAggregateOutputType | null
  }

  type GetWHOCodeGroupByPayload<T extends WHOCodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WHOCodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WHOCodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WHOCodeGroupByOutputType[P]>
            : GetScalarType<T[P], WHOCodeGroupByOutputType[P]>
        }
      >
    >


  export type WHOCodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityId?: boolean
    title?: boolean
    definition?: boolean
    system?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wHOCode"]>

  export type WHOCodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityId?: boolean
    title?: boolean
    definition?: boolean
    system?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wHOCode"]>

  export type WHOCodeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entityId?: boolean
    title?: boolean
    definition?: boolean
    system?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["wHOCode"]>

  export type WHOCodeSelectScalar = {
    id?: boolean
    entityId?: boolean
    title?: boolean
    definition?: boolean
    system?: boolean
    language?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WHOCodeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entityId" | "title" | "definition" | "system" | "language" | "createdAt" | "updatedAt", ExtArgs["result"]["wHOCode"]>

  export type $WHOCodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WHOCode"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entityId: string
      title: string
      definition: string | null
      system: string
      language: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["wHOCode"]>
    composites: {}
  }

  type WHOCodeGetPayload<S extends boolean | null | undefined | WHOCodeDefaultArgs> = $Result.GetResult<Prisma.$WHOCodePayload, S>

  type WHOCodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WHOCodeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WHOCodeCountAggregateInputType | true
    }

  export interface WHOCodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WHOCode'], meta: { name: 'WHOCode' } }
    /**
     * Find zero or one WHOCode that matches the filter.
     * @param {WHOCodeFindUniqueArgs} args - Arguments to find a WHOCode
     * @example
     * // Get one WHOCode
     * const wHOCode = await prisma.wHOCode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WHOCodeFindUniqueArgs>(args: SelectSubset<T, WHOCodeFindUniqueArgs<ExtArgs>>): Prisma__WHOCodeClient<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WHOCode that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WHOCodeFindUniqueOrThrowArgs} args - Arguments to find a WHOCode
     * @example
     * // Get one WHOCode
     * const wHOCode = await prisma.wHOCode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WHOCodeFindUniqueOrThrowArgs>(args: SelectSubset<T, WHOCodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WHOCodeClient<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WHOCode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WHOCodeFindFirstArgs} args - Arguments to find a WHOCode
     * @example
     * // Get one WHOCode
     * const wHOCode = await prisma.wHOCode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WHOCodeFindFirstArgs>(args?: SelectSubset<T, WHOCodeFindFirstArgs<ExtArgs>>): Prisma__WHOCodeClient<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WHOCode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WHOCodeFindFirstOrThrowArgs} args - Arguments to find a WHOCode
     * @example
     * // Get one WHOCode
     * const wHOCode = await prisma.wHOCode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WHOCodeFindFirstOrThrowArgs>(args?: SelectSubset<T, WHOCodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__WHOCodeClient<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WHOCodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WHOCodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WHOCodes
     * const wHOCodes = await prisma.wHOCode.findMany()
     * 
     * // Get first 10 WHOCodes
     * const wHOCodes = await prisma.wHOCode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wHOCodeWithIdOnly = await prisma.wHOCode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WHOCodeFindManyArgs>(args?: SelectSubset<T, WHOCodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WHOCode.
     * @param {WHOCodeCreateArgs} args - Arguments to create a WHOCode.
     * @example
     * // Create one WHOCode
     * const WHOCode = await prisma.wHOCode.create({
     *   data: {
     *     // ... data to create a WHOCode
     *   }
     * })
     * 
     */
    create<T extends WHOCodeCreateArgs>(args: SelectSubset<T, WHOCodeCreateArgs<ExtArgs>>): Prisma__WHOCodeClient<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WHOCodes.
     * @param {WHOCodeCreateManyArgs} args - Arguments to create many WHOCodes.
     * @example
     * // Create many WHOCodes
     * const wHOCode = await prisma.wHOCode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WHOCodeCreateManyArgs>(args?: SelectSubset<T, WHOCodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WHOCodes and returns the data saved in the database.
     * @param {WHOCodeCreateManyAndReturnArgs} args - Arguments to create many WHOCodes.
     * @example
     * // Create many WHOCodes
     * const wHOCode = await prisma.wHOCode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WHOCodes and only return the `id`
     * const wHOCodeWithIdOnly = await prisma.wHOCode.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WHOCodeCreateManyAndReturnArgs>(args?: SelectSubset<T, WHOCodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WHOCode.
     * @param {WHOCodeDeleteArgs} args - Arguments to delete one WHOCode.
     * @example
     * // Delete one WHOCode
     * const WHOCode = await prisma.wHOCode.delete({
     *   where: {
     *     // ... filter to delete one WHOCode
     *   }
     * })
     * 
     */
    delete<T extends WHOCodeDeleteArgs>(args: SelectSubset<T, WHOCodeDeleteArgs<ExtArgs>>): Prisma__WHOCodeClient<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WHOCode.
     * @param {WHOCodeUpdateArgs} args - Arguments to update one WHOCode.
     * @example
     * // Update one WHOCode
     * const wHOCode = await prisma.wHOCode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WHOCodeUpdateArgs>(args: SelectSubset<T, WHOCodeUpdateArgs<ExtArgs>>): Prisma__WHOCodeClient<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WHOCodes.
     * @param {WHOCodeDeleteManyArgs} args - Arguments to filter WHOCodes to delete.
     * @example
     * // Delete a few WHOCodes
     * const { count } = await prisma.wHOCode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WHOCodeDeleteManyArgs>(args?: SelectSubset<T, WHOCodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WHOCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WHOCodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WHOCodes
     * const wHOCode = await prisma.wHOCode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WHOCodeUpdateManyArgs>(args: SelectSubset<T, WHOCodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WHOCodes and returns the data updated in the database.
     * @param {WHOCodeUpdateManyAndReturnArgs} args - Arguments to update many WHOCodes.
     * @example
     * // Update many WHOCodes
     * const wHOCode = await prisma.wHOCode.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WHOCodes and only return the `id`
     * const wHOCodeWithIdOnly = await prisma.wHOCode.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WHOCodeUpdateManyAndReturnArgs>(args: SelectSubset<T, WHOCodeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WHOCode.
     * @param {WHOCodeUpsertArgs} args - Arguments to update or create a WHOCode.
     * @example
     * // Update or create a WHOCode
     * const wHOCode = await prisma.wHOCode.upsert({
     *   create: {
     *     // ... data to create a WHOCode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WHOCode we want to update
     *   }
     * })
     */
    upsert<T extends WHOCodeUpsertArgs>(args: SelectSubset<T, WHOCodeUpsertArgs<ExtArgs>>): Prisma__WHOCodeClient<$Result.GetResult<Prisma.$WHOCodePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WHOCodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WHOCodeCountArgs} args - Arguments to filter WHOCodes to count.
     * @example
     * // Count the number of WHOCodes
     * const count = await prisma.wHOCode.count({
     *   where: {
     *     // ... the filter for the WHOCodes we want to count
     *   }
     * })
    **/
    count<T extends WHOCodeCountArgs>(
      args?: Subset<T, WHOCodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WHOCodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WHOCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WHOCodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WHOCodeAggregateArgs>(args: Subset<T, WHOCodeAggregateArgs>): Prisma.PrismaPromise<GetWHOCodeAggregateType<T>>

    /**
     * Group by WHOCode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WHOCodeGroupByArgs} args - Group by arguments.
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
      T extends WHOCodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WHOCodeGroupByArgs['orderBy'] }
        : { orderBy?: WHOCodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, WHOCodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWHOCodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WHOCode model
   */
  readonly fields: WHOCodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WHOCode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WHOCodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WHOCode model
   */
  interface WHOCodeFieldRefs {
    readonly id: FieldRef<"WHOCode", 'String'>
    readonly entityId: FieldRef<"WHOCode", 'String'>
    readonly title: FieldRef<"WHOCode", 'String'>
    readonly definition: FieldRef<"WHOCode", 'String'>
    readonly system: FieldRef<"WHOCode", 'String'>
    readonly language: FieldRef<"WHOCode", 'String'>
    readonly createdAt: FieldRef<"WHOCode", 'DateTime'>
    readonly updatedAt: FieldRef<"WHOCode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WHOCode findUnique
   */
  export type WHOCodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * Filter, which WHOCode to fetch.
     */
    where: WHOCodeWhereUniqueInput
  }

  /**
   * WHOCode findUniqueOrThrow
   */
  export type WHOCodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * Filter, which WHOCode to fetch.
     */
    where: WHOCodeWhereUniqueInput
  }

  /**
   * WHOCode findFirst
   */
  export type WHOCodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * Filter, which WHOCode to fetch.
     */
    where?: WHOCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WHOCodes to fetch.
     */
    orderBy?: WHOCodeOrderByWithRelationInput | WHOCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WHOCodes.
     */
    cursor?: WHOCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WHOCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WHOCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WHOCodes.
     */
    distinct?: WHOCodeScalarFieldEnum | WHOCodeScalarFieldEnum[]
  }

  /**
   * WHOCode findFirstOrThrow
   */
  export type WHOCodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * Filter, which WHOCode to fetch.
     */
    where?: WHOCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WHOCodes to fetch.
     */
    orderBy?: WHOCodeOrderByWithRelationInput | WHOCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WHOCodes.
     */
    cursor?: WHOCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WHOCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WHOCodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WHOCodes.
     */
    distinct?: WHOCodeScalarFieldEnum | WHOCodeScalarFieldEnum[]
  }

  /**
   * WHOCode findMany
   */
  export type WHOCodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * Filter, which WHOCodes to fetch.
     */
    where?: WHOCodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WHOCodes to fetch.
     */
    orderBy?: WHOCodeOrderByWithRelationInput | WHOCodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WHOCodes.
     */
    cursor?: WHOCodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WHOCodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WHOCodes.
     */
    skip?: number
    distinct?: WHOCodeScalarFieldEnum | WHOCodeScalarFieldEnum[]
  }

  /**
   * WHOCode create
   */
  export type WHOCodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * The data needed to create a WHOCode.
     */
    data: XOR<WHOCodeCreateInput, WHOCodeUncheckedCreateInput>
  }

  /**
   * WHOCode createMany
   */
  export type WHOCodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WHOCodes.
     */
    data: WHOCodeCreateManyInput | WHOCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WHOCode createManyAndReturn
   */
  export type WHOCodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * The data used to create many WHOCodes.
     */
    data: WHOCodeCreateManyInput | WHOCodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WHOCode update
   */
  export type WHOCodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * The data needed to update a WHOCode.
     */
    data: XOR<WHOCodeUpdateInput, WHOCodeUncheckedUpdateInput>
    /**
     * Choose, which WHOCode to update.
     */
    where: WHOCodeWhereUniqueInput
  }

  /**
   * WHOCode updateMany
   */
  export type WHOCodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WHOCodes.
     */
    data: XOR<WHOCodeUpdateManyMutationInput, WHOCodeUncheckedUpdateManyInput>
    /**
     * Filter which WHOCodes to update
     */
    where?: WHOCodeWhereInput
    /**
     * Limit how many WHOCodes to update.
     */
    limit?: number
  }

  /**
   * WHOCode updateManyAndReturn
   */
  export type WHOCodeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * The data used to update WHOCodes.
     */
    data: XOR<WHOCodeUpdateManyMutationInput, WHOCodeUncheckedUpdateManyInput>
    /**
     * Filter which WHOCodes to update
     */
    where?: WHOCodeWhereInput
    /**
     * Limit how many WHOCodes to update.
     */
    limit?: number
  }

  /**
   * WHOCode upsert
   */
  export type WHOCodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * The filter to search for the WHOCode to update in case it exists.
     */
    where: WHOCodeWhereUniqueInput
    /**
     * In case the WHOCode found by the `where` argument doesn't exist, create a new WHOCode with this data.
     */
    create: XOR<WHOCodeCreateInput, WHOCodeUncheckedCreateInput>
    /**
     * In case the WHOCode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WHOCodeUpdateInput, WHOCodeUncheckedUpdateInput>
  }

  /**
   * WHOCode delete
   */
  export type WHOCodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
    /**
     * Filter which WHOCode to delete.
     */
    where: WHOCodeWhereUniqueInput
  }

  /**
   * WHOCode deleteMany
   */
  export type WHOCodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WHOCodes to delete
     */
    where?: WHOCodeWhereInput
    /**
     * Limit how many WHOCodes to delete.
     */
    limit?: number
  }

  /**
   * WHOCode without action
   */
  export type WHOCodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WHOCode
     */
    select?: WHOCodeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WHOCode
     */
    omit?: WHOCodeOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const NAMASTECodeScalarFieldEnum: {
    id: 'id',
    code: 'code',
    display: 'display',
    definition: 'definition',
    system: 'system',
    language: 'language',
    synonyms: 'synonyms',
    parent: 'parent',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NAMASTECodeScalarFieldEnum = (typeof NAMASTECodeScalarFieldEnum)[keyof typeof NAMASTECodeScalarFieldEnum]


  export const ProcessingStatsScalarFieldEnum: {
    id: 'id',
    system: 'system',
    totalRecords: 'totalRecords',
    validRecords: 'validRecords',
    lastUpload: 'lastUpload',
    lastUpdated: 'lastUpdated',
    createdAt: 'createdAt'
  };

  export type ProcessingStatsScalarFieldEnum = (typeof ProcessingStatsScalarFieldEnum)[keyof typeof ProcessingStatsScalarFieldEnum]


  export const WHOCodeScalarFieldEnum: {
    id: 'id',
    entityId: 'entityId',
    title: 'title',
    definition: 'definition',
    system: 'system',
    language: 'language',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WHOCodeScalarFieldEnum = (typeof WHOCodeScalarFieldEnum)[keyof typeof WHOCodeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type NAMASTECodeWhereInput = {
    AND?: NAMASTECodeWhereInput | NAMASTECodeWhereInput[]
    OR?: NAMASTECodeWhereInput[]
    NOT?: NAMASTECodeWhereInput | NAMASTECodeWhereInput[]
    id?: StringFilter<"NAMASTECode"> | string
    code?: StringFilter<"NAMASTECode"> | string
    display?: StringFilter<"NAMASTECode"> | string
    definition?: StringNullableFilter<"NAMASTECode"> | string | null
    system?: StringFilter<"NAMASTECode"> | string
    language?: StringFilter<"NAMASTECode"> | string
    synonyms?: StringNullableListFilter<"NAMASTECode">
    parent?: StringNullableFilter<"NAMASTECode"> | string | null
    status?: StringFilter<"NAMASTECode"> | string
    createdAt?: DateTimeFilter<"NAMASTECode"> | Date | string
    updatedAt?: DateTimeFilter<"NAMASTECode"> | Date | string
  }

  export type NAMASTECodeOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    display?: SortOrder
    definition?: SortOrderInput | SortOrder
    system?: SortOrder
    language?: SortOrder
    synonyms?: SortOrder
    parent?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NAMASTECodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    system_code?: NAMASTECodeSystemCodeCompoundUniqueInput
    AND?: NAMASTECodeWhereInput | NAMASTECodeWhereInput[]
    OR?: NAMASTECodeWhereInput[]
    NOT?: NAMASTECodeWhereInput | NAMASTECodeWhereInput[]
    code?: StringFilter<"NAMASTECode"> | string
    display?: StringFilter<"NAMASTECode"> | string
    definition?: StringNullableFilter<"NAMASTECode"> | string | null
    system?: StringFilter<"NAMASTECode"> | string
    language?: StringFilter<"NAMASTECode"> | string
    synonyms?: StringNullableListFilter<"NAMASTECode">
    parent?: StringNullableFilter<"NAMASTECode"> | string | null
    status?: StringFilter<"NAMASTECode"> | string
    createdAt?: DateTimeFilter<"NAMASTECode"> | Date | string
    updatedAt?: DateTimeFilter<"NAMASTECode"> | Date | string
  }, "id" | "system_code">

  export type NAMASTECodeOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    display?: SortOrder
    definition?: SortOrderInput | SortOrder
    system?: SortOrder
    language?: SortOrder
    synonyms?: SortOrder
    parent?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NAMASTECodeCountOrderByAggregateInput
    _max?: NAMASTECodeMaxOrderByAggregateInput
    _min?: NAMASTECodeMinOrderByAggregateInput
  }

  export type NAMASTECodeScalarWhereWithAggregatesInput = {
    AND?: NAMASTECodeScalarWhereWithAggregatesInput | NAMASTECodeScalarWhereWithAggregatesInput[]
    OR?: NAMASTECodeScalarWhereWithAggregatesInput[]
    NOT?: NAMASTECodeScalarWhereWithAggregatesInput | NAMASTECodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NAMASTECode"> | string
    code?: StringWithAggregatesFilter<"NAMASTECode"> | string
    display?: StringWithAggregatesFilter<"NAMASTECode"> | string
    definition?: StringNullableWithAggregatesFilter<"NAMASTECode"> | string | null
    system?: StringWithAggregatesFilter<"NAMASTECode"> | string
    language?: StringWithAggregatesFilter<"NAMASTECode"> | string
    synonyms?: StringNullableListFilter<"NAMASTECode">
    parent?: StringNullableWithAggregatesFilter<"NAMASTECode"> | string | null
    status?: StringWithAggregatesFilter<"NAMASTECode"> | string
    createdAt?: DateTimeWithAggregatesFilter<"NAMASTECode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NAMASTECode"> | Date | string
  }

  export type ProcessingStatsWhereInput = {
    AND?: ProcessingStatsWhereInput | ProcessingStatsWhereInput[]
    OR?: ProcessingStatsWhereInput[]
    NOT?: ProcessingStatsWhereInput | ProcessingStatsWhereInput[]
    id?: StringFilter<"ProcessingStats"> | string
    system?: StringFilter<"ProcessingStats"> | string
    totalRecords?: IntFilter<"ProcessingStats"> | number
    validRecords?: IntFilter<"ProcessingStats"> | number
    lastUpload?: DateTimeNullableFilter<"ProcessingStats"> | Date | string | null
    lastUpdated?: DateTimeFilter<"ProcessingStats"> | Date | string
    createdAt?: DateTimeFilter<"ProcessingStats"> | Date | string
  }

  export type ProcessingStatsOrderByWithRelationInput = {
    id?: SortOrder
    system?: SortOrder
    totalRecords?: SortOrder
    validRecords?: SortOrder
    lastUpload?: SortOrderInput | SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessingStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    system?: string
    AND?: ProcessingStatsWhereInput | ProcessingStatsWhereInput[]
    OR?: ProcessingStatsWhereInput[]
    NOT?: ProcessingStatsWhereInput | ProcessingStatsWhereInput[]
    totalRecords?: IntFilter<"ProcessingStats"> | number
    validRecords?: IntFilter<"ProcessingStats"> | number
    lastUpload?: DateTimeNullableFilter<"ProcessingStats"> | Date | string | null
    lastUpdated?: DateTimeFilter<"ProcessingStats"> | Date | string
    createdAt?: DateTimeFilter<"ProcessingStats"> | Date | string
  }, "id" | "system">

  export type ProcessingStatsOrderByWithAggregationInput = {
    id?: SortOrder
    system?: SortOrder
    totalRecords?: SortOrder
    validRecords?: SortOrder
    lastUpload?: SortOrderInput | SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
    _count?: ProcessingStatsCountOrderByAggregateInput
    _avg?: ProcessingStatsAvgOrderByAggregateInput
    _max?: ProcessingStatsMaxOrderByAggregateInput
    _min?: ProcessingStatsMinOrderByAggregateInput
    _sum?: ProcessingStatsSumOrderByAggregateInput
  }

  export type ProcessingStatsScalarWhereWithAggregatesInput = {
    AND?: ProcessingStatsScalarWhereWithAggregatesInput | ProcessingStatsScalarWhereWithAggregatesInput[]
    OR?: ProcessingStatsScalarWhereWithAggregatesInput[]
    NOT?: ProcessingStatsScalarWhereWithAggregatesInput | ProcessingStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProcessingStats"> | string
    system?: StringWithAggregatesFilter<"ProcessingStats"> | string
    totalRecords?: IntWithAggregatesFilter<"ProcessingStats"> | number
    validRecords?: IntWithAggregatesFilter<"ProcessingStats"> | number
    lastUpload?: DateTimeNullableWithAggregatesFilter<"ProcessingStats"> | Date | string | null
    lastUpdated?: DateTimeWithAggregatesFilter<"ProcessingStats"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"ProcessingStats"> | Date | string
  }

  export type WHOCodeWhereInput = {
    AND?: WHOCodeWhereInput | WHOCodeWhereInput[]
    OR?: WHOCodeWhereInput[]
    NOT?: WHOCodeWhereInput | WHOCodeWhereInput[]
    id?: StringFilter<"WHOCode"> | string
    entityId?: StringFilter<"WHOCode"> | string
    title?: StringFilter<"WHOCode"> | string
    definition?: StringNullableFilter<"WHOCode"> | string | null
    system?: StringFilter<"WHOCode"> | string
    language?: StringFilter<"WHOCode"> | string
    createdAt?: DateTimeFilter<"WHOCode"> | Date | string
    updatedAt?: DateTimeFilter<"WHOCode"> | Date | string
  }

  export type WHOCodeOrderByWithRelationInput = {
    id?: SortOrder
    entityId?: SortOrder
    title?: SortOrder
    definition?: SortOrderInput | SortOrder
    system?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WHOCodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    entityId?: string
    AND?: WHOCodeWhereInput | WHOCodeWhereInput[]
    OR?: WHOCodeWhereInput[]
    NOT?: WHOCodeWhereInput | WHOCodeWhereInput[]
    title?: StringFilter<"WHOCode"> | string
    definition?: StringNullableFilter<"WHOCode"> | string | null
    system?: StringFilter<"WHOCode"> | string
    language?: StringFilter<"WHOCode"> | string
    createdAt?: DateTimeFilter<"WHOCode"> | Date | string
    updatedAt?: DateTimeFilter<"WHOCode"> | Date | string
  }, "id" | "entityId">

  export type WHOCodeOrderByWithAggregationInput = {
    id?: SortOrder
    entityId?: SortOrder
    title?: SortOrder
    definition?: SortOrderInput | SortOrder
    system?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WHOCodeCountOrderByAggregateInput
    _max?: WHOCodeMaxOrderByAggregateInput
    _min?: WHOCodeMinOrderByAggregateInput
  }

  export type WHOCodeScalarWhereWithAggregatesInput = {
    AND?: WHOCodeScalarWhereWithAggregatesInput | WHOCodeScalarWhereWithAggregatesInput[]
    OR?: WHOCodeScalarWhereWithAggregatesInput[]
    NOT?: WHOCodeScalarWhereWithAggregatesInput | WHOCodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WHOCode"> | string
    entityId?: StringWithAggregatesFilter<"WHOCode"> | string
    title?: StringWithAggregatesFilter<"WHOCode"> | string
    definition?: StringNullableWithAggregatesFilter<"WHOCode"> | string | null
    system?: StringWithAggregatesFilter<"WHOCode"> | string
    language?: StringWithAggregatesFilter<"WHOCode"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WHOCode"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WHOCode"> | Date | string
  }

  export type NAMASTECodeCreateInput = {
    id?: string
    code: string
    display: string
    definition?: string | null
    system: string
    language?: string
    synonyms?: NAMASTECodeCreatesynonymsInput | string[]
    parent?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NAMASTECodeUncheckedCreateInput = {
    id?: string
    code: string
    display: string
    definition?: string | null
    system: string
    language?: string
    synonyms?: NAMASTECodeCreatesynonymsInput | string[]
    parent?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NAMASTECodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    synonyms?: NAMASTECodeUpdatesynonymsInput | string[]
    parent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NAMASTECodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    synonyms?: NAMASTECodeUpdatesynonymsInput | string[]
    parent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NAMASTECodeCreateManyInput = {
    id?: string
    code: string
    display: string
    definition?: string | null
    system: string
    language?: string
    synonyms?: NAMASTECodeCreatesynonymsInput | string[]
    parent?: string | null
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NAMASTECodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    synonyms?: NAMASTECodeUpdatesynonymsInput | string[]
    parent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NAMASTECodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    display?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    synonyms?: NAMASTECodeUpdatesynonymsInput | string[]
    parent?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingStatsCreateInput = {
    id?: string
    system: string
    totalRecords?: number
    validRecords?: number
    lastUpload?: Date | string | null
    lastUpdated?: Date | string
    createdAt?: Date | string
  }

  export type ProcessingStatsUncheckedCreateInput = {
    id?: string
    system: string
    totalRecords?: number
    validRecords?: number
    lastUpload?: Date | string | null
    lastUpdated?: Date | string
    createdAt?: Date | string
  }

  export type ProcessingStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    validRecords?: IntFieldUpdateOperationsInput | number
    lastUpload?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    validRecords?: IntFieldUpdateOperationsInput | number
    lastUpload?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingStatsCreateManyInput = {
    id?: string
    system: string
    totalRecords?: number
    validRecords?: number
    lastUpload?: Date | string | null
    lastUpdated?: Date | string
    createdAt?: Date | string
  }

  export type ProcessingStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    validRecords?: IntFieldUpdateOperationsInput | number
    lastUpload?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    system?: StringFieldUpdateOperationsInput | string
    totalRecords?: IntFieldUpdateOperationsInput | number
    validRecords?: IntFieldUpdateOperationsInput | number
    lastUpload?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WHOCodeCreateInput = {
    id: string
    entityId: string
    title: string
    definition?: string | null
    system?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WHOCodeUncheckedCreateInput = {
    id: string
    entityId: string
    title: string
    definition?: string | null
    system?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WHOCodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WHOCodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WHOCodeCreateManyInput = {
    id: string
    entityId: string
    title: string
    definition?: string | null
    system?: string
    language?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WHOCodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WHOCodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entityId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    system?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NAMASTECodeSystemCodeCompoundUniqueInput = {
    system: string
    code: string
  }

  export type NAMASTECodeCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    display?: SortOrder
    definition?: SortOrder
    system?: SortOrder
    language?: SortOrder
    synonyms?: SortOrder
    parent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NAMASTECodeMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    display?: SortOrder
    definition?: SortOrder
    system?: SortOrder
    language?: SortOrder
    parent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NAMASTECodeMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    display?: SortOrder
    definition?: SortOrder
    system?: SortOrder
    language?: SortOrder
    parent?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ProcessingStatsCountOrderByAggregateInput = {
    id?: SortOrder
    system?: SortOrder
    totalRecords?: SortOrder
    validRecords?: SortOrder
    lastUpload?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessingStatsAvgOrderByAggregateInput = {
    totalRecords?: SortOrder
    validRecords?: SortOrder
  }

  export type ProcessingStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    system?: SortOrder
    totalRecords?: SortOrder
    validRecords?: SortOrder
    lastUpload?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessingStatsMinOrderByAggregateInput = {
    id?: SortOrder
    system?: SortOrder
    totalRecords?: SortOrder
    validRecords?: SortOrder
    lastUpload?: SortOrder
    lastUpdated?: SortOrder
    createdAt?: SortOrder
  }

  export type ProcessingStatsSumOrderByAggregateInput = {
    totalRecords?: SortOrder
    validRecords?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type WHOCodeCountOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    title?: SortOrder
    definition?: SortOrder
    system?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WHOCodeMaxOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    title?: SortOrder
    definition?: SortOrder
    system?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WHOCodeMinOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    title?: SortOrder
    definition?: SortOrder
    system?: SortOrder
    language?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NAMASTECodeCreatesynonymsInput = {
    set: string[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NAMASTECodeUpdatesynonymsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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