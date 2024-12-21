import React, { useContext, useEffect } from 'react'
import SlideShowComponent from '../../components/HomePageC/SlideShowComponent/SlideShowComponent'
import InfoBlocksComponent from '../../components/HomePageC/InfoBlocksComponent/InfoBlocksComponent'
import ProductSliderComponent from '../../components/HomePageC/ProductSliderComponent/ProductSliderComponent'
import Gallery from '../../components/HomePageC/CatagoryComponent/Galary'
import RacketImage from '../../images/Racket.jpg';
import { AppContexts } from '../../contexts/AppContexts'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecentProducts, searchProductsByName } from '../../redux/Slicer/productSlice'
import { jwtDecode } from 'jwt-decode'
import { fetchCartByUserId } from '../../redux/Slicer/cartSlice'
const HomePage = () => {

  const slideImages = [
    {
      url: 'https://cdn.shopvnb.com/img/1920x640/uploads/slider/ynx-eclp-banner_1695178004.webp',
      caption: 'Slide 1'
    },
    {
      url: 'https://cdn.shopvnb.com/img/1920x640/uploads/slider/ynx-eclp-banner_1695178004.webp',
      caption: 'Slide 2'
    },
    {
      url: 'https://cdn.shopvnb.com/img/1920x640/uploads/slider/ynx-eclp-banner_1695178004.webp',
      caption: 'Slide 3'
    },
  ];

  const tabItems = [
    { key: "all", label: "Tất cả" },
    { key: "Vợt", label: "Vợt Cầu Lông" },
    { key: "Giày", label: "Giày Cầu Lông" },
    
    { key: "Áo", label: "Áo Cầu Lông" },
    { key: "Váy", label: "Váy Cầu Lông" },
    { key: "Quần", label: "Quần Cầu Lông" },
    { key: "Túi", label: "Túi Vợt Cầu Lông" },
    { key: "Balo", label: "Balo Cầu Lông" },
    { key: "Phụ kiện", label: "Phụ Kiện Cầu Lông" },
  ];
  
  // const product = [
  //   {
  //     id: 1,
  //     name: 'Vợt Cầu Lông VNB TC68B',
  //     price: 799000,
  //     originalPrice: 899000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Vợt',
  //   },
  //   {
  //     id: 2,
  //     name: 'Giày Cầu Lông Taro TR024-2',
  //     price: 499000,
  //     originalPrice: 599000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Giày',
  //   },
  //   {
  //     id: 3,
  //     name: 'Giày Cầu Lông Taro TR024-1',
  //     price: 499000,
  //     originalPrice: 599000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Giày',
  //   },
  //   {
  //     id: 4,
  //     name: 'Túi Cầu Lông Taro TR024-BAG01',
  //     price: 599000,
  //     originalPrice: 699000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Túi',
  //   },
  //   {
  //     id: 5,
  //     name: 'Balo Cầu Lông Taro TR024-BA01',
  //     price: 349000,
  //     originalPrice: 399000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Balo',
  //   },
  //   {
  //     id: 6,
  //     name: 'Vợt Cầu Lông Yonex NanoFlare 700',
  //     price: 1499000,
  //     originalPrice: 1599000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Vợt',
  //   },
  //   {
  //     id: 7,
  //     name: 'Vợt Cầu Lông Lining 3D Calibar',
  //     price: 1799000,
  //     originalPrice: 1899000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Vợt',
  //   },
  //   {
  //     id: 8,
  //     name: 'Giày Cầu Lông Mizuno Wave Fang',
  //     price: 1299000,
  //     originalPrice: 1399000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Giày',
  //   },
  //   {
  //     id: 9,
  //     name: 'Túi Cầu Lông Yonex BAG9826',
  //     price: 999000,
  //     originalPrice: 1099000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Túi',
  //   },
  //   {
  //     id: 10,
  //     name: 'Balo Cầu Lông Yonex BAG9632EX',
  //     price: 799000,
  //     originalPrice: 899000,
  //     imgSrc: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-tc88b-1.webp',
  //     category: 'Balo',
  //   },
  // ];



  function transformProducts(products) {
    return products.map((product, index) => {
      const firstColor = product.colors[0]; // Lấy thông tin của màu đầu tiên
      return {
        id: product._id, // ID duy nhất cho từng sản phẩm
        name: product.name, // Tên sản phẩm
        price: firstColor.discountPrice, // Giá sau giảm của màu đầu tiên
        originalPrice: firstColor.price, // Giá gốc của màu đầu tiên
        imgSrc: firstColor.images[0], // Ảnh đầu tiên của màu đầu tiên
        category: product.type // Loại sản phẩm
      };
    });
  }
  
  
  const itemsArray = [
    { src: RacketImage, text: "Vợt Cầu Lông" ,key: "Vợt" },
    { src: RacketImage, text: "Giày Cầu Lông" ,key: "Giày"},
    { src: RacketImage, text: "Áo Cầu Lông" ,key: "Áo"},
    { src: RacketImage, text: "Váy Cầu Lông" ,key: "Váy"},
    { src: RacketImage, text: "Quần Cầu Lông" ,key: "Quần"},
    { src: RacketImage, text: "Túi Vợt Cầu Lông" ,key: "Túi"},
    { src: RacketImage, text: "Balo Cầu Lông", key: "Balo"},
    { src: RacketImage, text: "Phụ Kiện Cầu Lông", key: "Phụ kiện"},
  ];


 
  const types = [
    "Vợt", 
    "Giày", 
    "Áo", 
    "Váy", 
    "Quần", 
    "Túi", 
    "Balo", 
    "Phụ kiện"
  ];
  

  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);



  useEffect(() => {
    dispatch(fetchRecentProducts(types));
  }, [dispatch]);


 
   var product = transformProducts(products)
  
   localStorage.getItem("cart")
   console.log("CARTT",localStorage.getItem("cart") )


  
  return (
    
    <div style={{height:'5000px'}}>
    
    <SlideShowComponent slideImages={slideImages} />
    <InfoBlocksComponent></InfoBlocksComponent>
    <ProductSliderComponent tabItems={tabItems} products={product} />
    <Gallery itemsArray={itemsArray} />;
    </div>
  )
}

export default HomePage
