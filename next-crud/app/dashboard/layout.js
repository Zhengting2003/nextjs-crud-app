"use client";

import { Layout, Menu } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }) {
  const router = useRouter();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <Sider>
        <div style={{ color: "white", padding: 20, fontWeight: "bold" }}>
          Admin Panel
        </div>

        <Menu
          theme="dark"
          mode="inline"
          onClick={(item) => router.push(item.key)}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "/dashboard/users",
              icon: <UserOutlined />,
              label: "Users",
            },
          ]}
        />
      </Sider>

      {/* Main */}
      <Layout>
        <Header style={{ background: "#fff" }}>
          Welcome Admin
        </Header>

        <Content style={{ padding: 20 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}