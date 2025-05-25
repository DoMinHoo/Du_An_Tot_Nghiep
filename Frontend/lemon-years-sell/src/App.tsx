// import { Refine, useGetIdentity } from '@refinedev/core';
// import { dataProvider } from '@refinedev/simple-rest';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { AdminApp } from './pages/admin/AdminApp';
// // import { ClientApp } from './ClientApp';
// import { authProvider } from './authProvider';

// interface UserIdentity {
//   role: 'admin' | 'client';
// }

// export const App: React.FC = () => {
//   const { data: identity, isLoading } = useGetIdentity<UserIdentity>();

//   if (isLoading) {
//     return <div>Đang tải...</div>;
//   }

//   return (
//     <BrowserRouter>
//       <Refine
//         dataProvider={dataProvider('https://api.example.com')} // API thực tế
//         authProvider={authProvider}
//       >
//         <Routes>
//           {identity?.role === 'admin' && (
//             <Route path="/admin/*" element={<AdminApp />} />
//           )}
//           {/* {identity?.role === 'client' && (
//             // <Route path="/client/*" element={<ClientApp />} />
//           )} */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </Refine>
//     </BrowserRouter>
//   );
// };
// src/pages/App.tsx
import simpleRestDataProvider from '@refinedev/simple-rest'; // ✅ sửa chỗ này
import { Refine, useGetIdentity } from '@refinedev/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminApp } from './pages/admin/AdminApp';
import { authProvider } from './authProvider';

// interface UserIdentity {
//   role: 'admin' | 'client';
// }

export const App: React.FC = () => {
  // const { data: identity, isLoading } = useGetIdentity<UserIdentity>();

  // if (isLoading) {
  //   return <div>Đang tải...</div>;
  // }

  return (
    <BrowserRouter>
      {/* <Refine
        dataProvider={simpleRestDataProvider('https://api.example.com')} // ✅ sử dụng biến
        authProvider={authProvider}
      > */}
      <Routes>
        {/* {identity?.role === 'admin' && ( */}
        <Route path="/admin/*" element={<AdminApp />} />
        {/* )} */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      {/* </Refine> */}
    </BrowserRouter>
  );
};

export default App;
