import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/public/home/Home";
import SignUp from "../pages/public/signup/SignUp";
import Login from "../pages/public/login/Login";
import ResetPassword from "../pages/public/reset password/ResetPassword";
import Cart from "../pages/public/cart/Cart";
import VerifyOtp from "../pages/public/verify otp/VerifyOtp";
import NotFound from "../components/common/NotFound";
import CategoryPage from "../pages/public/category/CategoryPage";
import ProductDetailsPage from "../components/common/ProductDetailsPage";
import Wishlist from "../pages/public/wishlist/Wishlist";
import PaymentSuccess from "../components/common/PaymentSuccess";
import PaymentFailed from "../components/common/PaymentFailed";
import AboutUs from "../pages/public/about/About";
import ContactUs from "../pages/public/contact/ContactUs";
import ResetPasswordMain from "../pages/public/reset password/ResetPasswordMain";

const PublicRoutes = (
    <Route element={<MainLayout />}>
        <Route index element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/Sign-up" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordMain />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/products/:category/:id" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/paymentSuccess" element={<PaymentSuccess />} />
        <Route path="/paymentFailed" element={<PaymentFailed />} />
        <Route path="*" element={<NotFound />} />
    </Route>
);

export default PublicRoutes;
