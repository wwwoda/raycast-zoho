import { BankAccountEntity } from '../../types';
import { BaseQueryParameters, BaseResponse, fetchData, fetchPagedData } from '../api';

export interface BankAccountsReponse extends BaseResponse {
  bankaccounts: BankAccountEntity[];
}

const extractBankAccountsFromResponse = (response: BankAccountsReponse): BankAccountEntity[] => response.bankaccounts;

export const fetchBankAccounts = async (page = 1, params: BaseQueryParameters = {}) =>
  fetchData<BankAccountsReponse, BaseQueryParameters>('bankaccounts', page, params);

export const fetchAllBankAccounts = async (params: BaseQueryParameters = {}) =>
  fetchPagedData<BankAccountEntity, BankAccountsReponse, BaseQueryParameters>(
    fetchBankAccounts,
    extractBankAccountsFromResponse,
    params,
  );
