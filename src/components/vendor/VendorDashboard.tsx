import React, { useState } from 'react';
import { LayoutDashboard, TrendingUp, Package } from 'lucide-react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import type { Product } from '../../types';

const VendorDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'NPK Fertilizer',
      price: 1200,
      quantity: 100,
      category: 'Chemical Fertilizer',
      description: 'Balanced nutrient fertilizer'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString() // Simple ID generation
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleEditProduct = (product: Product) => {
    // Implement edit functionality
    console.log('Edit product:', product);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
      }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-200 via-indigo-200 to-pink-100 animate-gradientMove" />

      {/* Interactive Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-5 h-5 bg-white opacity-40 rounded-full blur-xl animate-floating"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Dashboard Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex items-center gap-4">
              <LayoutDashboard className="w-8 h-8 text-emerald-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
                <p className="text-2xl font-bold text-emerald-600">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
                <p className="text-2xl font-bold text-blue-600">₹24,500</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-purple-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Low Stock Items</h3>
                <p className="text-2xl font-bold text-purple-600">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product List and Form */}
        <ProductList
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
          onAddNew={() => setShowAddForm(true)}
        />

        {showAddForm && (
          <ProductForm
            onSubmit={handleAddProduct}
            onClose={() => setShowAddForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
