import { getPreferenceValues } from '@raycast/api';
import { got } from 'got';
import { ExpenseEntity } from '../../types';
import { API_URL_BASE, getRequestOptions } from '../api';

export interface ExpenseData {
  account_id: string;
  date: string;
  amount: number;
  vendor_id?: string;
  paid_through_account_id?: string;
  tax_id?: string;
  is_inclusive_tax?: boolean;
  reference_number?: string;
}

export interface PostExpenseReponse {
  success: boolean;
  message: string;
  expense?: ExpenseEntity;
}

export const postExpense = async (expense: ExpenseData): Promise<PostExpenseReponse> => {
  const { organizationID } = getPreferenceValues();
  const url = `${API_URL_BASE}/expenses?organization_id=${organizationID as string}`;
  const requestOptions = await getRequestOptions();

  const response: {
    code?: number;
    message?: string;
    expense?: ExpenseEntity;
  } | null = await got
    .post(url, {
      json: expense,
      ...requestOptions,
    })
    .json();

  if (typeof response !== 'object' || response === null) {
    return Promise.resolve({
      success: false,
      message: 'Invalid response',
    });
  }

  if (!('expense' in response)) {
    return Promise.resolve({
      success: false,
      message: response.message || 'Message missing',
    });
  }

  return Promise.resolve({
    success: true,
    message: response.message || '',
    expense: response.expense,
  });
};
