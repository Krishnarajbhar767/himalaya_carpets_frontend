import axiosInstance from "../../../utils/apiConnector";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import authEndpoints from "../../endpoints/auth/auth.endpoints";
import { store } from "../../../redux/store";
import { clearUser } from "../../../redux/slices/userSlice";
import {
    clearWishlist,
    setWishList,
} from "../../../redux/slices/wishListSlice";
import { clearCart } from "../../../redux/slices/cartSlice";
import { clearOrders } from "../../../redux/slices/orderSlice";
import { clearCategory } from "../../../redux/slices/categorySlice";
import { clearProducts } from "../../../redux/slices/productSlice";
const authApis = {
    register: async (data) => {
        const res = await axiosInstance.post(authEndpoints.register, data);
        console.log("Register Api Call Res ->", res.data);
        return res?.data?.data;
    },
    sendOtp: async (data) => {
        const res = await axiosInstance.post(authEndpoints.sendOtp, data);
        return res?.data?.data;
    },
    login: async (data) => {
        const res = await axiosInstance.post(authEndpoints.login, data);
        return res?.data?.data;
    },
    logOut: async (data) => {
        const res = await axiosInstance.post(authEndpoints.logout, data);
        store.dispatch(clearUser());
        store.dispatch(clearCart());
        store.dispatch(clearOrders());
        store.dispatch(clearCategory());
        store.dispatch(clearProducts());
        store.dispatch(clearWishlist());
        localStorage.clear();
        return res;
    },
    changePassword: async (data) => {
        const res = await axiosInstance.put(authEndpoints.changePassword, data);
        return res;
    },
    forgotPasswordToken: async (email) => {}, // This Was Directly Called IN ResetPassword Component
    getUser: async (token) => {
        const res = await axiosInstance.get(
            authEndpoints.getUserDetails,
            token
        );
        return res.data?.data;
    },
};
export default authApis;
