import React, { useEffect, useState } from 'react'; 
import ButtonSearchComponet from '../../Header/ButtonSearchComponent/ButtonSearchComponet';
import { HeaderMobile, WrapperHeader } from './style';
import { Avatar, Badge, Button, Col, Image, Menu, Row } from 'antd';
import { NewMenu2, MenuSpan, HotlineContainer, Icon, Label, PhoneNumber, Separator, SearchCol, LowText, FunCol, NewMenu, MenuItem2 } from "./style";
import logovot from '../../../../images/Logo.svg';
import bino from '../../../../images/bino.svg';
import user from '../../../../images/user.svg';
import { SearchOutlined, AudioOutlined } from '@ant-design/icons';
import cart from '../../../../images/cart.svg';
import MiniCartComponent from '../MiniCartComponent/MiniCartComponent';
import SuggestSearchComponent from '../SuggestSearchComponent/SuggestSearchComponent';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductsByName } from '../../../../redux/Slicer/productSlice';
import { jwtDecode } from 'jwt-decode';
import { fetchCartByUserId, updateCart } from '../../../../redux/Slicer/cartSlice';

import { UserOutlined } from "@ant-design/icons";
import { fetchUserById, updateWishlist } from '../../../../redux/Slicer/userSlice';
import { SearchIconButton } from './style';
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
   

  const men = useSelector((state) => state.user);
    
    // Gọi API lấy thông tin user khi load trang
    useEffect(() => {
      const token = localStorage.getItem('token'); 
      if (token) {
        try {
          const decodedToken = jwtDecode(token); 
          if (decodedToken?.userId) {
            dispatch(fetchUserById(decodedToken.userId));
          } else {
            console.warn('Không tìm thấy userId trong token.');
          }
        } catch (error) {
          console.error('Lỗi khi giải mã token:', error);
        }
      } else {
        console.warn('Không tìm thấy token trong LocalStorage.');
      }
    }, [dispatch]);

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


      const wishlist =  JSON.parse(localStorage.getItem("wishlist"));
      dispatch(updateWishlist({ userId: parsedCart?.iduser, wishList: wishlist }));

    localStorage.clear();
   
    navigate('/');



    
    setTimeout(() => {
      window.location.reload();
  }, 300); 
   window.location.reload()
  
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
    console.log("Thông tin giải mã token:",decodedToken );
  } else {
    console.log("Không có token để giải mã.");
  }
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];  // Nếu không có dữ liệu, trả về mảng rỗng
console.log("WISHLIST", wishlist);

  console.log("MEEMEE",decodedToken.wishlist)
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
    
    const [isSearchVisible, setSearchVisible] = useState(false); // Trạng thái hiển thị thanh tìm kiếm
    const handleSearchToggle = () => {
      setSearchVisible(prevState => !prevState); // Bật/tắt thanh tìm kiếm
    };

    console.log("MEEEEEEE",parsedCart)
    const extractProductDetails = (products) => {
      let counter = 1; // Bắt đầu từ 1
        return products?.map((product) => {
            const { idproduct, colorid, idattributevalue, number } = product;
            const color = idproduct.colors.find((c) => c.id === colorid);
  
            return {
                _id: idproduct._id,
                id: counter++,
                name: idproduct.name,
                quantity: number,
                price: color ? color.price : null,
                image: color && color.images?.length > 0 ? color.images[0] : null,
                attributeValue: idattributevalue ? idattributevalue.value : null,
                attributeId: idattributevalue ? idattributevalue._id : null,
                colorid: colorid,
                colorName: color?.colorName,
            
  
            };
        });
    };
  
    const result = extractProductDetails(parsedCart?.products);
    const initialCartItems = () => {
        const localCartItems = localStorage.getItem("cartItems");
        if (JSON.parse(localCartItems) && JSON.parse(localCartItems)?.length !== 0) {
            console.log("DCCCCM")
            return JSON.parse(localCartItems);
        }
        localStorage.setItem("cartItems", JSON.stringify(result || []));
        return result || [];
    };
    
    
      
    
        const [cartItems, setCartItems] = useState(initialCartItems());
    return (
    <div>
      <WrapperHeader justify="center" align="middle">
        <div style={{marginRight:'30px', marginLeft:'30px'}} >
        <Link style={{ textDecoration: 'none' }} to='/'>
          <Image preview={false} width={50} src={logovot} />
          </Link>
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
          {/* Kiểm tra xem user.avatar có tồn tại không, nếu có thì hiển thị ảnh, nếu không thì hiển thị icon mặc định */}
          {men.user ? (
  <>
    <Avatar
      src={men.user.avatar || user} // Nếu có avatar, dùng avatar, nếu không dùng icon mặc định
      size={25} // Kích thước avatar
    />
    <LowText> {men.user.username?.toUpperCase()}</LowText>
  </>
) : (
  <>
  <Image width={25} src={user} preview={false} />
  <LowText>TÀI KHOẢN</LowText>
  </>
)}


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
        

      
     

<FunCol style={{ marginRight: '12px', marginLeft: '12px', pointerEvents: canHover && canClick ? 'auto' : 'none' }}>
  <Link style={{ textDecoration: 'none' }} to="/cart">
  { cartItems && cartItems.length > 0 ? (
  <Badge count={cartItems.length} offset={[10, 0]}>
    <Image width={25} src={cart} preview={false} data-testid="cartPageBtn" />
  </Badge>
) : (
  <Image width={25} src={cart} preview={false} data-testid="cartPageBtn" />
)}

    <LowText>GIỎ HÀNG</LowText>
  </Link>
  <NewMenu2 className="menu">
    <MiniCartComponent />
  </NewMenu2>
</FunCol>


      </WrapperHeader>
      <HeaderMobile>
      <Row justify="space-between" align="middle">
        <Col span={6} style={{ textAlign: 'left' }}>
          <SearchIconButton
            icon={<SearchOutlined />}
            onClick={handleSearchToggle} // Khi bấm vào icon, toggle thanh tìm kiếm
          />
        </Col>

        <Col span={12} style={{ textAlign: 'center' }}>
          <Link style={{ textDecoration: 'none' }} to='/'>
            <Image preview={false} width={30} src={logovot} />
          </Link>
        </Col>

        <Col span={6} style={{ textAlign: 'right', display: 'flex', alignItems: 'center' }}>
          <FunCol style={{ marginRight:'-42px' }}>
            {men.user ? (
              <>
                <Avatar
                  src={men.user.avatar || user}
                  size={25}
                  style={{ marginRight: '-42px' }}
                />
              </>
            ) : (
              <>
                <Image width={25} src={user} preview={false} style={{ marginRight: '-42px' }} />
              </>
            )}

            <NewMenu className="menu">
              {token ? (
                <>
                  <MenuItem2 style={{ width: "100px" }} onClick={handleAccountClick}>
                    <MenuSpan>Trang cá nhân</MenuSpan>
                  </MenuItem2>
                  {decodedToken.role !== "Customer" && (
                    <Link style={{ textDecoration: 'none' }} to='/admin'>
                      <MenuItem2 style={{ width: '100px' }}>
                        <MenuSpan>Quản lý web</MenuSpan>
                      </MenuItem2>
                    </Link>
                  )}
                  <MenuItem2 style={{ width: '100px' }} onClick={handleLogout}>
                    <MenuSpan>Thoát</MenuSpan>
                  </MenuItem2>
                </>
              ) : (
                <>
                  <MenuItem2 style={{ width: '100px' }} onClick={handleLogin}>
                    <MenuSpan>Đăng nhập</MenuSpan>
                  </MenuItem2>
                  <Link style={{ textDecoration: 'none' }} to='/signup'>
                    <MenuItem2 style={{ width: '100px' }}>
                      <MenuSpan>Đăng kí</MenuSpan>
                    </MenuItem2>
                  </Link>
                </>
              )}
            </NewMenu>
          </FunCol>

          <FunCol style={{ marginRight: '-152px' }}>
            <Link style={{ textDecoration: 'none' }} to='/cart'>
            { cartItems && cartItems.length > 0  ? (
  <Badge style={{ marginRight: '-65px' }} count={cartItems.length} offset={[10, 0]}>
    <Image style={{ marginRight: '-152px' }} width={25} src={cart} preview={false} data-testid="cartPageBtn" />
  </Badge>
) : (
  <Image width={25} src={cart} preview={false} data-testid="cartPageBtn" />
)}

            </Link>
          </FunCol>
        </Col>
      </Row>

      {isSearchVisible && ( // Hiển thị thanh tìm kiếm nếu isSearchVisible là true
        <Row style={{ marginTop: '10px', marginRight: '5px', marginLeft: '30px', textAlign: 'center', position: 'relative' }}>
          <ButtonSearchComponet
            onFocus={focusSearch}
            onBlur={blurSearch}
            search={searchTerm}
            onSearchChange={handleSearchChange} // Truyền hàm để cập nhật giá trị tìm kiếm
          />
          <NewMenu2 className="menu" isVisible={isMenuVisible}>
            <SuggestSearchComponent productsNew={productsNew} thaydoi={blurSearch} />
          </NewMenu2>
        </Row>
      )}
    </HeaderMobile>

    </div>
  );
}

export default HeaderComponent;