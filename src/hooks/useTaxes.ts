import { useState, useEffect } from 'react';
import { fetchAllTaxes } from '../api/get/taxes';
import { getCachedTaxes, KEY_TAX_ENTITIES, setCache } from '../storage';
import { TaxEntity } from '../types';

export const useTaxes = () => {
  const [entities, setEntities] = useState<TaxEntity[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const cachedData = getCachedTaxes();
      if (cachedData.length > 0) {
        setEntities(cachedData);
        return;
      }
      const response = await fetchAllTaxes();
      const filteredEntities = response.filter((entity) => entity.tax_name.includes('Vorsteuer'));
      setCache(KEY_TAX_ENTITIES, filteredEntities);
      setEntities(filteredEntities);
    })();
  }, []);

  return entities;
};
