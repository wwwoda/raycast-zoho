import { getPreferenceValues } from '@raycast/api';
import { got } from 'got';
import { ContactEntity } from '../../types';
import { API_URL_BASE, getRequestOptions } from '../api';

export interface ContactData {
  contact_name: string;
  contact_type: 'vendor' | 'customer';
}

export interface PostExpenseReponse {
  success: boolean;
  message: string;
  contact?: ContactEntity;
}

export const postContact = async (contact: ContactData): Promise<PostExpenseReponse> => {
  const { organizationID } = getPreferenceValues();
  const url = `${API_URL_BASE}/contacts?organization_id=${organizationID as string}`;
  const requestOptions = await getRequestOptions();

  const response: PostExpenseReponse = await got
    .post(url, {
      json: contact,
      ...requestOptions,
    })
    .json();

  if (typeof response !== 'object' || response === null) {
    return Promise.resolve({
      success: false,
      message: 'Invalid response',
    });
  }

  if (!('contact' in response)) {
    return Promise.resolve({
      success: false,
      message: response.message || 'Message missing',
    });
  }

  return Promise.resolve(response);
};
