// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import { Sidebar } from '../menu/Sidebar';
// import { Breadcrumbs } from '../breadcrumb/Breadcrumbs';
// import { Bell } from 'lucide-react';

// export const AdminLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-200">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Right panel */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-white h-16 shadow flex items-center justify-between px-6 border-b">
// <div className="font-semibold text-lg text-[var(--primaty)] ">
//   Website
// </div>

// <div className="flex items-center gap-4">
//   {/* Search */}
//   <input
//     type="text"
//     placeholder="Tìm kiếm ..."
//     className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//   />

//   {/* Notification */}
//   <Bell size={20} className="text-gray-600 cursor-pointer" />

//   {/* User */}
//   <div className="flex items-center gap-2">
//     <span className="text-sm">
//       Xin chào, <strong>Admin</strong>
//     </span>
//     <div className="w-8 h-8 rounded-full bg-red-700"></div>
//   </div>
// </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 bg-gray-100 p-6">
//           <Breadcrumbs />
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// src/components/layout/AdminLayout.tsx
import { Layout as AntdLayout } from 'antd';
import { Bell } from 'lucide-react';

import { Breadcrumb } from '../breadcrumb/Breadcrumbs';
import Sidebar from '../menu/Sidebar';

const { Header, Content } = AntdLayout;

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AntdLayout style={{ minHeight: '100vh' }}>
      <Sidebar />

      <AntdLayout>
        <Header
          style={{
            background: '#D3D3D3',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div className="font-semibold text-lg text-[var(--primaty)] ">
            Website
          </div>

          <div className="flex items-center gap-4">
            {/* Notification */}
            <Bell size={20} className="text-gray-600 cursor-pointer" />

            {/* User */}
            <div className="flex items-center gap-2">
              <span className="text-sm">
                Xin chào, <strong>Admin</strong>
              </span>
              <div className="w-8 h-8 rounded-full bg-red-700"></div>
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: '0px',
            background: '#fff',
            padding: '24px',
          }}
        >
          <Breadcrumb />
          {children}
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default AdminLayout;
