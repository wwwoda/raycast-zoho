import { popToRoot, showToast } from '@raycast/api';
import { clearCache as clear } from './storage';

export const clearCache = async () => {
  clear();
  // eslint-disable-next-line no-void
  void showToast({ title: 'Success' }).then(() => {
    void popToRoot();
  });
};
