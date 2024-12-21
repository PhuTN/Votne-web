import React from 'react'
import {NewMenu,MenuItem2,MenuSpan, ProductMenu,SubMenu, WrapperMenu } from './style'
import { Col, Flex } from 'antd'
import ProductMenuComponent from '../ProductMenuComponent/ProductMenuComponent'
import { Link } from 'react-router-dom'

const MainMenuComponent = () => {
  
  return (
    <div>
      <WrapperMenu justify="center" align="middle">
        <SubMenu>
          

          <Link to="/" style={{color:'white'}}> 
            <span>TRANG CHỦ</span>
          </Link>
        </SubMenu>

        <SubMenu style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0px' }}>
            <span>SẢN PHẨM</span>
            <svg id="sgvMenuDowArrow" width="30px" height="30px" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:'0px'}}>
    <g transform="translate(15, 15)"> 
        
        <path id='menuDowArrow' d="M-8 0L0 5L8 0" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(0, -2.5)" />
    </g>
</svg>

          </div>
          <ProductMenu id= "productMenu" >
          <ProductMenuComponent /> {/* Di chuyển ra ngoài div chứa span và svg */}
          </ProductMenu>
        </SubMenu>

        <SubMenu>
          <span>HƯỚNG DẪN</span>
        </SubMenu>

        <SubMenu style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',  }}>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0px' }}>
            <span>HƯỚNG DẪN</span>
            <svg id="sgvMenuDowArrow" width="30px" height="30px" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginTop:'0px'}}>
    <g transform="translate(15, 15)"> 
        
        <path id='menuDowArrow' d="M-8 0L0 5L8 0" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(0, -2.5)" />
    </g>
</svg>

          </div>
          <NewMenu id= "productMenu" >
          <MenuItem2><MenuSpan>Kiểm tra đơn hàng</MenuSpan></MenuItem2>
          <MenuItem2><MenuSpan>Kiểm tra bảo hành</MenuSpan></MenuItem2>
          </NewMenu>
        </SubMenu>

        <SubMenu>
          <span>GIỚI THIỆU</span>
        </SubMenu>

        <SubMenu>
          <span>LIÊN HỆ</span>
        </SubMenu>

      </WrapperMenu>
    </div>
  )
}

export default MainMenuComponent
