import { ExpenseEntity } from '../../types';
import { BaseQueryParameters, BaseResponse, fetchData, fetchPagedData } from '../api';

// https://www.zoho.com/books/api/v3/#Expenses_List_Expenses
export interface ExpenseQueryParameters extends BaseQueryParameters {
  description?: string;
  reference_number?: string;
  reference_number_startswith?: string;
  reference_number_contains?: string;
  // Format [yyyy-mm-dd]
  date?: string;
  date_start?: string;
  date_end?: string;
  date_before?: string;
  date_after?: string;
  status?: 'unbilled' | 'invoiced' | 'reimbursed' | 'non-billable' | 'billable';
  amount?: number;
  amount_less_than?: number;
  amount_less_equals?: number;
  amount_greater_than?: number;
  amount_greater_equals?: number;
  account_name?: string;
  customer_name?: string;
  customer_name_starts_with?: string;
  customer_name_contains?: string;
  vendor_name?: string;
  vendor_name_starts_with?: string;
  vendor_name_contains?: string;
  customer_id?: string;
  customer_id_starts_with?: string;
  customer_id_contains?: string;
  vendor_id?: string;
  recurring_expense_id?: string;
  paid_through_account_id?: string;
  search_text?: string;
  sort_column?: 'date' | 'account_name' | 'total' | 'bcy_total' | 'reference_number' | 'customer_name' | 'created_time';
  filter_by?:
    | 'Status.All'
    | 'Status.Billable'
    | 'Status.Nonbillable'
    | 'Status.Reimbursed'
    | 'Status.InvoicedStatus.Unbilled';
}

export interface ExpensesReponse extends BaseResponse {
  expenses: ExpenseEntity[];
}

export const extractExpensesFromResponse = (response: ExpensesReponse): ExpenseEntity[] => response.expenses;

const fetchExpenses = async (page = 1, params: ExpenseQueryParameters = {}) =>
  fetchData<ExpensesReponse, ExpenseQueryParameters>('expenses', page, params);

export const fetchAllExpenses = async (params: ExpenseQueryParameters = {}) =>
  fetchPagedData<ExpenseEntity, ExpensesReponse, ExpenseQueryParameters>(
    fetchExpenses,
    extractExpensesFromResponse,
    params,
  );
