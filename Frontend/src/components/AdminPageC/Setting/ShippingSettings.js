import React, { useState } from "react";
import { Form, InputNumber, Card, Button, Modal } from "antd";
import styled from "styled-components";
import TextArea from "antd/es/input/TextArea";
import LocationPicker from "../../locationPicker/LocationPicker";
import { EnvironmentOutlined } from "@ant-design/icons";
import { createLocation } from "../../../redux/Slicer/locationSlice";
import { useDispatch } from "react-redux";

const StyledCard = styled(Card)`
 
  margin: 20px 0;
  padding: 20px;
`;

const ShippingSettings = ({ settings, setSettings }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // State lưu địa điểm ban đầu
  const [place, setPlace] = useState(settings?.location);

  // State lưu địa điểm mới được chọn
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Mở modal chọn địa điểm
  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Khi nhấn "OK" sau khi chọn địa điểm mới
  const handleOk = () => {
    if (selectedLocation) {
      setSettings((prevSettings) => ({
        ...prevSettings,
        location: selectedLocation,
      }));
    }
    setIsModalVisible(false);
  };

  // Khi chọn địa điểm từ LocationPicker
 

  const dispatch = useDispatch();


const handleLocationSelect = (place) => {
  

    const newPLACE = {
        description: place.description,
        latitude: place.latitude,
        longitude: place.longitude,
        locationName: place.des,
        locationID: place.description,

    }
  dispatch(createLocation(newPLACE))
    .unwrap()
    .then((newLocation) => {
      setSelectedLocation(newLocation); // Store temporarily
    })
    .catch((error) => {
      console.error("Error creating location:", error);
    });
};

const handleShippingCostChange = (value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      shippingCostPerKm: value,
    }));
  };
  // Hàm tạo URL Google Maps từ place_id
  const getGoogleMapsUrl = (placeId) => {
    return `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  };
console.log("EEEEE",settings)
  return (
    <div>
      <StyledCard title="Cài Đặt Giao Hàng">
        <Form layout="vertical">
          <Form.Item label="Địa chỉ kho">
            <TextArea
              value={`${settings?.location?.locationName}`}
              rows={2}
              readOnly
              style={{ pointerEvents: "none" }}
            />
            <Button style={{ marginTop: "8px" }} onClick={handleModalOpen}>
              Chỉnh địa chỉ
            </Button>
            <Button
  style={{ marginTop: '8px', marginLeft: '8px' }}
  href={getGoogleMapsUrl(place.description)}
  target="_blank"
  icon={<EnvironmentOutlined />}
/>
          </Form.Item>

          <Form.Item label="Chi Phí Giao Hàng (VNĐ/km)" >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              onChange={handleShippingCostChange}
              value = {settings?.shippingCostPerKm}

            />
          </Form.Item>
        </Form>
      </StyledCard>

      {/* Modal chọn địa điểm */}
      <Modal
        title="Chỉnh địa chỉ"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
        width={800}
      >
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </Modal>
    </div>
  );
};

export default ShippingSettings;
