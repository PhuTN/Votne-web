import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContexts = createContext({})

export const AppProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [manufactuers, setManufactuers] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [orders, setOrders] = useState([]);
    const [carts, setCarts] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [shop, setShop] = useState([]);
    const [refunds, setRefunds] = useState([]);

    const fetchUsers = () => {
        axios.get("http://localhost:8081/v1/api/getAllUser")
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchManufactuers = () => {
        axios.get("http://localhost:8081/v1/api/getAllManufactuer")
            .then((res) => {
                console.log(res.data);
                setManufactuers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchProducts = () => {
        axios.get("http://localhost:8081/v1/api/getAllProduct")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchOrders= () => {
        axios.get("http://localhost:8081/v1/api/getAllOrder")
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchCategories= () => {
        axios.get("http://localhost:8081/v1/api/getAllCategorie")
            .then((res) => {
                console.log(res.data);
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchCarts= () => {
        axios.get("http://localhost:8081/v1/api/getAllCart")
            .then((res) => {
                console.log(res.data);
                setCarts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchCoupons= () => {
        axios.get("http://localhost:8081/v1/api/getAllCoupon")
            .then((res) => {
                console.log(res.data);
                setCoupons(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchShop= () => {
        axios.get("http://localhost:8081/v1/api/getAllCoupon")
            .then((res) => {
                console.log(res.data);
                setShop(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const fetchRefunds= () => {
        axios.get("http://localhost:8081/v1/api/getAllCoupon")
            .then((res) => {
                console.log(res.data);
                setRefunds(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };





    useEffect(() => {
        fetchUsers();
        fetchManufactuers();
        fetchProducts();
        fetchOrders();
        fetchCategories();
        fetchCarts();
        fetchCoupons();
        fetchShop();
        fetchRefunds();
    }, []);

    return (
        <AppContexts.Provider value={{
            users, setUsers,
            manufactuers, setManufactuers,
            products, setProducts,
            orders, setOrders,
            categories, setCategories,
            carts, setCarts,
            coupons, setCoupons,
            shop, setShop,
            refunds, setRefunds,
            fetchCarts, fetchCategories, fetchCoupons,
            fetchManufactuers, fetchOrders, fetchProducts,
            fetchRefunds, fetchShop, fetchUsers
        }}>
            {children}
        </AppContexts.Provider>
    );
};
