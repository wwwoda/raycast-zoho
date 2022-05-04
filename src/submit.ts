import { popToRoot, showToast } from '@raycast/api';
import { getDestinationFile } from './file';
import { move } from './move-file';
import { createNewExpense, createNewVendor, uploadReceipt } from './zoho-steps';
import { Values } from './types';

export const handleSubmit = async (values: Values) => {
  const vendorId = values.newVendorCheck && values.newVendor ? await createNewVendor(values) : values.vendor;
  if (vendorId === false) {
    return;
  }
  const updatedValue = vendorId ? { vendor: vendorId } : {};
  const expenseId = await createNewExpense({ ...values, ...updatedValue });
  if (!expenseId) {
    return;
  }
  const success = await uploadReceipt(expenseId, values);
  if (!success) {
    return;
  }

  move(
    values.receipt,
    getDestinationFile(values),
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    async () => {
      // eslint-disable-next-line no-void
      void showToast({ title: 'Success' }).then(() => {
        void popToRoot();
      });
    }
  );
};
