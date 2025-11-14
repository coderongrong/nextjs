'use client'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './globals.css';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/navigation';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


const items: MenuItem[] = [
  getItem('首页', '/', <PieChartOutlined />),
  getItem('关于', '/about', <DesktopOutlined />),
  getItem('图表构建器', '/chart-builder', <DesktopOutlined />), // 添加这一行
  getItem('低代码图表', '/builder', <DesktopOutlined />), // 添加这一行
  getItem('用户管理', 'sub1', <UserOutlined />, [
    getItem('用户列表', '/users'),
    getItem('用户设置', '/home/setting'),
  ]),
  getItem('博客', '/blog', <TeamOutlined />),
  getItem('测试页面', '/test', <FileOutlined />),
];

const App: React.FC = ({children}: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const handleRoute = (e: any) => {
    if (e.key && typeof e.key === 'string' && e.key.startsWith('/')) {
      router.push(e.key);
    }
  }
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <div className="demo-logo-vertical" />
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleRoute} />
            </Sider>
            <Layout>
              <Header style={{ padding: 0, background: '' }} />
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} />
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  {children}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default App;