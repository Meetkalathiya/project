import React from 'react';
import { format } from 'date-fns';
import { Receipt, CreditCard, Banknote } from 'lucide-react';
import type { Product } from '../../types';

interface BillingInvoiceProps {
  items: Array<{ product: Product; quantity: number }>;
  onClose: () => void;
  onConfirm: (paymentMethod: 'cash' | 'online', customerName: string) => void;
}

const BillingInvoice: React.FC<BillingInvoiceProps> = ({ items, onClose, onConfirm }) => {
  const [customerName, setCustomerName] = React.useState('');
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (paymentMethod: 'cash' | 'online') => {
    if (!customerName.trim()) {
      alert('Please enter customer name');
      return;
    }
    onConfirm(paymentMethod, customerName);
  };

  return (
    <div className="p-6 border rounded-lg bg-gray-50 shadow-md">
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Receipt className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-800">Billing Invoice</h2>
        </div>
        <p className="text-sm text-gray-500">Date: {format(new Date(), 'PPP')}</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Enter customer name"
          required
        />
      </div>

      <table className="w-full mb-6">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-right py-2">Quantity</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.product.id} className="border-b">
              <td className="py-2">{item.product.name}</td>
              <td className="text-right py-2">{item.quantity}</td>
              <td className="text-right py-2">₹{item.product.price}</td>
              <td className="text-right py-2">₹{item.product.price * item.quantity}</td>
            </tr>
          ))}
          <tr className="font-bold">
            <td colSpan={3} className="py-2">Total Amount</td>
            <td className="text-right py-2">₹{total}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex gap-4 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          onClick={() => handleSubmit('cash')}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
        >
          <Banknote className="w-5 h-5" />
          Pay with Cash
        </button>
        <button
          onClick={() => handleSubmit('online')}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <CreditCard className="w-5 h-5" />
          Pay Online
        </button>
      </div>
    </div>
  );
};

export default BillingInvoice;
