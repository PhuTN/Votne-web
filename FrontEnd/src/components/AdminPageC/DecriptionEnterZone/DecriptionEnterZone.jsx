import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import styles for React Quill
import { Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const DecriptionEnterZone = () => {
  const [description, setDescription] = useState('');

  const handleChange = (value) => {
    setDescription(value);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      // Process the uploaded image (you can store or display it as needed)
      console.log('Image uploaded:', info.file.response);
    }
  };
  const handleSave = () => {
    console.log('HTML Output:', description);
    // Nếu muốn lấy Delta:
    // const delta = quillRef.getEditor().getContents();
    // console.log('Delta Output:', delta);
  };
  return (
    <div style={{ padding: '20px', backgroundColor: '#FFFFFF', borderRadius: '8px' }}>
      
      
      
      <ReactQuill 
        value={description} 
        onChange={handleChange} 
        placeholder="Write your product description here..."
        style={{  height: '1000px' ,padding:'50px 0' }}
        modules={{
            toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
        }}
      />
      
    </div>
  );
};

export default DecriptionEnterZone;
