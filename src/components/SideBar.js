import React, { useState, useEffect } from "react";
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
import CustomModal from "./customs/CustomModal";
import "./styles/SideBar.css";

const { Sider } = Layout;

const Sidebar = ({ setPageTitle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const state = location.state || {};
    setRole(state.role || "user");

    const path = location.pathname.replace(/\/$/, "");
    switch (path.toLowerCase()) {
      case "/dashboard":
        setSelectedKey("1");
        setPageTitle("Dashboard");
        break;

      case "/inventory":
        setSelectedKey("2");
        setPageTitle("Inventory");
        break;

      case "/pending-request":
        setSelectedKey("3");
        setPageTitle("Pending Requests");
        break;

      case "/borrow-catalog":
        setSelectedKey("4");
        setPageTitle("Borrow Catalog");
        break;

      case "/history":
        setSelectedKey("5");
        setPageTitle("History");
        break;

      case "/accounts":
        setSelectedKey("7");
        setPageTitle("Accounts");
        break;

      case "/requisition":
        setSelectedKey("8");
        setPageTitle("Requisition");
        break;

      case "/request-list":
        setSelectedKey("9");
        setPageTitle("Request List");
        break;

      case "/activity-log":
        setSelectedKey("10");
        setPageTitle("Activity Log");
        break;

      default:
        setSelectedKey("1");
        setPageTitle("Dashboard");
        break;
    }
  }, [location.pathname, setPageTitle]);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        navigate("/dashboard");
        if (typeof setPageTitle === "function") setPageTitle("Dashboard");
        break;

      case "2":
        navigate("/inventory");
        if (typeof setPageTitle === "function") setPageTitle("Inventory");
        break;

      case "3":
        navigate("/pending-request");
        if (typeof setPageTitle === "function") setPageTitle("Pending Requests");
        break;

      case "4":
        navigate("/borrow-catalog");
        if (typeof setPageTitle === "function") setPageTitle("Borrow Catalog");
        break;

      case "5":
        navigate("/history");
        if (typeof setPageTitle === "function") setPageTitle("History");
        break;

      case "6":
        setShowModal(true);
        break;

      case "7":
        navigate("/accounts");
        if (typeof setPageTitle === "function") setPageTitle("Accounts");
        break;

      case "8":
        navigate("/requisition");
        if (typeof setPageTitle === "function") setPageTitle("Requisition");
        break;

      case "9":
        navigate("/request-list");
        if (typeof setPageTitle === "function") setPageTitle("Request List");
        break;

      case "10":
        navigate("/activity-log");
        if (typeof setPageTitle === "function") setPageTitle("Activity Log");
        break;

      default:
        break;
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const superAdminMenuItems = [
    {
      key: "7",
      icon: <UserOutlined />,
      label: "Accounts",
    },
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: "Sign Out",
      danger: true,
    },
  ];

  const regularMenuItems = [
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
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: "Sign Out",
      danger: true,
    },
  ];

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
        items={role === "super-admin" ? superAdminMenuItems : regularMenuItems}
      />

      <CustomModal
        visible={showModal}
        onConfirm={handleSignOut}
        onCancel={() => setShowModal(false)}
      />
    </Sider>
  );
};

export default Sidebar;
