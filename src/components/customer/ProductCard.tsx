import React from 'react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToSelection: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToSelection }) => {
  return (
    <div className="p-4 border rounded-lg hover:shadow-lg transition-shadow cursor-pointer bg-white">
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1">
        <strong>Price:</strong> ₹{product.price}
      </p>
      <p className="text-sm text-gray-600 mt-1">
        <strong>Category:</strong> {product.category}
      </p>
      <p className="text-sm text-gray-500 mt-2">
  {product.description && product.description.length > 50
    ? product.description.substring(0, 50) + '...'
    : product.description ? product.description : 'No description available.'}
</p>

      <button
        className="mt-4 w-full px-4 py-2 text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
        onClick={() => onAddToSelection(product)}
      >
        Add to Selection
      </button>
    </div>
  );
};

export default ProductCard;
