import React from 'react';
import HeaderComponent from '../Others/Header/HeaderComponent/HeaderComponent';
import MainMenuComponent from '../Others/Header/MainMenuComponent/MainMenuComponent';
import FooterComponent from '../Others/Footer/FooterComponent/FooterComponent';

const DefaultComponent = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderComponent />
      <MainMenuComponent />
      <div style={{ flex: 1 }}>
        {children}
      </div>
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
