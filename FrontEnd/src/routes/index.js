
import AccountInfoPage from "../pages/AccountInfoPage/AccountInfoPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import CartPage from "../pages/CartPage/CartPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderDetailPage from "../pages/OrderDetailPage/OrderDetailPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SigninPage from "../pages/SigninPage/SigninPage";
export const routes = [
  {
    path: '/',
    page: HomePage,
    isShowHeader: true,
    isProtected: false, // Không cần đăng nhập
  },
  {
    path: '/product/:type',
    page: ProductPage,
    isShowHeader: true,
    isProtected: false,
  },
  {
    path: '/product/product-detail/:productName',
    page: ProductDetailPage,
    isShowHeader: true,
    isProtected: false,
  },
  {
    path: '/cart',
    page: CartPage,
    isShowHeader: true,
    isProtected: true, // Cần đăng nhập
    allowedRoles: ["Customer"], // Vai trò được phép
  },
  {
    path: '/account',
    page: AccountPage,
    isShowHeader: true,
    isProtected: true,
    allowedRoles: ["Customer", "Seller", "Admin","WarehouseStaff"], // Vai trò được phép
  },
  {
    path: '/login',
    page: LoginPage,
    isShowHeader: true,
    isProtected: false,
  },
  {
    path: '/signup',
    page: SigninPage,
    isShowHeader: true,
    isProtected: false,
  },
  {
    path: '/account/account-info',
    page: AccountInfoPage,
    isShowHeader: true,
    isProtected: true,
    allowedRoles: ["Customer", "Seller", "Admin","WarehouseStaff"], // Chỉ khách hàng và admin
  },
  {
    path: '/order-detail/:orderID',
    page: OrderDetailPage,
    isShowHeader: true,
    isProtected: true,
    allowedRoles: ["Customer", "Admin" , "Seller"], // Chỉ khách hàng và admin
  },
  {
    path: '/order-detail/payment',
    page: PaymentPage,
    isShowHeader: false,
    isProtected: true,
    allowedRoles: ["Customer"], // Chỉ khách hàng
  },
  {
    path: '/admin',
    page: AdminPage,
    isShowHeader: false,
    isProtected: true,
    allowedRoles: ["Seller", "Admin","WarehouseStaff"], // Chỉ admin
  },
  {
    path: '*',
    page: NotFoundPage,
    isProtected: false,
  },
];
