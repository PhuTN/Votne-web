import React from "react";
import { Form, Upload, Button, notification, Image, Card } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { uploadFile } from "../../../redux/Slicer/uploadSlice";

const StyledCard = styled(Card)`
  padding: 20px;
`;

const BannerSettings = ({ settings, setSettings }) => {
  const dispatch = useDispatch();

  const handleImageUpload = async (options) => {
    const { file, onSuccess, onError } = options;

    try {
      const response = await dispatch(uploadFile(file));
      const uploadedFileUrl = response.payload.data.path;

      notification.success({
        message: "Upload thành công!",
        description: "Ảnh đã được tải lên Cloudinary.",
      });

      setSettings((prevSettings) => ({
        ...prevSettings,
        images: [...prevSettings.images, uploadedFileUrl],
      }));

      onSuccess();
    } catch (error) {
      notification.error({
        message: "Upload thất bại!",
        description: error.message,
      });

      onError(error);
      console.error(error);
    }
  };

  const handleRemoveBannerImage = (index) => {
    setSettings((prevSettings) => {
      const updatedImages = [...prevSettings.images];
      updatedImages.splice(index, 1);
      return { ...prevSettings, images: updatedImages };
    });
  };

  return (
    <StyledCard title="Cài Đặt Banner">
      <Form layout="vertical">
        <Form.Item label="Hình ảnh">
          <Upload customRequest={handleImageUpload} showUploadList={false} accept="image/*">
            <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
          </Upload>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
            {(settings?.images || []).map((img, idx) => (
              <div key={idx} style={{ position: "relative", marginBottom: "10px" }}>
                <Image
                  src={img}
                  alt={`Image ${idx + 1}`}
                  style={{
                    objectFit: "contain",
                    maxWidth: "100%",
                    maxHeight: "50px",
                  }}
                />
                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveBannerImage(idx)}
                  style={{
                    width: "20px",
                    height: "25px",
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                  }}
                />
              </div>
            ))}
          </div>
        </Form.Item>
      </Form>
    </StyledCard>
  );
};

export default BannerSettings;
