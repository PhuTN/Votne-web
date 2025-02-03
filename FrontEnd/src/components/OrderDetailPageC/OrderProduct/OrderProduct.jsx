import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Form, Rate, Typography, Input, notification } from "antd";
import { addReview } from "../../../redux/Slicer/reviewSlice"; // Import từ slice Redux của bạn
import {
  CartContainer,
  CartItemContainer,
  ItemDetails,
  ItemName,
  ItemPrice,
  TotalContainer,
} from "./style";
import { Image } from "antd";
import Bag from "../../../images/Bag.svg";

const OrderProduct = ({ orderData2, orderId,
    iduser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return orderData2.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleReviewClick = (item, mode) => {
    setSelectedRecord(item);
    setReviewMode(mode === "view");
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };





  const handleReviewSubmit = async (values) => {
    try {
      const reviewData = {
        productId: selectedRecord._id,
        userId:  iduser, // Giả sử bạn có `userId` từ `selectedRecord`
        star: values.stars,
        comment: values.positiveComment || "",
        orderId, // Thêm orderId để gắn vào đơn hàng
      };
      console.log(reviewData)
      // Gọi API thêm review
      await dispatch(addReview(reviewData)).unwrap();
      
      notification.success({
        message: "Thành công",
        description: "Đánh giá đã được thêm.",
      });
      window.location.reload()
      handleCancel(); // Đóng modal sau khi gửi
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: error.message || "Có lỗi xảy ra khi thêm đánh giá.",
      });
    }
  };

  return (
    <CartContainer>
      {orderData2?.length === 0 ? (
        <div style={{ textAlign: "center", margin: "20px 0", color: "#888" }}>
          <Image width={100} src={Bag} style={{ marginRight: "50px" }} />
          Chưa có sản phẩm trong giỏ hàng
        </div>
      ) : (
        orderData2?.map((item) => (
          <CartItemContainer key={item.id}>
            <img src={item.image} alt={item.name} width={"50px"} />
            <ItemDetails>
              <ItemName>
                {item.name}, {item.colorName}, {item.attributeValue}
              </ItemName>
              <div style={{ marginRight: "55px" }}>Số lượng: {item.quantity}</div>
              <div style={{ marginTop: "10px" }}>
                {item.review ? (
                  <Button type="link" onClick={() => handleReviewClick(item, "view")}>
                    Xem đánh giá
                  </Button>
                ) : (
                  <Button type="link" onClick={() => handleReviewClick(item, "add")}>
                    Đánh giá
                  </Button>
                )}
              </div>
            </ItemDetails>
            <ItemDetails>
              <ItemPrice>{(item.price * item.quantity).toLocaleString()} đ</ItemPrice>
            </ItemDetails>
          </CartItemContainer>
        ))
      )}
      {orderData2?.length > 0 && (
        <TotalContainer>
          Tổng tiền: <span style={{ color: "red" }}>{calculateTotal().toLocaleString()} đ</span>
        </TotalContainer>
      )}

      <Modal
        title={reviewMode ? "Thông tin đánh giá" : "Đánh giá sản phẩm"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          reviewMode
            ? [
                <Button key="cancel" onClick={handleCancel}>
                  Thoát
                </Button>,
              ]
            : [
                <Button key="cancel" onClick={handleCancel}>
                  Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                  Gửi
                </Button>,
              ]
        }
      >
        {reviewMode ? (
          <div>
            <Typography.Text>Số sao: </Typography.Text>
            <Rate disabled value={selectedRecord?.review?.star} />
            <Typography.Paragraph>
              Nhận xét: {selectedRecord?.review?.comment || "Không có"}
            </Typography.Paragraph>
          </div>
        ) : (
          <Form
            form={form}
            onFinish={handleReviewSubmit}
            initialValues={{ stars: 0, positiveComment: "" }}
          >
            <Form.Item
              name="stars"
              label="Số sao"
              rules={[{ required: true, message: "Vui lòng chọn số sao!" }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item name="positiveComment" label="Nhận xét">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </CartContainer>
  );
};

export default OrderProduct;
