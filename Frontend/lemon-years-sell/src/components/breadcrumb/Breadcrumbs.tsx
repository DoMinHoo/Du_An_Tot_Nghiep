// src/components/breadcrumb/Breadcrumbs.tsx
import { useLocation } from 'react-router-dom';

export const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="text-sm text-gray-500 p-1 ">
      <ol className="list-reset flex">
        <li>
          <a href="/" className="text-blue-600 hover:underline">
            Trang chủ
          </a>
        </li>
        {paths.map((path, index) => {
          const fullPath = '/' + paths.slice(0, index + 1).join('/');
          return (
            <li key={index} className="mx-2">
              <span>/</span>
              <a
                href={fullPath}
                className="ml-2 text-blue-600 hover:underline capitalize"
              >
                {decodeURIComponent(path)}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
