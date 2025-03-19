import React from "react";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./styles/DashBoard.css";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header className="header">
      <h2>Dashboard</h2>
      <div className="user-profile">
        <span>Hi, Nathan!</span>
        <Avatar icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default AppHeader;
