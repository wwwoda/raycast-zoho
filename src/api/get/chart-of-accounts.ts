import { ChartOfAccountEntity } from '../../types';
import { BaseQueryParameters, BaseResponse, fetchData, fetchPagedData } from '../api';

export interface ChartOfAccountsReponse extends BaseResponse {
  chartofaccounts: ChartOfAccountEntity[];
}

const extractChartOfAccountsFromResponse = (response: ChartOfAccountsReponse): ChartOfAccountEntity[] =>
  response.chartofaccounts;

const fetchChartOfAccounts = async (page = 1, params: BaseQueryParameters = {}) =>
  fetchData<ChartOfAccountsReponse, BaseQueryParameters>('chartofaccounts', page, params);

export const fetchAllChartOfAccounts = async (params: BaseQueryParameters = {}) =>
  fetchPagedData<ChartOfAccountEntity, ChartOfAccountsReponse, BaseQueryParameters>(
    fetchChartOfAccounts,
    extractChartOfAccountsFromResponse,
    params
  );
