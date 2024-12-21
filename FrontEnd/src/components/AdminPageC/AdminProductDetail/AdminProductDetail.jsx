import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Input, Table, Button, Select, Image, Form, InputNumber, Modal, notification, Upload, Checkbox, message } from 'antd';
import { ContainerFilled, DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import { filtersData } from '../../../models/fake-data';
import { product, productData } from '../../../models/fake-data';
import DecriptionEnterZone from '../DecriptionEnterZone/DecriptionEnterZone';
import { ImageBlock, ImageWrapper, ThumbnailList, ThumbnailWrapper, Thumbnail, NavButton, Wrapper, Container, LeftSection, RightSection, Title, StyledInput, TableWrapper } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../../redux/Slicer/uploadSlice';
import { fetchAttributesByType } from '../../../redux/Slicer/attributeSlice';
import { updateProduct } from '../../../redux/Slicer/productSlice';

const { Option } = Select;

const AdminProductDetail = (selectedRow) => {
  const dispatch = useDispatch();
  const { attributes } = useSelector((state) => state.attributes);
  console.log("PRODUCT",selectedRow)
  useEffect(() => {
   
    if (selectedRow.type) {
      console.log("HELLLLLO")
      dispatch(fetchAttributesByType(selectedRow.type)); // Fetch attributes when the 'type' changes
    }
  }, [dispatch, selectedRow.type]); // Re-fetch when 'type' changes
      // Add more products as needed

      console.log("ATTRRI",attributes)
      

      const generateObjectId = () => {
        const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0'); // 4 byte timestamp
        const randomHex = () => Math.random().toString(16).substr(2, 8); // 8 hex chars
        return (timestamp + randomHex() + randomHex()).substr(0, 24); // Đảm bảo đúng 24 ký tự
      };
      

    const newSelectedRow = {
      ...selectedRow,
      selectedRow: {
        ...selectedRow.selectedRow,
        colors: selectedRow.selectedRow.colors?.map(color => {
          

          const updatedInventory = [...color?.inventory]

          const result = attributes.find(obj => obj.name === "Size");


          result?.values.forEach(val => {
        if (!updatedInventory.some(inv => inv?.attribute === val?._id)) {
        updatedInventory.push({
          _id: generateObjectId() ,// Hoặc giá trị mặc định phù hợp nếu cần,
          attribute: val._id,
          number: 0,
         
        });
        }
        });
        console.log("NEW",updatedInventory)

          return {...color,inventory:updatedInventory};
        })
      }
    };

  

  const [productState, setProductState] = useState(newSelectedRow.selectedRow);
  
  const [productDataState, setProductData] = useState(attributes || []);
  const [formColorEdit] = Form.useForm();
  const [formStockEdit] = Form.useForm();
  const [formAddStock] = Form.useForm();
  const [formAddColor] = Form.useForm();
  const [formAttribute] = Form.useForm();

  const [startIndex, setStartIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isColorModalVisible, setIsColorModalVisible] = useState(false);
  const [isStockModalVisible, setIsStockModalVisible] = useState(false);
  const [isAttributesModalVisible, setIsAttributesModalVisible] = useState(false);
  const [editingColor, setEditingColor] = useState();
  const [editingStock, setEditingStock] = useState(null);
  const [editingAttributes, setEditingAttributes] = useState(null);

  const handleCancelColorModal = () => setIsColorModalVisible(false);
  const handleCancelStockModal = () => setIsStockModalVisible(false);
  const handleCancelAttributesModal = () => setIsAttributesModalVisible(false);

  

  
  

  const handleOkAttributesModal = async () => {
    try {
      setIsAttributesModalVisible(false);
      const values = await formAttribute.validateFields();
      console.log("VALUE",values)



      const brandds = attributes.find(inv=> inv.name === "Thương hiệu")
 

 
 const matchingValues = brandds?.values
 .filter(value => values.selectedItems.includes(value._id))
 .map(value => ({ value: value.value, _id: value._id }));
 console.log("BRAND",matchingValues)

 formAttribute.setFieldsValue({
  brand: matchingValues[0].value ? matchingValues[0].value : formAttribute.brand,
});


      
      setProductState((prevState) => ({
        ...prevState,
        brand: matchingValues[0].value ? matchingValues[0].value : prevState.brand,
        attributeValues: values.selectedItems
      }));
      
      setEditingAttributes(null);
    } catch (error) {
      console.error("Error updating attributes:", error);
    }
  };

  const handleOkColorModal = async () => {
    try {
      const values = await formColorEdit.validateFields();
     
      const updatedColorOptions = productState.colors.map((color) =>
        color.id === editingColor.colorId
          ? {
              ...color,
              price: values.basePrice,
              discountPrice: values.discountPrice,
            }
          : color
      );
      productState.colors = updatedColorOptions;
      console.log(updatedColorOptions)
      setProductState(productState);
      setIsColorModalVisible(false);
      formColorEdit.setFieldsValue({
        basePrice: values.basePrice,
        discountPrice: values.discountPrice,
      });
      setEditingColor(null);

      message.success('Sửa màu sắc thành công!');
    } catch {}
  };


  const handleOkAddColorModal = async () => {
    try {


      const result = attributes.find(obj => obj.name === "Size");

let updatedInventory = []
      result?.values.forEach(val => {
   
    updatedInventory.push({
      _id: generateObjectId() ,// Hoặc giá trị mặc định phù hợp nếu cần,
      attribute: val._id,
      number: 0,
     
    });
    
    });


      const values = await formAddColor.validateFields();
      const newColor = {
        id: Date.now(),
        colorName: values.colorName,
        price: values.basePriceNew,
        discountPrice: values.discountPriceNew,
        images: tempImages,
        inventory: updatedInventory,
        _id: generateObjectId()
      };
      setProductState((prevProductState) => ({
        ...prevProductState,
        colors: [...prevProductState.colors, newColor],
      }));
      setIsAddColorModalVisible(false);
      setTempImages([]);
      formAddColor.resetFields();
      message.success('Thêm màu mới thành công!');
    } catch (error) {
      console.error("Error adding color:", error);
    }
  };


  const handleOkStockModal = async () => { 
    try {
      var id = 0;
      if (editingColor !== null) {
        id = editingColor.colorId;
      }
      const values = await formStockEdit.validateFields();
      console.log("IDD", id);
  
      // Tạo bản sao sâu của productState
      let newProduct = JSON.parse(JSON.stringify(productState));
  
      // Cập nhật tồn kho
      updateInventoryNumber(newProduct, id, editingStock._id, values.stock);
      setProductState(newProduct);  // Cập nhật lại state
  
      setIsStockModalVisible(false);
      formStockEdit.resetFields();
      setEditingStock(null);
      message.success('Sửa tồn kho thành công!');
    } catch (error) {
      console.log("Error updating stock:", error);
    }
  };
  
  function updateInventoryNumber(productData, colorId, attributeId, newNumber) {
    // Tìm màu có id tương ứng
    let selectedColor = productData.colors.find((color) => color.id === colorId);
  
    if (!selectedColor) {
      console.log("Không tìm thấy màu với ID:", colorId);
      return;
    }
  
    // Tìm inventory có attribute tương ứng
    let selectedInventory = selectedColor.inventory.find(
      (item) => item.attribute === attributeId
    );
  
    if (!selectedInventory) {
      console.log("Không tìm thấy attribute với ID:", attributeId);
      return;
    }
  
    // Cập nhật giá trị `number`
    selectedInventory.number = newNumber;
  }
  

  const handleColorEdit = (stock) => {
    const result = productDataState.find(obj => obj.name === "Size");

    
    console.log(stock)
    setEditingColor(stock);
    setIsColorModalVisible(true);
    formColorEdit.setFieldsValue({
      basePrice: stock.basePrice,
      discountPrice: stock.discountPrice
    });
  };

  const handleStockEdit = (stock) => {
    const result = productDataState.find(obj => obj.name === "Size");
    if(result){
    setEditingStock(stock);
    setIsStockModalVisible(true);
    formStockEdit.setFieldsValue({
      stock: stock.number
    });
  }
  };

  const handleAttributesEdit = (attributes) => {
    setEditingAttributes(attributes);
    const selectedValues = productState.attributeValues;
      // .find(filter => filter.label.localeCompare(attributes.attributeName, undefined, { sensitivity: 'base' }) === 0)
      // ?.items.filter(item => attributes.value.includes(item)) || [];


    formAttribute.setFieldsValue({
      selectedItems: selectedValues,
    });
    console.log("SELECT", selectedValues)
    setIsAttributesModalVisible(true);
  };

  const handleStatusChange = (newStatus, benefitId) => {
    const updatedBenefits = productState.benefits.map((benefit) =>
      benefit.id === benefitId ? { ...benefit, status: newStatus } : benefit
    );
    setProductState((prevProductState) => ({
      ...prevProductState,
      benefits: updatedBenefits,
    }));
  };

 
  
  const color = productState?.colors[selectedColorIndex]|| null;
 
  const visibleThumbnails = color?.images?.slice(startIndex, startIndex + 5);
  
  
  const [selectedImage, setSelectedImage] = useState(visibleThumbnails[0] || {});
  
  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex((prev) => Math.min(prev + 1, color?.images?.length - 5));

  const handleColorSelect = (record, index) => {

    const result = productDataState.find(obj => obj.name === "Size");
    if(result){
    setSelectedColorIndex(index);
    setEditingColor(record);
    formAttribute.setFieldsValue({
      basePrice: record.basePrice,
      discountPrice: record.discountPrice,
    });
    setSelectedImage(productState?.colors[index]?.images[0]);
  }
  };

  // const attributesData = productDataState.specifications.map((spec, index) => ({
  //   key: index + 1,
  //   attributeName: spec.label,
  //   value: spec.value.join(", "),
  // }));

  const colorsData = productState.colors.map((color, index) => ({
    colorId: color.id,
    colorName: color.colorName,
    images: color?.images,
    basePrice: color.price,
    discountPrice: color.discountPrice,
    status: color.stock > 0 ? 'active' : 'inactive',
  }));

  const attributesColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên thuộc tính', dataIndex: 'name', key: 'name' },
   // { title: 'Giá trị', dataIndex: 'values', key: 'values' },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Button icon={<EditOutlined />} style={{ backgroundColor: '#52c41a' }} onClick={() => handleAttributesEdit(record)} data-testid={`${record.id}`}/>
      ),
    },
  ];

  const colorsColumns = [
    { title: 'ID', dataIndex: 'colorId', key: 'colorId' },
    { title: 'Tên màu', dataIndex: 'colorName', key: 'colorName' },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div>
          {images.map((img, idx) => (
            <Image key={idx} src={img} alt={`Color ${idx + 1}`} width={50} />
          ))}
        </div>
      ),
    },
    { title: 'Giá gốc', dataIndex: 'basePrice', key: 'basePrice' },
    { title: 'Giá giảm', dataIndex: 'discountPrice', key: 'discountPrice' },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Button icon={<EditOutlined />} style={{ backgroundColor: '#52c41a' }} onClick={() => handleColorEdit(record)} data-testid={`${record.colorId}`}  />
      ),
    },
  ];



  const stockColumns = [
    { title: 'Size', dataIndex: 'value', key: 'value' },
    { title: 'Số lượng', dataIndex: 'number', key: 'number' },
    {
      title: 'Hành động',
      key: 'action',
      render: (record) => (
        <Button data-testid={`${record.value}`} icon={<EditOutlined />} style={{ backgroundColor: '#52c41a' }} onClick={() => handleStockEdit(record)}  />
      ),
    },
  ];

   const benefitsData = productState.endows.map((endows, index) => ({
     key: index + 1,
     benefitId: endows.id,
     description: endows.description,
     active: endows.active ? "Hoạt động" :"Không hoạt động",
   }));
  
  const benefitsColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Mô tả ưu đãi", dataIndex: "description", key: "description" },
    {
      title: "Trạng thái",
      dataIndex: "active",
      key: "active",
      render: (active) => (active ? "Hoạt động" : "Không hoạt động"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (record) => (
        <Button icon={<EditOutlined />} style={{ backgroundColor: "#52c41a" }} onClick={() => handleEditBenefit(record)}  data-testid={`${record.id}`}  />
      ),
    },
  ];

  const handleRemoveImage = (imageUrl) => {
    
    const updatedImages = editingColor?.images.filter((img) => img !== imageUrl);
    const updatedColorOptions = productState.colors.map((color) =>
      color.id === editingColor.colorId
        ? {
            ...color,
            images: updatedImages,
          }
        : color
    );
    setProductState({ ...productState, colors: updatedColorOptions });
    setEditingColor((prevColor) => ({
      ...prevColor,
      images: updatedImages,
    }));
  };

  

  const [isAddStockModalVisible, setIsAddStockModalVisible] = useState(false);

  const handleAddStock = () => {
    setIsAddStockModalVisible(true);
  };

  const handleOkAddStockModal = async () => {
    try {
      const values = await formAddStock.validateFields(['sizeNew', 'stockNew']);
      if (!values.sizeNew || values.stockNew === undefined) {
        console.warn("Vui lòng nhập cả size và số lượng");
        return;
      }
      const newStock = { size: values.sizeNew, stock: values.stockNew };
      const updatedColorOptions = productState.colorOptions.map((color, index) =>
        index === selectedColorIndex
          ? { ...color, stock: [...color.stock, newStock] }
          : color
      );
      setProductState({ ...productState, colorOptions: updatedColorOptions });
      setIsAddStockModalVisible(false);
      formAddStock.resetFields();
    } catch (error) {
      console.error("Error adding stock:", error);
    }
  };

  const initialColor = productState.colors[0];

  const [isAddColorModalVisible, setIsAddColorModalVisible] = useState(false);
  const [tempImages, setTempImages] = useState([]);
  const [tempImages2, setTempImages2] = useState([]);
  const handleAddColor = () => {
    setIsAddColorModalVisible(true);
  };

 






















    
  //   const newImageUrl = URL.createObjectURL(file);
  //   setTempImages([...tempImages, newImageUrl]);
  //   onSuccess();
  // };


  const handleImageUploadAddColor = async (options) => {
    const { file, onSuccess, onError } = options; // Lấy các tham số từ options
    
    try {
      // Dispatch action upload file từ Redux slice
      const response = await dispatch(uploadFile(file)); // Đợi kết quả trả về từ slice
  
      // Lấy URL từ dữ liệu trả về
      const uploadedFileUrl = response.payload.data.path; // Điều chỉnh theo dữ liệu trả về từ slice
      console.log('URL ảnh đã upload:', uploadedFileUrl); // Log URL ra console
  
      // Hiển thị thông báo thành công
      notification.success({
        message: 'Upload thành công!',
        description: 'Ảnh đã được tải lên Cloudinary.',
      });


      
      const updatecolor = [...tempImages, uploadedFileUrl]

      
  
        setTempImages([...tempImages, uploadedFileUrl]);

        console.log("TEMPt",updatecolor)


       
    onSuccess();





      
    } catch (error) {
      // Hiển thị thông báo lỗi
      notification.error({
        message: 'Upload thất bại!',
        description: error.message,
      });
  


      // Gọi hàm onError để thông báo lỗi
      onError(error);

      console.log(error)
    }
  };

  const handleRemoveImageAddColor = (imageUrl) => {
    setTempImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
  };

  

  const [isEditBenefitModalVisible, setIsEditBenefitModalVisible] = useState(false);
  const [isAddBenefitModalVisible, setIsAddBenefitModalVisible] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [formEditBenefit] = Form.useForm();
  const [formAddBenefit] = Form.useForm();

  const handleOkEditBenefitModal = async () => {
    try {
      const values = await formEditBenefit.validateFields();
      const updatedBenefits = productState.endows.map((benefit) =>
        benefit.id === editingBenefit.id
          ? { 
              ...benefit, 
              description: values.description,
              active: values.active
            }
          : benefit
      );
      setProductState((prevState) => ({
        ...prevState,
        endows: updatedBenefits,
      }));
      formEditBenefit.resetFields();
      setIsEditBenefitModalVisible(false);
      setEditingBenefit(null);
      message.success('Chỉnh sửa ưu đãi thành công!');
    } catch (error) {
      console.error("Error updating benefit:", error);
    }
  };

  const handleOkAddBenefitModal = async () => {
    try {
      const values = await formAddBenefit.validateFields();
      const newBenefit = {
        _id:generateObjectId(),
        id: Date.now(),
        description: values.description,
        active: true,
      };
      setProductState((prevState) => ({
        ...prevState,
        endows: [...prevState.endows, newBenefit],
      }));
      formAddBenefit.resetFields();
      setIsAddBenefitModalVisible(false);
      message.success('Thêm ưu đãi thành công!');
    } catch (error) {
      console.error("Error adding benefit:", error);
    }
  };

  const handleEditBenefit = (benefit) => {
    //console.log(benefit)
    setEditingBenefit(benefit);
    formEditBenefit.setFieldsValue({
      description: benefit.description,
      active: benefit.active ? "Hoạt động" : "Không hoạt động",
    });
    setIsEditBenefitModalVisible(true);
  };

  const handleAddBenefit = () => {
    formAddBenefit.resetFields();
    setIsAddBenefitModalVisible(true);
    
  };

  
  const { status, error, file } = useSelector((state) => state.upload); // Lấy thông tin từ Redux

  // Hàm xử lý upload ảnh
  const handleImageUpload = async (options) => {
    const { file, onSuccess, onError } = options; // Lấy các tham số từ options
  
    try {
      // Dispatch action upload file từ Redux slice
      const response = await dispatch(uploadFile(file)); // Đợi kết quả trả về từ slice
  
      // Lấy URL từ dữ liệu trả về
      const uploadedFileUrl = response.payload.data.path; // Điều chỉnh theo dữ liệu trả về từ slice
      console.log('URL ảnh đã upload:', uploadedFileUrl); // Log URL ra console
  
      // Hiển thị thông báo thành công
      notification.success({
        message: 'Upload thành công!',
        description: 'Ảnh đã được tải lên Cloudinary.',
      });


      
  
      const updatedColorOptions = productState.colors.map((color) =>
      color.id === editingColor.colorId
        ? {
            ...color,
            images: [...color?.images, uploadedFileUrl],
          }
        : color
    );
    setProductState({ ...productState, colors: updatedColorOptions });
    const updatedImages = [...editingColor?.images, uploadedFileUrl];
    setEditingColor((prevColor) => ({
      ...prevColor,
      images: updatedImages,
    }));
    onSuccess();






      
    } catch (error) {
      // Hiển thị thông báo lỗi
      notification.error({
        message: 'Upload thất bại!',
        description: error.message,
      });
  


      // Gọi hàm onError để thông báo lỗi
      onError(error);
    }
  };
  let combinedArray= []
  
  
  
  const colorrr= productState.colors.find(obj=>obj?.id === editingColor?.colorId)
if(colorrr){


  const result = productDataState.find(obj => obj.name === "Size");
  


   combinedArray = result?.values?.map(val => {
    // Tìm item trong inventory có attribute trùng với _id của value
    const matchingInventory = colorrr?.inventory?.find(inv => inv.attribute === val._id);
  
    return {
      _id: val._id,
      value: val.value,
      number: matchingInventory ? matchingInventory.number : 0
    };
  });



}

 
const handleSave =  async ( ) => {
  // Your save logic here

  try {



    function transformProduct(obj) {
      return {
        id: obj.id,
        name: obj.name,
        description: obj.description,
        type: obj.type,
        brand: obj.brand,
        attributeValues: obj.attributeValues,
        colors: obj.colors.map(color => ({
          id: color.id,
          colorName: color.colorName,
          images: color?.images,
          price: color.price,
          discountPrice: color.discountPrice,
          inventory: color.inventory.map(item => ({
            attribute: item.attribute,
            number: item.number
          }))
        })),
        endows: obj.endows.map(endow => ({
          id: endow.id,
          description: endow.description,
          active: endow.active
        })),
        sold: obj.sold,
        active: obj.active
      };
    }


    const NNNNN = transformProduct(productState)
    dispatch(updateProduct({ id: productState.productID  , data: NNNNN
 }));

 message.success('Lưu thành công!');
  } catch (error) {
    
  }
  
};


  return (
    <Wrapper>
      <Title>Thông tin sản phẩm</Title>
      <Button onClick={() => handleSave()} type="primary" style={{ width: "10%" }} data-testid = "nutluu">
                  Lưu
                </Button>
                <Select
                data-testid = "select"
  defaultValue={productState.active ? "Hoạt động" : "Không hoạt động"}
  style={{ width: 180, marginLeft: "20px" }}
  onChange={(value) => {
    setProductState((prev) => ({
      ...prev,
      active: value === "Hoạt động",
    }));
    if(value === "Hoạt động"){
                  message.success(`Đưa ${productState.name} hoạt động!`);
                }
                else{
                  message.success(`Vô hiệu hóa ${productState.name}!`);
                }
  }}
>
  <Option value="Hoạt động" data-testid = "activep">Hoạt động</Option>
  <Option value="Không hoạt động" data-testid = "unactivep">Không hoạt động</Option>
</Select> 
      <Container>
        <LeftSection>
          <ImageBlock>
            <ImageWrapper>
              <Image src={selectedImage} alt="Vợt cầu lông" />
            </ImageWrapper>
            <ThumbnailList>
              {startIndex > 0 && (
                <NavButton onClick={handlePrev}>
                  <LeftOutlined />
                </NavButton>
              )}
              <ThumbnailWrapper>
                {visibleThumbnails.map((img, index) => (
                  <Thumbnail
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    active={selectedImage === img}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </ThumbnailWrapper>
              {startIndex < color?.images?.length - 5 && (
                <NavButton onClick={handleNext}>
                  <RightOutlined />
                </NavButton>
              )}
            </ThumbnailList>
          </ImageBlock>
        </LeftSection>
        <RightSection>
          <Form form={formAttribute} layout="vertical">
          <Form.Item
  label="Tên sản phẩm"
  name="productName"
  initialValue={productState.name}
  style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '16px' }}
>
  <StyledInput
    placeholder="Nhập tên sản phẩm"
    value={productState.name} // Truyền giá trị từ productState
    onChange={(e) => {
      const updatedName = e.target.value; // Lấy giá trị mới từ input
      setProductState((prevState) => ({
        ...prevState,
        name: updatedName, // Cập nhật name trong productState
      }));
    }}
    data-testid = "tensanpham"
  />
</Form.Item>

            <Form.Item label="Hãng" name="brand" initialValue={productState.brand} style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              
              <StyledInput
   
    value={productState.brand} // Truyền giá trị từ productState
    style={{  pointerEvents: 'none'}}
  />
              
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '16px' }}>
              <Form.Item
                label="Giá gốc"
                name="basePrice"
                
                initialValue={initialColor ? initialColor.price : 0}
                style={{ marginBottom: 0 }}
              >
                <InputNumber
              
                  min={0}
                  style={{ width: '100%' , pointerEvents: 'none'}}
                  readOnly
                  formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
              <Form.Item
                label="Giá giảm"
                name="discountPrice"
                initialValue={initialColor ? initialColor.discountPrice : 0}
                style={{ marginBottom: 0 }}
              >
                <InputNumber
                  
                  
                  min={0}
                  style={{ width: '100%', pointerEvents: 'none' }}
                  formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  readOnly
                />
              </Form.Item>
            </Form.Item>
          </Form>
          <Title>Bảng ưu đãi</Title>
          <Button icon={<PlusOutlined />} onClick={handleAddBenefit} style={{ marginBottom: '16px' }} data-testid = "themuudai">
            Thêm ưu đãi
          </Button>
          <Table
            dataSource={productState.endows}
            columns={benefitsColumns}
            rowKey="benefitId"
            pagination={false}
          />
        </RightSection>
      </Container>
      <Container style={{ boxShadow: 'none', border: 'none', padding: '0' }}>
        <TableWrapper>
          <Title>Bảng màu sắc</Title>
          <Button
            icon={<PlusOutlined />}
            onClick={handleAddColor}
            style={{ marginBottom: '16px' }}
             data-testid = "themmaubtn"
          >
            Thêm màu sắc
          </Button>
          <Table
            dataSource={colorsData}
            columns={colorsColumns}
            rowKey="id"
            pagination={false}
            onRow={(record, rowIndex) => ({
              onClick: () => handleColorSelect(record, rowIndex),
            })}
          />
        </TableWrapper>
        <TableWrapper style={{ marginLeft: '20px' }}>
          <Title>Bảng tồn kho/size màu {color.colorName}</Title>
          {/* <Button
            icon={<PlusOutlined />}
            onClick={handleAddStock}
            style={{ marginBottom: '16px' }}
          >
            Thêm tồn kho
          </Button> */}
          <Table
            dataSource={combinedArray}
            columns={stockColumns}
            rowKey="size"
            pagination={false}
          />
        </TableWrapper>
      </Container>
      <Container style={{ display: 'block' }}>
        <Title>Bảng thuộc tính</Title>
        <Table
          dataSource={productDataState}
          columns={attributesColumns}
          rowKey="id"
          pagination={false}
          style={{ marginBottom: '20px' }}
        />
      </Container>
      

      <Container style={{ display: 'block' }}>
  <Title>Thông tin</Title>
  <div style={{ width: '100%', marginTop: '-50px' }}>
    <textarea
    data-testid="des"
      placeholder="Nhập mô tả sản phẩm"
      value={productState.description} // Truyền giá trị từ productState
      onChange={(e) => {
        const updatedDescription = e.target.value; // Lấy giá trị mới từ textarea
        setProductState((prevState) => ({
          ...prevState,
          description: updatedDescription, // Cập nhật description trong productState
        }));
      }}
      style={{
        width: '100%',
        height: '900px', // Điều chỉnh chiều cao
        fontSize: '16px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'none', // Ngăn người dùng thay đổi kích thước khung
        lineHeight: '1.5', // Tăng khoảng cách giữa các dòng
        overflowY: 'auto', // Thêm scroll nếu vượt quá chiều cao
      }}
    />
  </div>
</Container>


   
      <Modal
        title="Chỉnh sửa màu sắc"
        visible={isColorModalVisible}
        onOk={handleOkColorModal}
        onCancel={handleCancelColorModal}
        okButtonProps={{ "data-testid": "okmau" }}
      >
        <Form form={formColorEdit}>
          <Form.Item name="basePrice" label="Giá" initialValue={editingColor?.basePrice} data-testid = "inputgoc">
            <Input />
          </Form.Item>
          <Form.Item name="discountPrice" label="Giá giảm" initialValue={editingColor?.discountPrice} data-testid = "inputgiam">
            <Input />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {editingColor?.images?.map((image, index) => (
                <div key={index} style={{ position: 'relative', width: '50px' }}>
                  <Image src={image} alt={`Ảnh ${index + 1}`} width={50} />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveImage(image)}
                    style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                    
                  />
                </div>
              ))}
            </div>
          </Form.Item>
          <Form.Item label="Upload ảnh mới">
            <Upload
              customRequest={handleImageUpload}
              listType="picture-card"
              showUploadList={false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }} data-testid = "inputanh">Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

  
      <Modal 
        title="Chỉnh sửa thông số kỹ thuật"
        visible={isAttributesModalVisible}
        onOk={handleOkAttributesModal}
        onCancel={handleCancelAttributesModal}
        okButtonProps={{ "data-testid": "ok" }}
      >
        <Form form={formAttribute}>
          <Form.Item label="Chọn các giá trị" name="selectedItems">
          <Checkbox.Group>
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {productDataState.map((filter) => (
      filter?.values.map((item) => {
        const isHidden =
          filter.id.localeCompare(editingAttributes?.id || '', undefined, { sensitivity: 'base' }) !== 0;
        return (
          <div
            key={item._id}
            style={{
              display: 'flex',
              alignItems: 'center', // Căn chỉnh checkbox và label theo chiều dọc
              display: isHidden ? 'none' : 'flex',
            }}
          >
            <Checkbox value={item._id} style={{ marginRight: '5px' }}  data-testid={item.value} />
            <span>{item.value}</span>
          </div>
        );
      })
    ))}
  </div>
</Checkbox.Group>

          </Form.Item>
        </Form>
      </Modal> 

      {/* .filter(
                  (filter) =>
                    filter.label.localeCompare(editingAttributes?.attributeName || '', undefined, { sensitivity: 'base' }) === 0
                ) */}
      <Modal
        title="Thêm màu sắc mới"
        visible={isAddColorModalVisible}
        onOk={handleOkAddColorModal}
        onCancel={() => setIsAddColorModalVisible(false)}
        okButtonProps={{ "data-testid": "okmau" }}
      >
        <Form form={formAddColor}>
          <Form.Item name="colorName" label="Chọn màu" rules={[{ required: true, message: 'Vui lòng nhập giá gốc' }]}>
            

              <Input style={{ width: '100%' }}  data-testid = "inputmau"/>
      
          </Form.Item>
          <Form.Item name="basePriceNew" label="Giá gốc" rules={[{ required: true, message: 'Vui lòng nhập giá gốc' }]}>
            <InputNumber data-testid = "inputgoc" min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="discountPriceNew" label="Giá giảm">
            <InputNumber data-testid = "inputgiam" min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Upload
              customRequest={handleImageUploadAddColor}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<PlusOutlined />} data-testid = "inputanh" >Tải ảnh lên</Button>
            </Upload>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {tempImages.map((img, idx) => (
                <div key={idx} style={{ position: 'relative' }}>
                  <Image src={img} alt={`Image ${idx + 1}`} width={50} />
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleRemoveImageAddColor(img)}
                    style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                    }}
                  />
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>
      </Modal>

   
      <Modal
        title="Thêm tồn kho mới"
        visible={isAddStockModalVisible}
        onOk={handleOkAddStockModal}
        onCancel={() => setIsAddStockModalVisible(false)}
      >
        <Form form={formAddStock}>
          <Form.Item name="sizeNew" label="Size" rules={[{ required: true, message: 'Vui lòng chọn size' }]}>
            <Select placeholder="Chọn size">
              {productDataState.find((item) => item.name === 'Size')?.values
                .map((size, index) => (
                <Select.Option key={index} value={size._id}>{size.value}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="stockNew" label="Số lượng" rules={[{ required: true, message: 'Vui lòng nhập số lượng' }]}>
            <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập số lượng" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Chỉnh sửa ưu đãi"
        visible={isEditBenefitModalVisible}
        onOk={handleOkEditBenefitModal}
        onCancel={() => setIsEditBenefitModalVisible(false)}
        okButtonProps={{ "data-testid": "okuudai" }}
      >
        <Form form={formEditBenefit} layout="vertical">
          <Form.Item
            name="description"
            label="Mô tả ưu đãi"
            rules={[{ required: true, message: "Vui lòng nhập mô tả ưu đãi" }]}
            initialValue={editingBenefit ? editingBenefit.description : ""}
          >
            <Input placeholder="Nhập mô tả ưu đãi" data-testid = "inputuudai" />
          </Form.Item>
          <Form.Item
            name="active"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            initialValue={editingBenefit ? editingBenefit.status : "Hoạt động"}
          >
            <Select data-testid = "selectuudai">
              <Option value={true} data-testid = "activeuudai">Hoạt động</Option>
              <Option value={false} data-testid = "unactivetuudai" >Không hoạt động</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Thêm mới ưu đãi"
        visible={isAddBenefitModalVisible}
        onOk={handleOkAddBenefitModal}
        onCancel={() => setIsAddBenefitModalVisible(false)}
        okButtonProps={{ "data-testid": "okuudai" }}
      >
        <Form form={formAddBenefit} layout="vertical">
          <Form.Item
            name="description"
            label="Mô tả ưu đãi"
            rules={[{ required: true, message: "Vui lòng nhập mô tả ưu đãi" }]}
          >
            <Input placeholder="Nhập mô tả ưu đãi" data-testid = "inputuudai" />
          </Form.Item>
          {/* <Form.Item
            name="active"
            label="Trạng thái"
            rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
          >
            <Select>
            <Option value={true}>Hoạt động</Option>
            <Option value={false}>Không hoạt động</Option>
            </Select>
          </Form.Item> */}
        </Form>
      </Modal>
    </Wrapper>
  );
};

export default AdminProductDetail;
