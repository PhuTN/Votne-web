import React, { useEffect, useState } from 'react'; 
import ButtonSearchComponet from '../../Header/ButtonSearchComponent/ButtonSearchComponet';
import { WrapperHeader } from './style';
import { Col, Image, Menu } from 'antd';
import { NewMenu2, MenuSpan, HotlineContainer, Icon, Label, PhoneNumber, Separator, SearchCol, LowText, FunCol, NewMenu, MenuItem2 } from "./style";
import logovot from '../../../../images/Logo.svg';
import bino from '../../../../images/bino.svg';
import user from '../../../../images/user.svg';
import cart from '../../../../images/cart.svg';
import MiniCartComponent from '../MiniCartComponent/MiniCartComponent';
import SuggestSearchComponent from '../SuggestSearchComponent/SuggestSearchComponent';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductsByName } from '../../../../redux/Slicer/productSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchCartByUserId, updateCart } from '../../../../redux/Slicer/cartSlice';

const HeaderComponent = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Trạng thái lưu input tìm kiếm
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productname } = useSelector((state) => state.products); // Lấy dữ liệu từ Redux store

  // Gọi API khi searchTerm thay đổi
  useEffect(() => {
    dispatch(searchProductsByName(searchTerm));
  }, [dispatch, searchTerm]);

  const focusSearch = () => setIsMenuVisible(true);
  const blurSearch = () => setIsMenuVisible(false);


  
  if( localStorage.getItem("previousURL2")  && location.pathname !==  localStorage.getItem("previousURL2")){
    localStorage.removeItem("previousURL2")
    setTimeout(() => {
      window.location.reload();
  }, 300); 
  }
   

  

  const handleLogout = () => {
    //localStorage.removeItem('token');


    
    const localCartItems1 =  JSON.parse(localStorage.getItem("cartItems"));


  console.log("Giỏ hàng trống1");
  console.log(localCartItems1)
  console.log("Giỏ hàng trống1");
  function transformData(inputArray) {
    return inputArray?.map(item => ({
      idproduct: item._id
        ,
      colorid: item.colorid,
      idattributevalue:  item.attributeId,
      
      price: item.price,
      number: item.quantity,
      
    }));
  }

  const newCart = transformData(localCartItems1)
 




  const cart2 = localStorage.getItem("cart");

    let parsedCart ={}
    if (cart) {
       
        parsedCart = JSON.parse(cart2); // Chuyển chuỗi JSON thành đối tượng
        
      } else {
        console.log("Giỏ hàng trống");
      }
      console.log(parsedCart)
      const updateCart2 = {
        id: parsedCart?.id,
        iduser: parsedCart?.iduser,
        products: newCart,
        _id: parsedCart?._id,
        
      }
      console.log(updateCart2)



      dispatch(updateCart({ cartId: parsedCart?._id, cartData: updateCart2 }));




    localStorage.clear();
   
    navigate('/');

    setTimeout(() => {
      window.location.reload();
  }, 300); 
   // window.location.reload()
  
  };

  const handleLogin = () => {
    localStorage.clear();
   
    navigate('/login');
  
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value); // Cập nhật giá trị tìm kiếm
  };

  const productsNew = (productname || []).map(product => ({
    name: `Vợt Cầu Lông ${product?.name || 'Tên sản phẩm chưa xác định'}`,
    price: `${product?.colors?.[0]?.discountPrice?.toLocaleString() || 'Chưa có giá'}₫`,
    img: product?.colors?.[0]?.images?.[0] || 'https://default-image-url.com/default.jpg',
    _id : product?._id || ""
  }));

  const handleAccountClick = () => {
    const token = localStorage.getItem("token"); // Kiểm tra token trong localStorage
    if (!token) {
      navigate("/login"); // Điều hướng đến trang đăng nhập nếu chưa có token
    } else {
      navigate("/account"); // Điều hướng đến trang cá nhân nếu đã đăng nhập
    }
  };

  const token = localStorage.getItem("token");

let decodedToken ={}
  if (token) {
    decodedToken = jwtDecode(token);
   // console.log("Thông tin giải mã token:",decodedToken );
  } else {
    console.log("Không có token để giải mã.");
  }


  let canHover = true;
  let canClick = true;
  if(!(decodedToken.role === "Customer")){
    canClick= false;
  }

  if(location.pathname === "/cart"){
    canHover = false;
  }
  
  const cart2 = localStorage.getItem("cart");

  let parsedCart ={}
  if (cart) {
     
      parsedCart = JSON.parse(cart2); // Chuyển chuỗi JSON thành đối tượng
      
    } else {
      console.log("Giỏ hàng trống");
    }
    console.log("HELLLO",parsedCart)
    

  return (
    <div>
      <WrapperHeader justify="center" align="middle">
        <div style={{marginRight:'30px', marginLeft:'30px'}} >
          <Image preview={false} width={50} src={logovot} />
        </div>
        <div style={{marginRight:'3%'}}>
          <HotlineContainer>
            <Icon>📞</Icon>
            <Label>HOTLINE:</Label>
            <PhoneNumber>0977508430</PhoneNumber>
            <Separator>|</Separator>
            <PhoneNumber>0792677415</PhoneNumber>
          </HotlineContainer>
        </div>
        <Col style={{marginRight:'30px', marginLeft:'30px' ,textAlign: 'center',position:'relative'}}>
          <ButtonSearchComponet
            onFocus={focusSearch}
            onBlur = {blurSearch}
            search={searchTerm}
            onSearchChange={handleSearchChange} // Truyền hàm để cập nhật giá trị tìm kiếm
          />
          <NewMenu2 className="menu" isVisible={isMenuVisible}>
            <SuggestSearchComponent productsNew={productsNew} thaydoi={blurSearch} />
          </NewMenu2>
        </Col>
        
        {/* <FunCol style={{ marginRight:'12px', marginLeft:'30px' }}>
          <Image width={25} src={bino}  preview={false}/>
          <LowText>TRA CỨU</LowText>
          <NewMenu className="menu" >
            <MenuItem2><MenuSpan>Kiểm tra đơn hàng</MenuSpan></MenuItem2>
            <MenuItem2><MenuSpan>Kiểm tra bảo hành</MenuSpan></MenuItem2>
          </NewMenu>
        </FunCol> */}

        <FunCol style={{ marginRight:'12px', marginLeft:'12px' }}>
          <Image width={25} src={user} preview={false} />
          <LowText>TÀI KHOẢN</LowText>
          <NewMenu className="menu" >
            {token ? (
              <>
              
                <MenuItem2 style={{ width: "100px" }} onClick={handleAccountClick}>
                  <MenuSpan>Trang cá nhân</MenuSpan>
                </MenuItem2>

                {decodedToken.role !== "Customer" && (
                <><Link style={{textDecoration:'none'}} to='/admin'>
                  <MenuItem2 style={{width:'100px'}}><MenuSpan>Quản lý web</MenuSpan></MenuItem2>
                </Link></>
              )}
                
                <MenuItem2 style={{width:'100px'}} onClick={handleLogout}><MenuSpan>Thoát</MenuSpan></MenuItem2>
              </>
            ) : (
              <>
              
                  <MenuItem2 style={{width:'100px'}}  onClick={handleLogin}><MenuSpan>Đăng nhập</MenuSpan></MenuItem2>
               
                <Link style={{textDecoration:'none'}} to='/signup'>
                  <MenuItem2 style={{width:'100px'}}><MenuSpan>Đăng kí</MenuSpan></MenuItem2>
                </Link>
              </>
            )}
          </NewMenu>
        </FunCol>
        

      
        <FunCol style={{ marginRight:'12px', marginLeft:'12px'  , pointerEvents: canHover && canClick ? 'auto' : 'none', }}>
          <Link style={{textDecoration:'none'}} to='/cart' >
            <Image width={25} src={cart} preview={false} data-testid = "cartPageBtn" />
            <LowText>GIỎ HÀNG</LowText>
          </Link>
          <NewMenu2 className="menu">
            <MiniCartComponent />
          </NewMenu2>
        </FunCol>

      </WrapperHeader>
    </div>
  );
}

export default HeaderComponent;
