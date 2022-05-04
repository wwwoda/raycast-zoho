import { showToast, Toast } from '@raycast/api';
import path from 'path';
import { Values } from './types';

export const validate = async (values: Values): Promise<boolean> => {
  const message = [];
  if (values.expenseDate === null) {
    message.push('Expense date missing!');
  }

  if (values.newVendorCheck && !values.newVendor) {
    message.push('Missing new vendor name');
  }

  if (values.amount === '') {
    message.push('Amount is missing!');
  } else if (/^\d+(?:[,.]?\d+){0,1}$/.test(values.amount) === false) {
    message.push('Amount not a valid number!');
  }

  if (values.isCreditCard && !values.creditCardDate) {
    message.push('Month of debiting missing!');
  }

  if (values.receipt === '') {
    message.push('You must provide a PDF receipt!');
  } else if (path.extname(values.receipt).toLowerCase() !== '.pdf') {
    message.push('Receipt must be a PDF!');
  }

  if (message.length) {
    await showToast({
      style: Toast.Style.Failure,
      title: 'Error',
      message: message.join('\n'),
    });
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};
