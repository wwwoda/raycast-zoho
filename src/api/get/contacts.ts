import { ContactEntity } from '../../types';
import { BaseQueryParameters, BaseResponse, fetchData, fetchPagedData } from '../api';

export interface ContactsReponse extends BaseResponse {
  contacts: ContactEntity[];
}

const extractVendorsFromResponse = (response: ContactsReponse): ContactEntity[] => response.contacts;

export const fetchVendors = async (page = 1, params: BaseQueryParameters = {}) =>
  fetchData<ContactsReponse, BaseQueryParameters>('contacts', page, params);

export const fetchAllVendors = async (params: BaseQueryParameters = {}) =>
  fetchPagedData<ContactEntity, ContactsReponse, BaseQueryParameters>(fetchVendors, extractVendorsFromResponse, params);
