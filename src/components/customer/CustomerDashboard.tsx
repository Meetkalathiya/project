import React, { useState, useEffect } from 'react';
import type { Product, Bill } from '../../types';
import ProductCard from './ProductCard';
import BillingInvoice from './BillingInvoice';

const CustomerDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<{ product: Product; quantity: number }[]>([]);
  const [showBilling, setShowBilling] = useState(false);
  const [bills, setBills] = useState<Bill[]>([]);
  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); // Adjust the URL if your API endpoint is different
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToSelection = (product: Product) => {
    setSelectedProducts((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleBillingConfirm = (paymentMethod: 'cash' | 'online', customerName: string) => {
    if (selectedProducts.length === 0 || !customerName.trim()) {
      alert('Please add products to the selection and enter a customer name.');
      return;
    }

    const newBill: Bill = {
      id: Date.now().toString(),
      items: [...selectedProducts],
      total: selectedProducts.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
      paymentMethod,
      customerName,
      date: new Date()
    };

    setBills((prevBills) => [...prevBills, newBill]);
    setSelectedProducts([]);
    setShowBilling(false);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Products List */}
      <div className="w-2/3 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToSelection={handleAddToSelection}
            />
          ))}
        </div>
      </div>

      {/* POS Panel */}
      <div className="w-1/3 bg-white shadow-lg p-6">
        {selectedProducts.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Selected Products</h2>
            <ul>
              {selectedProducts.map((item) => (
                <li key={item.product.id} className="flex justify-between py-2">
                  <span>{item.product.name} (x{item.quantity})</span>
                  <span>₹{item.product.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Enter Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => setShowBilling(true)}
                className="mt-4 w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Proceed to Billing
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">Add products to the selection to proceed with billing.</p>
        )}
      </div>

      {/* Billing Invoice */}
      {showBilling && (
        <BillingInvoice
          items={selectedProducts}
          onClose={() => setShowBilling(false)}
          onConfirm={handleBillingConfirm}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
