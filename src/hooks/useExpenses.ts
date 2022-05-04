import { useState, useEffect } from 'react';
import sortOn from 'sort-on';
import { fetchAllExpenses } from '../api/get/expense';
import { getCachedExpenseEntitiesByVendorId, setCachedExpenseEntitiesForVendor } from '../storage';
import { ExpenseEntity } from '../types';

export const useExpenses = (vendorId: string) => {
  const [entities, setEntities] = useState<ExpenseEntity[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      if (!vendorId) {
        return;
      }
      const cachedData = getCachedExpenseEntitiesByVendorId(vendorId);
      if (cachedData !== null && cachedData.length > 0) {
        setEntities(cachedData);
        return;
      }
      const response = await fetchAllExpenses({ vendor_id: vendorId });
      const filteredResponse = sortOn(
        response.filter((enitity) => enitity.reference_number),
        'reference_number'
      );
      setCachedExpenseEntitiesForVendor(vendorId, filteredResponse);
      setEntities(filteredResponse);
    })();
  }, [vendorId]);

  return entities;
};
