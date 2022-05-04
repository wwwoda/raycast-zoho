import { useState, useEffect } from 'react';
import sortOn from 'sort-on';
import { fetchAllChartOfAccounts } from '../api/get/chart-of-accounts';
import {
  getCachedChartOfAccounts as getCachedChartOfAccountEntities,
  KEY_ACCOUNT_ENTITIES,
  setCache,
} from '../storage';
import { ChartOfAccountEntity } from '../types';

export const useChartOfAccounts = () => {
  const [entities, setEntities] = useState<ChartOfAccountEntity[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const cachedData = getCachedChartOfAccountEntities();
      if (cachedData.length > 0) {
        setEntities(cachedData);
        return;
      }
      const response = await fetchAllChartOfAccounts();
      const filteredEntities = sortOn(
        response.filter((entity) => entity.account_type === 'expense'),
        'account_name'
      );
      setCache(KEY_ACCOUNT_ENTITIES, filteredEntities);
      setEntities(filteredEntities);
    })();
  }, []);

  return entities;
};
