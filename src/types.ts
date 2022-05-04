export interface Values {
  vendor: string;
  newVendorCheck: boolean;
  newVendor: string;
  chartOfAccount: string;
  bankAccount: string;
  expenseDate: Date;
  creditCardDate: Date;
  amount: string;
  tax: string;
  expenseReference: string;
  customExpenseReference: string;
  receipt: string;
  isCreditCard: boolean;
}

/**
 * Entites
 */
export interface BankAccountEntity {
  account_id: string;
  account_name: string;
  account_type: string;
  is_active: boolean;
  is_primary_account: boolean;
}

export interface ChartOfAccountEntity {
  account_id: string;
  account_name: string;
  account_code: string;
  currency_id: string;
  currency_code: string;
  account_type: string;
  uncategorized_transactions: number;
  total_unprinted_checks: number;
  is_active: boolean;
  balance: number;
  bank_balance: number;
  bcy_balance: number;
  bank_name: string;
  is_paypal_account: boolean;
  is_direct_paypal: boolean;
  is_beta_feed: boolean;
  feed_status: string;
}

export interface ContactEntity {
  contact_id: string;
  contact_name: string;
  customer_name: string;
  vendor_name: string;
  company_name: string;
  website: string;
  language_code: string;
  language_code_formatted: string;
  contact_type: 'vendor' | 'customer';
  contact_type_formatted: string;
  status: string;
  customer_sub_type: string;
  source: string;
  is_linked_with_zohocrm: boolean;
  payment_terms: number;
  payment_terms_label: string;
  currency_id: string;
  twitter: string;
  facebook: string;
  currency_code: string;
  outstanding_receivable_amount: number;
  outstanding_receivable_amount_bcy: number;
  outstanding_payable_amount: number;
  outstanding_payable_amount_bcy: number;
  unused_credits_receivable_amount: number;
  unused_credits_payable_amount: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  mobile: string;
  portal_status: string;
  created_time: string;
  created_time_formatted: string;
  last_modified_time: string;
  last_modified_time_formatted: string;
  ach_supported: boolean;
  has_attachment: boolean;
}

export interface ExpenseEntity {
  expense_id: string;
  date: string;
  paid_through_account_name: string;
  account_name: string;
  description: string;
  currency_id: string;
  currency_code: string;
  bcy_total: number;
  bcy_total_without_tax: number;
  total: number;
  total_without_tax: number;
  is_billable: false;
  reference_number: string;
  customer_id: string;
  is_personal: false;
  customer_name: string;
  vendor_id: string;
  vendor_name: string;
  status: string;
  created_time: string;
  last_modified_time: string;
  expense_receipt_name: string;
  exchange_rate: number;
  distance: number;
  mileage_rate: number;
  mileage_unit: string;
  mileage_type: string;
  expense_type: string;
  report_id: string;
  start_reading: string;
  end_reading: string;
  report_name: string;
  report_number: string;
  has_attachment: boolean;
  custom_fields_list: string;
}

export interface TaxEntity {
  tax_id: string;
  tax_name: string;
  tax_percentage: number;
  tax_type: string;
  is_value_added: boolean;
  is_default_tax: boolean;
  is_editable: boolean;
}
