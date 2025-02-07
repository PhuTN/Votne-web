import React, { useState, useEffect } from "react";
import { Table, Button, Card, Modal, Form, Input, InputNumber } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const LoyaltyProgramSettings = ({ settings, setSettings }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form] = Form.useForm();

  // Lấy dữ liệu từ settings nếu có
  useEffect(() => {
    if (settings?.rewardMilestones) {
      form.resetFields();
    }
  }, [settings, form]);

  const showModal = (index = null) => {
    if (index !== null) {
      const milestone = settings.rewardMilestones[index];
      form.setFieldsValue(milestone);
    } else {
      form.resetFields();
    }
    setEditingIndex(index);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingIndex !== null) {
        const updatedMilestones = [...settings.rewardMilestones];
        updatedMilestones[editingIndex] = values;
        setSettings((prev) => ({ ...prev, rewardMilestones: updatedMilestones }));
      } else {
        setSettings((prev) => ({
          ...prev,
          rewardMilestones: [...(prev.rewardMilestones || []), values],
        }));
      }
      setIsModalVisible(false);
    });
  };

  const handleDeleteMilestone = (index) => {
    const updatedMilestones = settings.rewardMilestones.filter((_, i) => i !== index);
    setSettings((prev) => ({ ...prev, rewardMilestones: updatedMilestones }));
  };

  return (
    <Card title="Cài Đặt Chương Trình Khách Hàng Thân Thiết">
      <Button style={{ width: "25%", margin: "10px" }} onClick={() => showModal()}>
        Thêm Mốc Thưởng
      </Button>
      <Table
        dataSource={settings.rewardMilestones || []}
        rowKey={(record, index) => index}
        pagination={false}
        bordered
        size="small"
        columns={[
          { title: "Tên Mốc", dataIndex: "milestoneName" },
          { title: "Số Tiền", dataIndex: "amount" },
          { title: "Số Đơn Hàng", dataIndex: "orderCount" },
          { title: "Giảm Giá Tối Đa", dataIndex: "maxDiscountAmount" },
          { title: "Tỉ Lệ Giảm Giá", dataIndex: "discountPercentage" },
          {
            title: "Hành Động",
            render: (_, record, index) => (
              <div>
                <Button icon={<EditOutlined />} onClick={() => showModal(index)} style={{ marginRight: 10 }} />
                <Button icon={<DeleteOutlined />} onClick={() => handleDeleteMilestone(index)} danger />
              </div>
            ),
          },
        ]}
      />

      {/* Modal for adding or editing milestone */}
      <Modal
        title={editingIndex !== null ? "Chỉnh Sửa Mốc Thưởng" : "Thêm Mốc Thưởng"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="milestoneName" label="Tên Mốc" rules={[{ required: true, message: "Vui lòng nhập tên mốc!" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Số Tiền" rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="orderCount" label="Số Đơn Hàng" rules={[{ required: true, message: "Vui lòng nhập số đơn hàng!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="maxDiscountAmount" label="Giảm Giá Tối Đa" rules={[{ required: true, message: "Vui lòng nhập giảm giá tối đa!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="discountPercentage" label="Tỉ Lệ Giảm Giá" rules={[{ required: true, message: "Vui lòng nhập tỉ lệ giảm giá!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default LoyaltyProgramSettings;
