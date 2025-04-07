import { getPreferenceValues } from '@raycast/api';
import got from 'got';
import { getAccessToken } from '../auth';

export interface BaseResponse {
  code: number;
  message: string;
  page_context?: {
    page: number;
    per_page: number;
    has_more_page: boolean;
    report_name: string;
    applied_filter: string;
    custom_fields: Array<any>;
    sort_column: string;
    sort_order: string;
  };
}

export interface BaseQueryParameters {
  organization_id?: number;
  page?: number;
  per_page?: number;
}

export const API_URL_BASE = 'https://www.zohoapis.com/books/v3';

export const getRequestOptions = async () => ({
  headers: {
    Authorization: `Zoho-oauthtoken ${await getAccessToken()}`,
  },
  // throwHttpErrors: true,
});

export const fetchData = async <T, Params>(
  path: string,
  page = 1,
  searchParams: Params | Record<string, unknown> = {}
) => {
  const { organizationID } = getPreferenceValues();
  const requestOptions = await getRequestOptions();

  const options = {
    ...requestOptions,
    searchParams: {
      organization_id: organizationID,
      page,
      per_page: 200,
      ...searchParams,
    },
  };

  const response: T = await got.get(`${API_URL_BASE}/${path}`, options).json();
  return Promise.resolve(response);
};

export const fetchPagedData = async <T, K extends BaseResponse, Params>(
  fetchDataCallback: (page: number, params: Params | Record<string, unknown>) => Promise<K>,
  extractorCallback: (response: K) => T[],
  params: Params | Record<string, unknown> = {}
) => {
  let data: T[] = [];
  let page = 1;
  let finished = false;
  while (finished === false) {
    // eslint-disable-next-line no-await-in-loop
    const response = await fetchDataCallback(page, params);
    const responseItems = extractorCallback(response);
    data = [...data, ...responseItems];
    page += 1;
    if (page > 2 || response.page_context?.has_more_page !== true) {
      finished = true;
    }
  }
  return Promise.resolve(data);
};
