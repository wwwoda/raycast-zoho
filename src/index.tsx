import { Action, ActionPanel, Form } from '@raycast/api';
import { useState } from 'react';
import { useBankAccounts } from './hooks/useBankAccounts';
import { useChartOfAccounts } from './hooks/useChartOfAccounts';
import { useExpenses } from './hooks/useExpenses';
import { useTaxes } from './hooks/useTaxes';
import { useVendors } from './hooks/useVendors';
import { Values } from './types';
import { validate } from './validate';
import { handleSubmit } from './submit';
import { clearCache } from './clearCache';

export default function Command() {
  const [checkedNewVendor, setCheckedNewVendor] = useState<boolean>(false);
  const [vendor, setVendor] = useState('');
  const [newVendor, setNewVendor] = useState('');
  const [account, setAccount] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [expense, setExpense] = useState('');
  const [customExpenseReference, setCustomExpenseReference] = useState('');
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [tax, setTax] = useState('');
  const [expenseDate, setExpenseDate] = useState<Date | null>();
  const [creditCardDate, setCreditCardDate] = useState<Date | null>();
  const [amount, setAmount] = useState('');
  const [receipt, setReceipt] = useState('');
  const vendors = useVendors();
  const accounts = useChartOfAccounts();
  const bankAccounts = useBankAccounts();
  const taxes = useTaxes();
  const expenses = useExpenses(vendor);

  return (
    <Form
      actions={(
        <ActionPanel>
          <Action.SubmitForm
            title="Submit Expense"
            onSubmit={async (input: Values) => {
              if (await validate(input)) {
                await handleSubmit({
                  ...input,
                  isCreditCard,
                });
              }
            }}
          />
          <Action title="Clear Cache" onAction={clearCache} />
        </ActionPanel>
      )}
    >
      <Form.DatePicker id="expenseDate" title="Expense Date" value={expenseDate} onChange={setExpenseDate} />
      <Form.Dropdown id="vendor" title="Select Vendor" value={vendor} onChange={setVendor}>
        <Form.Dropdown.Item value="" title="Keine Angabe" key="0" />
        {vendors.map((entity) => (
          <Form.Dropdown.Item
            value={entity.contact_id}
            title={entity.contact_name}
            key={entity.contact_id}
          />
        ))}
      </Form.Dropdown>
      <Form.Checkbox
        id="newVendorCheck"
        label="Create New Vendor"
        value={checkedNewVendor}
        onChange={setCheckedNewVendor}
      />
      {checkedNewVendor && (
        <Form.TextField
          id="newVendor"
          title="Create New Vendor"
          placeholder="Amazon"
          value={newVendor}
          onChange={setNewVendor}
        />
      )}
      <Form.Dropdown id="chartOfAccount" title="Select Account" value={account} onChange={setAccount} storeValue>
        {accounts.map((entity) => (
          <Form.Dropdown.Item
            value={entity.account_id}
            title={entity.account_name}
            key={entity.account_id}
          />
        ))}
      </Form.Dropdown>
      <Form.Dropdown
        id="bankAccount"
        title="Select Bank Account"
        value={bankAccount}
        onChange={(id) => {
          setBankAccount(id);
          const entity = bankAccounts.find((ba) => ba.account_id === id);
          setIsCreditCard(entity?.account_type === 'credit_card');
        }}
        storeValue
      >
        {bankAccounts.map((entity) => (
          <Form.Dropdown.Item
            value={entity.account_id}
            title={entity.account_name}
            key={entity.account_id}
          />
        ))}
      </Form.Dropdown>
      {isCreditCard && (
        <Form.DatePicker
          id="creditCardDate"
          title="Debiting month"
          value={creditCardDate}
          onChange={setCreditCardDate}
        />
      )}
      <Form.TextField id="amount" title="Amount" placeholder="49,9" value={amount} onChange={setAmount} />
      <Form.Dropdown id="tax" title="Select Tax" value={tax} onChange={setTax}>
        <Form.Dropdown.Item value="" title="No Tax" key="0" />
        {taxes.map((entity) => (
          <Form.Dropdown.Item value={entity.tax_id} title={entity.tax_name} key={entity.tax_id} />
        ))}
      </Form.Dropdown>
      {expenses.length > 0 && (
        <Form.Dropdown id="expenseReference" title="Select Expense" value={expense} onChange={setExpense}>
          <Form.Dropdown.Item value="" title="No Selection" key="0" />
          {expenses.map((entity) => (
            <Form.Dropdown.Item
              value={entity.reference_number}
              title={entity.reference_number}
              key={entity.expense_id}
            />
          ))}
        </Form.Dropdown>
      )}
      <Form.TextField
        id="customExpenseReference"
        title="Custom Expense Reference"
        placeholder="Printer Paper"
        value={customExpenseReference}
        onChange={setCustomExpenseReference}
      />
      <Form.TextField
        id="receipt"
        title="Select Receipt PDF"
        placeholder="Focus, then drag and release PDF here"
        value={receipt}
        onChange={setReceipt}
      />
    </Form>
  );
}
