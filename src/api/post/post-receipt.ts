import { getPreferenceValues } from '@raycast/api';
import FormData from 'form-data';
import fs from 'fs';
import got from 'got';
import { API_URL_BASE, getRequestOptions } from '../api';

export interface PostReceiptResponse {
  success: boolean;
  message: string;
}

export const postReceipt = async (expenseId: string, path: string, fileName: string): Promise<PostReceiptResponse> => {
  const { organizationID } = getPreferenceValues();
  const url = `${API_URL_BASE}/expenses/${expenseId}/receipt?organization_id=${organizationID as string}`;
  const requestOptions = await getRequestOptions();
  const form = new FormData();
  const stream = fs.createReadStream(path);

  form.append('receipt', stream, fileName);

  const response: {
    code?: number;
    message?: string;
  } | null = await got
    .post(url, {
      ...requestOptions,
      body: form,
      encoding: 'utf8',
    })
    .json();

  if (typeof response !== 'object' || response === null) {
    return Promise.resolve({
      success: false,
      message: 'Invalid response',
    });
  }

  return Promise.resolve({
    success: response.code === 0,
    message: response.message || 'Message is missing',
  });
};
