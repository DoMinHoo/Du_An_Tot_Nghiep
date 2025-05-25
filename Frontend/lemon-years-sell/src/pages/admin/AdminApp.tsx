// src/pages/admin/AdminApp.tsx
import { Routes, Route } from 'react-router-dom';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Dashboard } from './Dashboard';
import Product from './Product';

export const AdminApp: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="products" element={<Product />} />
        <Route path="orders" element={<div>Đơn hàng</div>} />
        <Route path="users" element={<div>Người dùng</div>} />
        <Route path="clients" element={<div>Khách hàng</div>} />
        <Route path="promotions" element={<div>Khuyến mãi</div>} />
      </Routes>
    </AdminLayout>
  );
};
