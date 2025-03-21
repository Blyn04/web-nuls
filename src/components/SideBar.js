import React, { useState, useEffect } from "react";
import { Layout, Menu, Modal } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  HistoryOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles/DashBoard.css";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");

  useEffect(() => {
    const path = location.pathname.replace(/\/$/, "");
    switch (path.toLowerCase()) {
      case "/dashboard":
        setSelectedKey("1");
        break;

      case "/inventory":
        setSelectedKey("2");
        break;

      case "/pending-request":
        setSelectedKey("3");
        break;

      case "/borrow-catalog":
        setSelectedKey("4");
        break;

      case "/history":
        setSelectedKey("5");
        break;

      default:
        setSelectedKey("1");
        break;
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/dashboard", { replace: true });
        break;

      case "2":
        navigate("/inventory", { replace: true });
        break;

      case "3":
        navigate("/pending-request", { replace: true });
        break;

      case "4":
        navigate("/borrow-catalog", { replace: true });
        break;

      case "5":
        navigate("/history", { replace: true });
        break;

      case "6":
        confirmSignOut();
        break;

      default:
        break;
    }
  };

  const confirmSignOut = () => {
    console.log("Sign out confirmation triggered"); // Debug
    Modal.confirm({
      title: "Sign Out",
      content: "Are you sure you want to sign out?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        localStorage.clear();
        navigate("/login", { replace: true });
      },
    });
  };  

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={220}
      className="sidebar"
      trigger={null}
    >

      <div className="logo-container" onClick={toggleSidebar}>
        <div className="logo">
          {!collapsed ? (
            <>
              <h3 className="logo-title">NU MOA</h3>
              <p className="logo-subtitle">Laboratory System</p>
            </>
          ) : (
            <h3 className="logo-title">NU</h3>
          )}
        </div>

        {collapsed ? (
          <MenuUnfoldOutlined className="toggle-icon" />
        ) : (
          <MenuFoldOutlined className="toggle-icon" />
        )}
      </div>

      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
        items={[
          {
            key: "1",
            icon: <DashboardOutlined />,
            label: "Dashboard",
          },
          {
            key: "2",
            icon: <UnorderedListOutlined />,
            label: "Inventory",
          },
          {
            key: "3",
            icon: <FileTextOutlined />,
            label: "Pending Requests",
          },
          {
            key: "4",
            icon: <AppstoreOutlined />,
            label: "Borrow Catalog",
          },
          {
            key: "5",
            icon: <HistoryOutlined />,
            label: "History",
          },
          {
            key: "6",
            icon: <LogoutOutlined />,
            label: "Sign Out",
            danger: true, 
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
