import cache, { CacheConfSetOptions, ZohoCache } from './cache';
import { ExpenseEntity } from './types';
import { daysToMilliseconds } from './util';

const defaultCacheOptions = { maxAge: daysToMilliseconds(1) };

export const KEY_VENDOR_ENTITIES = 'vendorEntities';
export const KEY_ACCOUNT_ENTITIES = 'accountEntities';
export const KEY_BANK_ACCOUNT_ENTITIES = 'bankAccountEntities';
export const KEY_TAX_ENTITIES = 'taxEntities';
export const KEY_EXPENSE_ENTITIES = 'expenseEntities';

export const getCachedVendors = () => cache.get(KEY_VENDOR_ENTITIES, []) || [];
export const getCachedChartOfAccounts = () => cache.get(KEY_ACCOUNT_ENTITIES, []) || [];
export const getCachedBankAccounts = () => cache.get(KEY_BANK_ACCOUNT_ENTITIES, []) || [];
export const getCachedTaxes = () => cache.get(KEY_TAX_ENTITIES, []) || [];
export const getCachedExpenses = () => cache.get(KEY_EXPENSE_ENTITIES, {}) || {};

export const getVendorNameById = (id: string): string | null => {
  const vendors = getCachedVendors();
  const match = vendors.find((vendor) => vendor.contact_id === id);
  return match?.contact_name || null;
};

export const getVendorIdByName = (name: string): string | null => {
  const vendors = getCachedVendors();
  const match = vendors.find((vendor) => vendor.contact_name === name);
  return match?.contact_id || null;
};

export const getBankAccountNameById = (id: string): string | null => {
  const bankAccounts = getCachedBankAccounts();
  const match = bankAccounts.find((vendor) => vendor.account_id === id);
  return match?.account_name || null;
};

export const setCache = <Key extends keyof ZohoCache, Value extends ZohoCache[Key]>(
  key: Key,
  value: Value,
  options?: CacheConfSetOptions,
) => {
  cache.set(key, value, { ...defaultCacheOptions, ...options });
};
export const getCachedExpenseEntitiesByVendorId = (vendorId: string): ExpenseEntity[] | null => {
  const expenseEntities = getCachedExpenses() || {};
  return expenseEntities[vendorId] || null;
};

export const getLastCachedExpenseEntityByVendorId = (vendorId: string): ExpenseEntity | null => {
  const expenseEntities = getCachedExpenseEntitiesByVendorId(vendorId);
  if (expenseEntities === null || expenseEntities.length < 1) {
    return null;
  }
  return expenseEntities[0];
};

export const setCachedExpenseEntitiesForVendor = (
  vendorId: string,
  entities: ExpenseEntity[],
  options?: CacheConfSetOptions,
) => {
  const allExpenseEntities = getCachedExpenses() || {};
  allExpenseEntities[vendorId] = entities;
  setCache(KEY_EXPENSE_ENTITIES, allExpenseEntities, { ...defaultCacheOptions, ...options });
};

export const clearCache = () => {
  cache.clear();
};
