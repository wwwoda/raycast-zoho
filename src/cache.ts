/* eslint-disable max-len */
import { environment } from '@raycast/api';
import Conf from 'conf';
// import { createRequire } from 'module';
import type {
  ChartOfAccountEntity, BankAccountEntity, ContactEntity, ExpenseEntity, TaxEntity,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Cache = require('cache-conf');
// const Cache = createRequire(import.meta.url)('cache-conf');

export interface ZohoCache {
  vendorEntities: ContactEntity[];
  accountEntities: ChartOfAccountEntity[];
  bankAccountEntities: BankAccountEntity[];
  taxEntities: TaxEntity[];
  expenseEntities: Record<string, ExpenseEntity[]>;
}

export interface CacheConfGetOptions {
  /**
  Get the item for the key provided without taking the `maxAge` of the item into account.
  */
  readonly ignoreMaxAge?: boolean;
}

export interface CacheConfSetOptions {
  /**
  Number of milliseconds the cached value is valid.
  */
  readonly maxAge?: number;
}

export interface CacheConf<T extends Record<string, any>> extends Conf<T> {
  isExpired: (key: T) => boolean;

  get<Key extends keyof T>(key: Key, options?: CacheConfGetOptions): T[Key];
  get<Key extends keyof T>(key: Key, defaultValue: Required<T>[Key], options?: CacheConfGetOptions): Required<T>[Key];
  get<Key extends string, Value = unknown>(
    key: Exclude<Key, keyof T>,
    defaultValue?: Value,
    options?: CacheConfGetOptions
  ): Value;
  get(key: string, defaultValue?: unknown, options?: CacheConfGetOptions): unknown;

  set<Key extends keyof T>(key: Key, value?: T[Key], options?: CacheConfSetOptions): void;
  set(key: string, value: unknown, options: CacheConfSetOptions): void;
  set(object: Partial<T>, options: CacheConfSetOptions): void;
  set<Key extends keyof T>(
    key: Partial<T> | Key | string,
    value?: T[Key] | unknown,
    options?: CacheConfSetOptions
  ): void;
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const cache: CacheConf<ZohoCache> = new Cache({
  configName: environment.extensionName,
  cwd: environment.supportPath,
  version: environment.raycastVersion,
});

export default cache;
