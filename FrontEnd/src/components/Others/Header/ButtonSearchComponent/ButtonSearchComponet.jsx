import { Button, Input } from 'antd';
import React, { useState, useEffect, useRef } from 'react'; // Thêm useRef
import { SearchOutlined, AudioOutlined } from '@ant-design/icons';
import { SearchButton, SearchIconButton, SearchInput, VoiceIconButton } from './style';
import { useNavigate } from 'react-router-dom';

const ButtonSearchComponet = (props) => {
  const { size, placeholder, textButton, onFocus, onBlur, onSearchChange, search } = props;
  const [searchValue, setSearchValue] = useState(''); // State lưu giá trị ô tìm kiếm
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const inputRef = useRef(null); // Tạo ref cho input
  const navigate = useNavigate(); // Hook điều hướng
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'vi-VN';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchValue(transcript); // Cập nhật giá trị ô tìm kiếm
        if (onSearchChange) {
          onSearchChange(transcript); // Gọi callback truyền giá trị giọng nói lên cha
        }
        setIsListening(false);

        // Focus vào input khi nhận kết quả
        if (inputRef.current) {
          inputRef.current.focus();
        }
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    } else {
      console.log('Trình duyệt không hỗ trợ SpeechRecognition.');
    }
  }, [onSearchChange]);

  const handleVoiceSearch = () => {
    if (!recognition) return;

    if (!isListening) {
      setIsListening(true);
      recognition.start();
    } else {
      setIsListening(false);
      recognition.stop();
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value); // Cập nhật giá trị state
    setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(value); // Gọi callback truyền giá trị lên cha
      }
    }, 300);
  };

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus vào input
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      onBlur();
    }, 200); // Trì hoãn 200ms để đảm bảo click xảy ra trước
  };
  const handleSearchRedirect = () => {
    if (searchValue.trim()) {
      navigate(`/search/${encodeURIComponent(searchValue)}`);
    }
  };
  return (
    <SearchButton>
      <SearchInput
        ref={inputRef} // Gắn ref vào input
        size={size}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={handleBlur}
        value={searchValue} // Giá trị hiển thị là searchValue
        onChange={handleSearchChange} // Xử lý sự kiện thay đổi nội dung
      />
      <SearchIconButton
        size={size}
        icon={<AudioOutlined />}
        onClick={handleVoiceSearch}
        className={isListening ? 'listening' : ''}
      />

<SearchIconButton
        size={size}
        icon={<SearchOutlined/>}
        onClick={handleSearchRedirect}
        
      />
     
    </SearchButton>
  );
};

export default ButtonSearchComponet;
