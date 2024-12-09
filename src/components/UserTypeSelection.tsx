import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Users, ClipboardList } from 'lucide-react';

const UserTypeSelection: React.FC = () => {
  const navigate = useNavigate();

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

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full">
        {/* Vendor Portal */}
        <button
          onClick={() => navigate('/vendor')}
          className="relative bg-gradient-to-br from-indigo-500 to-purple-500 p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(128,90,213,0.7)] flex flex-col items-center gap-4 group text-white"
        >
          <div className="absolute inset-0 opacity-20 bg-pattern-dots-md group-hover:opacity-30 transition-opacity"></div>
          <Store className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
          <div className="text-center z-10">
            <h2 className="text-3xl font-bold">Vendor Portal</h2>
            <p className="mt-2 text-sm text-gray-200">Manage inventory, create bills, and track sales</p>
          </div>
        </button>

        {/* Customer Portal */}
        <button
          onClick={() => navigate('/customer')}
          className="relative bg-gradient-to-br from-green-400 to-teal-500 p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] flex flex-col items-center gap-4 group text-white"
        >
          <div className="absolute inset-0 opacity-20 bg-pattern-dots-md group-hover:opacity-30 transition-opacity"></div>
          <Users className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
          <div className="text-center z-10">
            <h2 className="text-3xl font-bold">Customer Portal</h2>
            <p className="mt-2 text-sm text-gray-200">View products, make purchases, and track orders</p>
          </div>
        </button>

        {/* History of Orders */}
        <button
          onClick={() => navigate('/history')}
          className="relative bg-gradient-to-br from-orange-400 to-yellow-500 p-8 rounded-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(252,211,77,0.7)] flex flex-col items-center gap-4 group text-white"
        >
          <div className="absolute inset-0 opacity-20 bg-pattern-dots-md group-hover:opacity-30 transition-opacity"></div>
          <ClipboardList className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
          <div className="text-center z-10">
            <h2 className="text-3xl font-bold">History of Orders</h2>
            <p className="mt-2 text-sm text-gray-200">Review past orders and track order history</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
