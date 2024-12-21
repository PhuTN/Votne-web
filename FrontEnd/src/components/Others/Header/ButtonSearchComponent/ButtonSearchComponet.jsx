import { Button, Input } from 'antd';
import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { SearchButton, SearchIconButton, SearchInput } from './style';

const ButtonSearchComponet = (props) => {
  const { size, placeholder, textButton, onFocus, onBlur, onSearchChange ,search } = props;

  // Xử lý thay đổi ô tìm kiếm
  const handleSearchChange = (e) => {
    setTimeout(() => {
    if (onSearchChange  ) {
      console.log("ĐỔI222222" + " search: " + search + " e.target.value: " + e.target.value)
      onSearchChange(e.target.value); // Gọi hàm onSearchChange từ component cha
    }
  }, 300);
  };
  const handleBlur = () => {
    setTimeout(() => {
      onBlur()
    }, 200); // Trì hoãn 200ms để đảm bảo click xảy ra trước
  };
  
  return (
    <SearchButton>
      <SearchInput
        size={size}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={handleBlur} 
        onChange={handleSearchChange} // Xử lý sự kiện thay đổi ô tìm kiếm
      />
      <SearchIconButton size={size} icon={<SearchOutlined />}>
        {textButton}
      </SearchIconButton>
    </SearchButton>
  );
};

export default ButtonSearchComponet;
