import { showToast, Toast } from '@raycast/api';
import { postContact } from './api/post/post-contact';
import { ExpenseData, postExpense } from './api/post/post-expense';
import { postReceipt } from './api/post/post-receipt';
import { buildFileName } from './file';
import { getVendorIdByName } from './storage';
import { Values } from './types';

export const createNewVendor = async (values: Values): Promise<string | false> => {
  const contactId = getVendorIdByName(values.newVendor);
  if (contactId !== null) {
    return Promise.resolve(contactId);
  }
  await showToast({
    style: Toast.Style.Animated,
    title: 'Creating new vendor',
  });
  const response = await postContact({
    contact_name: values.newVendor,
    contact_type: 'vendor',
  });

  if (!response.contact?.contact_id) {
    await showToast({
      style: Toast.Style.Failure,
      title: 'Error creating vendor',
      message: response.message,
    });
    return Promise.resolve(false);
  }

  return Promise.resolve(response.contact.contact_id);
};

export const createNewExpense = async (values: Values): Promise<string | false> => {
  await showToast({
    style: Toast.Style.Animated,
    title: 'Creating expense',
  });
  const data: ExpenseData = {
    account_id: values.chartOfAccount,
    date: values.expenseDate.toISOString().split('T')[0],
    amount: Number(values.amount.replace(',', '.')),
    is_inclusive_tax: true,
    paid_through_account_id: values.bankAccount,
    reference_number: values.customExpenseReference || values.expenseReference || '',
  };

  if (values.vendor) {
    data.vendor_id = values.vendor;
  }

  if (values.tax) {
    data.tax_id = values.tax;
  }

  const response = await postExpense(data);

  if (!response.expense?.expense_id) {
    await showToast({
      style: Toast.Style.Failure,
      title: 'Error creating expense',
      message: response.message,
    });
    return Promise.resolve(false);
  }

  return Promise.resolve(response.expense.expense_id);
};

export const uploadReceipt = async (expenseId: string, values: Values): Promise<boolean> => {
  await showToast({
    style: Toast.Style.Animated,
    title: 'Upoading receipt',
  });
  const response = await postReceipt(expenseId, values.receipt, buildFileName(values));
  if (!response.success) {
    await showToast({
      style: Toast.Style.Failure,
      title: 'Error uploading receipt',
      message: response.message,
    });
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};
