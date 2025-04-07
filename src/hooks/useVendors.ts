import { useState, useEffect } from 'react';
import { fetchAllVendors } from '../api/get/contacts';
import { getCachedVendors, KEY_VENDOR_ENTITIES, setCache } from '../storage';
import { ContactEntity } from '../types';

export const useVendors = () => {
  const [entities, setEntities] = useState<ContactEntity[]>([]);

  useEffect(() => {
    (async () => {
      const cachedData = getCachedVendors();
      if (cachedData.length > 0) {
        setEntities(cachedData);
        return;
      }
      const response = await fetchAllVendors();
      const filteredEntities = response.filter(
        (entity) => entity.contact_type === 'vendor' && entity.status === 'active',
      );
      setCache(KEY_VENDOR_ENTITIES, filteredEntities);
      setEntities(filteredEntities);
    })();
  }, []);

  return entities;
};
