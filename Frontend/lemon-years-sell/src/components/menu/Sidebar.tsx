import { Layout as AntdLayout, Menu } from 'antd';
import { Link, useMenu } from '@refinedev/core';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  OrderedListOutlined,
  UserOutlined,
  TagsOutlined,
} from '@ant-design/icons';

const { Sider } = AntdLayout;
export const Sidebar = ({ className }: { className?: string }) => {
  const { selectedKey } = useMenu();
  return (
    <Sider width={200} theme="dark">
      <div
        style={{
          padding: '16px',
          textAlign: 'center',
          color: '#fff',
          background: '#001529',
        }}
      >
        <h2>ADMIN</h2>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/admin">Tổng quan</Link>
        </Menu.Item>
        <Menu.Item key="products" icon={<ShoppingCartOutlined />}>
          <Link to="/admin/products">Sản phẩm</Link>
        </Menu.Item>
        <Menu.Item key="orders" icon={<OrderedListOutlined />}>
          <Link to="/admin/orders">Đơn hàng</Link>
        </Menu.Item>
        <Menu.Item key="users" icon={<UserOutlined />}>
          <Link to="/admin/users">Người dùng</Link>
        </Menu.Item>
        <Menu.Item key="clients" icon={<UserOutlined />}>
          <Link to="/admin/clients">Khách hàng</Link>
        </Menu.Item>
        <Menu.Item key="promotions" icon={<TagsOutlined />}>
          <Link to="/admin/promotions">Khuyến mãi</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
