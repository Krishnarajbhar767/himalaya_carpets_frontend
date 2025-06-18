import React from "react";
import { useForm } from "react-hook-form";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaPinterest,
    FaChevronUp,
} from "react-icons/fa";
import axiosInstance from "../../utils/apiConnector";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../utils/handleAxiosError";

const primaryColor = "rgb(83, 62, 45)";

const Footer = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const subscribeNewsHandler = async (data) => {
        const toastId = toast.loading("Please wait");
        try {
            const res = await axiosInstance.post("/newsletter", data);
            toast.success("Thanks for joining our newsletter!");
            reset();
        } catch (error) {
            const err = handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
    };
    return (
        <footer
            className="bg-[#E4E4E4] pt-12 pb-4"
            style={{ color: primaryColor }}
        >
            <div className="container mx-auto px-4">
                {/* ─── Main Footer Content ─── */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* ─ Logo and Contact Info ─ */}
                    <div>
                        <div className="flex items-center mb-6">
                            <div
                                className="text-2xl font-bold"
                                style={{ color: primaryColor }}
                            >
                                Sr
                                <span className="relative">
                                    Ij
                                    <span className="absolute -right-1 -top-1 w-3 h-3 bg-red-500 rounded-full"></span>
                                </span>
                                A<span className="relative">N</span>
                            </div>
                        </div>

                        <p
                            className="text-sm mb-2"
                            style={{ color: primaryColor }}
                        >
                            1418 River Drive, Suite 35 Cottonhall,
                            <br />
                            CA 9622 United States
                        </p>

                        <p
                            className="text-sm mb-2"
                            style={{ color: primaryColor }}
                        >
                            sale@uomo.com
                        </p>
                        <p
                            className="text-sm mb-6"
                            style={{ color: primaryColor }}
                        >
                            +1 246-345-0695
                        </p>

                        <div className="flex space-x-2 md:space-x-4">
                            {[
                                FaFacebookF,
                                FaTwitter,
                                FaInstagram,
                                FaYoutube,
                                FaPinterest,
                            ].map((Icon, idx) => (
                                <a
                                    href="#"
                                    key={idx}
                                    style={{ color: primaryColor }}
                                    className="hover:opacity-70 transition-opacity"
                                >
                                    <Icon className="md:w-5 w-4 md:h-5 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ─ Company Links ─ */}
                    <div>
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: primaryColor }}
                        >
                            COMPANY
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "About Us",
                                "Careers",
                                "Affiliates",
                                "Blog",
                                "Contact Us",
                            ].map((text, idx) => (
                                <li key={idx}>
                                    <a
                                        href="#"
                                        className="text-sm"
                                        style={{ color: primaryColor }}
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ─ Shop Links ─ */}
                    <div>
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: primaryColor }}
                        >
                            SHOP
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "New Arrivals",
                                "Accessories",
                                "Men",
                                "Women",
                                "Shop All",
                            ].map((text, idx) => (
                                <li key={idx}>
                                    <a
                                        href="#"
                                        className="text-sm"
                                        style={{ color: primaryColor }}
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ─ Help Links ─ */}
                    <div>
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: primaryColor }}
                        >
                            HELP
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "Customer Service",
                                "My Account",
                                "Find a Store",
                                "Legal & Privacy",
                                "Contact",
                                "Gift Card",
                            ].map((text, idx) => (
                                <li key={idx}>
                                    <a
                                        href="#"
                                        className="text-sm"
                                        style={{ color: primaryColor }}
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ─ Subscribe Section ─ */}
                    <div className="col-span-2 md:col-span-1">
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: primaryColor }}
                        >
                            SUBSCRIBE
                        </h3>
                        <p
                            className="text-sm mb-4"
                            style={{ color: primaryColor }}
                        >
                            Be the first to get the latest news about trends,
                            promotions, and much more!
                        </p>

                        <form
                            className="flex flex-col sm:flex-row mb-6 gap-2"
                            onSubmit={handleSubmit(subscribeNewsHandler)}
                        >
                            <input
                                {...register("email")}
                                required
                                type="email"
                                placeholder="Your email address"
                                className="w-full p-2 border outline:foreground focus:ring-[2px] focus:ring-foreground
                                focus:border-transparent outline-none focus:rounded-none"
                                style={{
                                    borderColor: primaryColor,
                                    color: primaryColor,
                                }}
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-4 py-2 font-medium"
                                style={{
                                    backgroundColor: primaryColor,
                                    color: "#fff",
                                }}
                            >
                                JOIN
                            </button>
                        </form>

                        <p
                            className="text-sm font-medium mb-3"
                            style={{ color: primaryColor }}
                        >
                            Secure payments
                        </p>
                        <div className="flex space-x-2">
                            <img
                                src="https://uomo-html.flexkitux.com/images/payment-options.png"
                                alt="Payment Options"
                                className="h-6 object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* ─── Footer Bottom ─── */}
                <div
                    className="border-t pt-4"
                    style={{ borderColor: primaryColor }}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p
                                style={{ color: primaryColor }}
                                className="text-sm"
                            >
                                ©2025 Srijan Fabrics
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
                            <div className="flex items-center">
                                <span
                                    className="text-sm mr-2"
                                    style={{ color: primaryColor }}
                                >
                                    Language
                                </span>
                                <button
                                    className="flex items-center text-sm"
                                    style={{ color: primaryColor }}
                                >
                                    United Kingdom | English
                                </button>
                            </div>

                            <div className="flex items-center">
                                <span
                                    className="text-sm mr-2"
                                    style={{ color: primaryColor }}
                                >
                                    Currency
                                </span>
                                <button
                                    className="flex items-center text-sm"
                                    style={{ color: primaryColor }}
                                >
                                    ₹ INR
                                </button>
                            </div>
                        </div>

                        <a
                            href="#top"
                            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full mt-4 md:mt-0"
                            style={{
                                border: `1px solid ${primaryColor}`,
                                color: primaryColor,
                            }}
                        >
                            <FaChevronUp />
                        </a>
                    </div>
                </div>
            </div>

            {/* ─── Mobile Back to Top ─── */}
            <div className="flex justify-center md:hidden mt-6">
                <a
                    href="#top"
                    className="flex items-center justify-center w-10 h-10 rounded-full"
                    style={{
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                    }}
                >
                    <FaChevronUp />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
