import React from "react";
import { Modal, Button } from "antd";

const SuccessModal = ({ isVisible, onClose }) => {
  return (
    <Modal
      title="Login Successful"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="close" type="primary" onClick={onClose}>
          OK
        </Button>,
      ]}
    >
      <p>Welcome to the Dashboard!</p>
    </Modal>
  );
};

export default SuccessModal;
