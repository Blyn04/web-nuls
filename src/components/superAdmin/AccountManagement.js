import React, { useState, useEffect } from "react";
import {
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import Sidebar from "../SideBar";
import AppHeader from "../Header";
import "../styles/superAdminStyle/AccountManagement.css";

const { Content } = Layout;
const { Option } = Select;

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [form] = Form.useForm();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    setAccounts([
      {
        id: 1,
        name: "Nathan",
        email: "nathan@example.com",
        department: "Nursing",
        role: "Admin",
      },
      {
        id: 2,
        name: "Mariana",
        email: "mariana@example.com",
        department: "Medical Technology",
        role: "User",
      },
    ]);
  }, []);

  const showModal = (account) => {
    if (account) {
      setEditingAccount(account);
      form.setFieldsValue(account);
    } else {
      setEditingAccount(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleSave = (values) => {
    if (editingAccount) {
      const updatedAccounts = accounts.map((acc) =>
        acc.id === editingAccount.id ? { ...acc, ...values } : acc
      );
      setAccounts(updatedAccounts);
      message.success("Account updated successfully!");
    } else {
      const newAccount = { ...values, id: Date.now() };
      setAccounts([...accounts, newAccount]);
      message.success("Account added successfully!");
    }
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    const updatedAccounts = accounts.filter((acc) => acc.id !== id);
    setAccounts(updatedAccounts);
    message.success("Account deleted successfully!");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => showModal(record)}
          />
          <Popconfirm
            title="Are you sure to delete this account?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar setPageTitle={setPageTitle} />

      <Layout className="site-layout">
        <AppHeader pageTitle={pageTitle} />

        <Content className="account-content">
          <div className="account-header">
            <h2>Account Management</h2>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => showModal(null)}
            >
              Add Account
            </Button>
          </div>

          {/* Account Table */}
          <Table
            dataSource={accounts}
            columns={columns}
            rowKey="id"
            className="account-table"
          />

          {/* Modal for Add/Edit Account */}
          <Modal
            title={editingAccount ? "Edit Account" : "Add Account"}
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            onOk={() => form.submit()}
            okText="Save"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave}
              initialValues={{ role: "User", department: "Nursing" }}
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter the name" }]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter the email" },
                  { type: "email", message: "Enter a valid email" },
                ]}
              >
                <Input placeholder="Enter Email" />
              </Form.Item>

              {/* Department Field */}
              <Form.Item
                name="department"
                label="Department"
                rules={[
                  {
                    required: true,
                    message: "Please select a department!",
                  },
                ]}
              >
                <Select placeholder="Select Department">
                  <Option value="Nursing">Nursing</Option>
                  <Option value="Medical Technology">Medical Technology</Option>
                  <Option value="Dentistry">Dentistry</Option>
                  <Option value="Pharmacy">Pharmacy</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select placeholder="Select Role">
                  <Option value="Admin">Admin</Option>
                  <Option value="User">User</Option>
                  <Option value="Super Admin">Super Admin</Option>
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AccountManagement;
