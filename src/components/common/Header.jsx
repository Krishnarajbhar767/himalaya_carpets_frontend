import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import slugify from "slugify";

import Search from "./Search";
import LoginSidebar from "./LoginSidebar";
import CartSidebar from "./CartSidebar";
import { setStepCount } from "../../redux/slices/cartSlice";

import LOGO from "../../assets/images/logo/SRIJAN FABS PNG VERTICAL.png";

function Header() {
    const headerRef = useRef(null);
    const categories = useSelector(
        (state) => state?.category?.categories || []
    );
    const { cartItems } = useSelector(
        (state) => state?.cart || { cartItems: [] }
    );
    const wishlistItems = useSelector((state) => state.wishlist || []);
    const token =
        useSelector((state) => state?.user?.token) ||
        localStorage.getItem("token");
    const role = useSelector((state) => state?.user?.user?.role);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    // Build category-based sublinks
    const [optimisedCategoriesList, setOptimisedCategoriesList] = useState([]);
    useEffect(() => {
        const sortedCategories = [...categories].sort((a, b) => {
            if (a.name.toLowerCase() === "all") return -1;
            if (b.name.toLowerCase() === "all") return 1;
            return 0;
        });

        const navLinks = sortedCategories.map((item) => {
            const slug = slugify(item.name, { lower: true, strict: true });
            return {
                title: item.name,
                _id: item._id,
                path: `/products/${slug}/${item._id}`,
            };
        });
        setOptimisedCategoriesList(navLinks);
    }, [categories]);

    // Top‐level navigation items
    const Links = [
        { title: "Home", path: "/" },
        { title: "Product", path: "#", subLinks: optimisedCategoriesList },
        { title: "About Us", path: "/about" },
        { title: "Contact Us", path: "/contact" },
    ];

    // Sidebar + menu state
    const [isSearching, setIsSearching] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    // Toggle a submenu inside mobile menu
    const toggleSubmenu = (title) =>
        setOpenSubmenu(openSubmenu === title ? null : title);

    // Make header sticky on scroll
    useEffect(() => {
        const handleScroll = () => {
            const header = headerRef.current;
            if (!header) return;
            if (window.scrollY > 0) {
                header.classList.add("sticky-header");
            } else {
                header.classList.remove("sticky-header");
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Icon handlers
    const handleAccountClick = () => {
        if (token) {
            if (role === "user") navigate("/account/dashboard");
            else navigate("/admin/overview");
        } else if (location.pathname !== "/login") {
            setIsLogin(true);
        }
    };
    const handleCartClick = () => {
        if (location.pathname === "/cart") return;
        if (token) {
            dispatch(setStepCount(1));
            navigate("/cart");
        } else {
            setIsCartOpen(true);
        }
    };

    return (
        <div
            className="header-wrapper border-b border-gray-300"
            ref={headerRef}
        >
            <header className="bg-white text-foreground px-4 sm:px-6 h-20 shadow flex items-center justify-between">
                {/* ─── Desktop Nav (md and up) ─── */}
                <nav className="hidden md:flex gap-6 md:gap-3 lg:gap-6 text-foreground font-medium text-sm lg:text-[14px] tracking-wide uppercase ">
                    {Links.map((link) => (
                        <div key={link.title} className="relative group">
                            {link.subLinks ? (
                                <div className="flex items-center gap-1 cursor-pointer">
                                    <span className="hover:text-primary transition-colors">
                                        {link.title}
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-foreground group-hover:rotate-180 transition-transform duration-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m19 9-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                <NavLink
                                    to={link.path}
                                    end
                                    className={({ isActive }) =>
                                        `hover:text-primary transition-colors ${
                                            isActive ? "text-primary" : ""
                                        }`
                                    }
                                >
                                    {link.title}
                                </NavLink>
                            )}

                            {link.subLinks && (
                                <div className="absolute left-0 top-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div className="bg-white shadow-sm border border-gray-200 rounded-md flex flex-col gap-2 p-4 w-48 text-sm">
                                        {link.subLinks.map((sublink) => (
                                            <NavLink
                                                key={sublink._id}
                                                to={sublink.path}
                                                className={({ isActive }) =>
                                                    `hover:text-primary ${
                                                        isActive
                                                            ? "text-primary font-semibold"
                                                            : ""
                                                    }`
                                                }
                                            >
                                                {sublink.title}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* ─── Left: Logo ─── */}
                <Link to="/" className="flex-shrink-0">
                    <img
                        src={LOGO}
                        alt="Logo"
                        className="h-16 w-auto object-contain"
                    />
                </Link>

                {/* ─── Desktop Icons (hidden on mobile) ─── */}
                <div className="hidden md:flex items-center gap-2 sm:gap-3">
                    {/* Search */}
                    <button
                        onClick={() => setIsSearching(true)}
                        className="p-1.5"
                        aria-label="Open search"
                    >
                        <svg
                            className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeWidth="2"
                                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </button>

                    {/* Account */}
                    <button
                        onClick={handleAccountClick}
                        className="p-1.5"
                        aria-label="Open login"
                    >
                        <svg
                            className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    </button>

                    {/* Cart */}
                    <button
                        onClick={handleCartClick}
                        className="p-1.5 relative"
                        aria-label="Open cart"
                    >
                        <svg
                            className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                            />
                        </svg>
                        {cartItems?.length > 0 && (
                            <div className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                {cartItems.length}
                            </div>
                        )}
                    </button>

                    {/* Wishlist */}
                    <button
                        onClick={() => {
                            if (location.pathname !== "/wishlist")
                                navigate("/wishlist");
                        }}
                        className="p-1.5 relative"
                        aria-label="Open wishlist"
                    >
                        <svg
                            className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                            />
                        </svg>
                        {wishlistItems?.length > 0 && (
                            <div className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                {wishlistItems.length}
                            </div>
                        )}
                    </button>
                </div>

                {/* ─── Hamburger (mobile only) ─── */}
                <button
                    className="md:hidden p-1.5 focus:outline-none"
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6 text-foreground hover:text-primary transition-colors duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={
                                isMenuOpen
                                    ? "M6 18L18 6M6 6l12 12" // “X” when open
                                    : "M4 6h16M4 12h16m-7 6h7" // hamburger when closed
                            }
                        />
                    </svg>
                </button>
            </header>

            {/* ─── Mobile Menu + Icons (only when isMenuOpen) ─── */}
            {isMenuOpen && (
                <nav className="md:hidden bg-white border-t border-gray-200">
                    <div className="flex flex-col px-4 py-3">
                        {/* ─ Links Section ─ */}
                        {Links.map((link) => (
                            <div key={link.title} className="py-2">
                                <div className="flex justify-between items-center">
                                    {link.subLinks ? (
                                        <span className="text-foreground text-sm tracking-wider capitalize">
                                            {link.title}
                                        </span>
                                    ) : (
                                        <NavLink
                                            to={link.path}
                                            end
                                            className={({ isActive }) =>
                                                `text-foreground text-sm tracking-wider capitalize ${
                                                    isActive
                                                        ? "text-primary font-semibold"
                                                        : ""
                                                }`
                                            }
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.title}
                                        </NavLink>
                                    )}
                                    {link.subLinks && (
                                        <button
                                            onClick={() =>
                                                toggleSubmenu(link.title)
                                            }
                                            className="p-1"
                                            aria-label={`Toggle ${link.title} submenu`}
                                        >
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-300 ${
                                                    openSubmenu === link.title
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* ─ Nested sublinks (only if “Product” expanded) ─ */}
                                {link.subLinks &&
                                    openSubmenu === link.title && (
                                        <div className="mt-2 flex flex-col gap-2 pl-2">
                                            {link.subLinks.map((sublink) => (
                                                <NavLink
                                                    key={sublink._id}
                                                    to={sublink.path}
                                                    className={({ isActive }) =>
                                                        `text-xs text-foreground hover:text-primary  px-3 py-2 rounded-md ${
                                                            isActive
                                                                ? "text-primary font-semibold"
                                                                : ""
                                                        }`
                                                    }
                                                    onClick={() =>
                                                        setIsMenuOpen(false)
                                                    }
                                                >
                                                    {sublink.title}
                                                </NavLink>
                                            ))}
                                        </div>
                                    )}
                            </div>
                        ))}

                        {/* ─ Divider ─ */}
                        <div className="mt-4 border-t border-gray-200"></div>

                        {/* ─ Icons Section (stacked) ─ */}
                        <div className="mt-4 flex flex-col gap-4">
                            {/* Search */}
                            <button
                                onClick={() => {
                                    setIsSearching(true);
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth="2"
                                        d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="text-sm">Search</span>
                            </button>

                            {/* Account */}
                            <button
                                onClick={() => {
                                    handleAccountClick();
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                                <span className="text-sm">Account</span>
                            </button>

                            {/* Cart */}
                            <button
                                onClick={() => {
                                    handleCartClick();
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors relative"
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"
                                    />
                                </svg>
                                {cartItems?.length > 0 && (
                                    <div className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                        {cartItems.length}
                                    </div>
                                )}
                                <span className="text-sm">Cart</span>
                            </button>

                            {/* Wishlist */}
                            <button
                                onClick={() => {
                                    if (location.pathname !== "/wishlist")
                                        navigate("/wishlist");
                                    setIsMenuOpen(false);
                                }}
                                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors relative"
                            >
                                <svg
                                    className="w-5 h-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                    />
                                </svg>
                                {wishlistItems?.length > 0 && (
                                    <div className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                                        {wishlistItems.length}
                                    </div>
                                )}
                                <span className="text-sm">Wishlist</span>
                            </button>
                        </div>
                    </div>
                </nav>
            )}

            {/* ─── Sidebars (Search, Login, Cart) ─── */}
            <AnimatePresence>
                {isSearching && (
                    <Search
                        closeHandler={() => setIsSearching(false)}
                        isOpen={isSearching}
                    />
                )}
                {isLogin && location.pathname !== "/login" && (
                    <LoginSidebar
                        closeHandler={() => setIsLogin(false)}
                        isOpen={isLogin}
                    />
                )}
                {isCartOpen && (
                    <CartSidebar
                        closeHandler={() => setIsCartOpen(false)}
                        isOpen={isCartOpen}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Header;
