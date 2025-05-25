// src/pages/admin/Dashboard.tsx
import {
  ShoppingCart,
  Users,
  Package,
  Percent,
  LayoutDashboard,
} from 'lucide-react';

const stats = [
  {
    label: 'Sản phẩm',
    value: 120,
    icon: <Package className="w-8 h-8 text-blue-600" />,
    bg: 'bg-blue-100',
  },
  {
    label: 'Đơn hàng',
    value: 85,
    icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
    bg: 'bg-green-100',
  },
  {
    label: 'Người dùng',
    value: 43,
    icon: <Users className="w-8 h-8 text-purple-600" />,
    bg: 'bg-purple-100',
  },
  {
    label: 'Khuyến mãi',
    value: 10,
    icon: <Percent className="w-8 h-8 text-orange-600" />,
    bg: 'bg-orange-100',
  },
];

export const Dashboard = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <LayoutDashboard className="w-7 h-7 text-gray-700" />
        <h1 className="text-3xl font-semibold text-gray-800">
          Bảng điều khiển
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition-shadow duration-300 border border-gray-100"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.label}</p>
              <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            </div>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg}`}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
