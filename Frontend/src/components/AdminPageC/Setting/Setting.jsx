import React, { useState, useEffect } from "react";  
import { Row, Col, notification, Button, Form } from "antd"; 
import { useDispatch, useSelector } from "react-redux"; 
import { fetchSettings, updateSettings } from "../../../redux/Slicer/settingsSlice";
import BannerSettings from "./BannerSettings";
import ShippingSettings from "./ShippingSettings";
import LoyaltyProgramSettings from "./LoyaltyProgramSettings";

const SettingsForm = () => { 
  const [form] = Form.useForm(); 
  const dispatch = useDispatch();

  // State cục bộ lưu settings
  const [settings, setSettings] = useState(null);

  // Lấy dữ liệu settings từ Redux
  const { settings: reduxSettings, status, error } = useSelector((state) => state.settings);

  useEffect(() => {
    dispatch(fetchSettings()); // Gọi API lấy settings
  }, [dispatch]);

  // Cập nhật state cục bộ khi có dữ liệu từ Redux
  useEffect(() => {
    if (reduxSettings) {
      setSettings(reduxSettings[0]);
    }
  }, [reduxSettings]);

  // Xử lý cập nhật settings
  const handleUpdateSettings = async () => {
    if (!settings || !settings.location) return;

    try {
      await dispatch(updateSettings({
        id: "67a5d1d17ef7055c345739b3",
        settingsData: {
          ...settings,
          location: settings.location._id,
        },
      })).unwrap();

      notification.success({ message: "Lưu thành công!" });
      dispatch(fetchSettings()); // Fetch lại settings sau khi cập nhật
    } catch (error) {
      notification.error({ message: "Lưu thất bại!", description: error });
    }
  };

  // Xử lý khi chưa có dữ liệu settings
  if (!settings) return <div>Loading...</div>;
  console.log(settings);

  return ( 
    <div> 
    <Button type="primary" onClick={handleUpdateSettings} style={{ margin: "20px 0 20px 90px" }}>
            Lưu
          </Button>
      <Row>
        <Col span={1}></Col>
        <Col span={10}>
          <BannerSettings settings={settings} setSettings={setSettings} />
          <ShippingSettings settings={settings} setSettings={setSettings} />
        </Col>
        <Col span={1}></Col>
        <Col span={10}>
          <LoyaltyProgramSettings 
            settings={settings} setSettings={setSettings}
            form={form}
          />
          
        </Col>
      </Row>
    </div>
  ); 
}; 

export default SettingsForm;
