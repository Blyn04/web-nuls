import React from "react";
import { Layout, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./styles/DashBoard.css";

const { Header } = Layout;

const AppHeader =  ({ pageTitle }) => {
  const navigate = useNavigate(); 

  const goToProfile = () => {
    navigate("/profile"); 
  };

  return (
    <Header className="header">
     <h2 className="header-title">{pageTitle}</h2>

      <div className="user-profile" onClick={goToProfile} style={{ cursor: "pointer" }}>
        <span style={{ marginRight: 8 }}>Hi, Nathan!</span>
        <Avatar icon={<UserOutlined />} />
      </div>
    </Header>
  );
};

export default AppHeader;