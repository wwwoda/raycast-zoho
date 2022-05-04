import { useState, useEffect } from 'react';
import { fetchAllBankAccounts } from '../api/get/bank-accounts';
import { getCachedBankAccounts, KEY_BANK_ACCOUNT_ENTITIES, setCache } from '../storage';
import { BankAccountEntity } from '../types';

export const useBankAccounts = () => {
  const [entities, setEntities] = useState<BankAccountEntity[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const cachedData = getCachedBankAccounts();
      if (cachedData.length > 0) {
        setEntities(cachedData);
        return;
      }
      const response = await fetchAllBankAccounts();

      const filteredEntities = response.filter(
        (entity) => entity.is_active === true && ['bank', 'credit_card'].includes(entity.account_type)
      );
      setCache(KEY_BANK_ACCOUNT_ENTITIES, filteredEntities);
      setEntities(filteredEntities);
    })();
  }, []);

  return entities;
};
