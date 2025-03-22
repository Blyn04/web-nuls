import React, { useState, useEffect, memo } from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UnorderedListOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  HistoryOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
  UserOutlined,
  FileDoneOutlined,
  SnippetsOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import CustomModal from "./CustomModal"; // ✅ Import Custom Modal
import "./styles/SideBar.css";

const { Sider } = Layout;

const Sidebar = memo(() => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const [showModal, setShowModal] = useState(false); // ✅ Track modal visibility

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
      case "/accounts":
        setSelectedKey("7");
        break;
      case "/requisition":
        setSelectedKey("8");
        break;
      case "/request-list":
        setSelectedKey("9");
        break;
      case "/activity-log":
        setSelectedKey("10");
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
        setShowModal(true); // ✅ Trigger Custom Modal
        break;
      case "7":
        navigate("/accounts", { replace: true });
        break;
      case "8":
        navigate("/requisition", { replace: true });
        break;
      case "9":
        navigate("/request-list", { replace: true });
        break;
      case "10":
        navigate("/activity-log", { replace: true });
        break;
      default:
        break;
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/", { replace: true });
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
          {
            key: "7",
            icon: <UserOutlined />,
            label: "Accounts",
          },
          {
            key: "8",
            icon: <FileDoneOutlined />,
            label: "Requisition",
          },
          {
            key: "9",
            icon: <SnippetsOutlined />,
            label: "Request List",
          },
          {
            key: "10",
            icon: <ClockCircleOutlined />,
            label: "Activity Log",
          },
        ]}
      />

      {/* ✅ Custom Modal for Sign Out */}
      <CustomModal
        visible={showModal}
        onConfirm={handleSignOut}
        onCancel={() => setShowModal(false)}
      />
    </Sider>
  );
});

export default Sidebar;
