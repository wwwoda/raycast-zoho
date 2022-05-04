import { TaxEntity } from '../../types';
import { BaseQueryParameters, BaseResponse, fetchData, fetchPagedData } from '../api';

export interface TaxesReponse extends BaseResponse {
  taxes: TaxEntity[];
}

const extractTaxesFromResponse = (response: TaxesReponse): TaxEntity[] => response.taxes;

export const fetchTaxes = async (page = 1, params: BaseQueryParameters = {}) =>
  fetchData<TaxesReponse, BaseQueryParameters>('settings/taxes', page, params);

export const fetchAllTaxes = async (params: BaseQueryParameters = {}) =>
  fetchPagedData<TaxEntity, TaxesReponse, BaseQueryParameters>(fetchTaxes, extractTaxesFromResponse, params);
