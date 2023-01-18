import getPreferenceValues from './preferences';
import { getBankAccountNameById, getVendorNameById } from './storage';
import { Values } from './types';

// const removeBackslashes = (val: string): string => val.replace(/[\\]/g, '');

const toTwoDigit = (n: number): string => `0${n}`.slice(-2);

export const buildFileNameWithoutExtension = (values: Values): string =>
  [
    'Rechnung',
    getBankAccountNameById(values.bankAccount),
    values.expenseDate.toISOString().slice(0, 10).replace(/-/g, ''),
    `EUR ${Number(values.amount.replace(',', '.')).toFixed(2)}`,
    getVendorNameById(values.vendor),
    values.customExpenseReference || values.expenseReference,
  ]
    .filter((n) => n)
    .join(' - ');

export const buildFileName = (values: Values): string => `${buildFileNameWithoutExtension(values)}.pdf`;

const getDestinationPath = (values: Values): string => {
  const { isCreditCard, creditCardDate, expenseDate, bankAccount } = values;
  const { destPath } = getPreferenceValues();
  return [
    destPath,
    (isCreditCard ? creditCardDate : expenseDate).getFullYear(),
    toTwoDigit((isCreditCard ? creditCardDate : expenseDate).getMonth() + 1),
    isCreditCard === true && getBankAccountNameById(bankAccount),
  ]
    .filter((n) => n)
    .join('/');
};

export const getDestinationFile = (values: Values): string => `${getDestinationPath(values)}/${buildFileName(values)}`;
