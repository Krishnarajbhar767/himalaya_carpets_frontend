import { useEffect, useState } from "react";
import Heading from "../../pages/public/home/components/Heading";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import slugify from "slugify";

const Search = ({ isOpen, closeHandler }) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, []);

    const categories = useSelector(
        (state) => state?.category?.categories || []
    );
    const products = useSelector((state) => state?.product?.products || []);
    const filteredProducts = query
        ? products.filter((item) =>
              item?.name?.toLowerCase().includes(query.toLowerCase())
          )
        : products;

    return (
        <div
            className="fixed z-[100] inset-0 w-screen h-screen flex bg-gray-900/25"
            onClick={closeHandler}
        >
            <motion.div
                className="absolute flex flex-col bg-white w-full sm:w-4/5 md:w-1/2 lg:w-1/3 h-full right-0 z-[101]"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0, x: 300 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <Header closeHandler={closeHandler} />

                {/* Search Input */}
                <SearchInput query={query} setQuery={setQuery} />

                {/* Content */}
                <SearchContent
                    categories={categories}
                    products={filteredProducts}
                    closeHandler={closeHandler}
                    query={query}
                />
            </motion.div>
        </div>
    );
};

export default Search;

// ---------------------- Components ----------------------

const Header = ({ closeHandler }) => (
    <>
        <div className="flex justify-between items-center w-full px-4 sm:px-6 py-4">
            <Heading text="Search" />
            <button
                onClick={closeHandler}
                className="p-2"
                aria-label="Close search"
            >
                <svg
                    className="w-7 h-7 text-foreground hover:text-foreground/80"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                </svg>
            </button>
        </div>
        <hr className="border-foreground/50 mx-4 sm:mx-6" />
    </>
);

const SearchInput = ({ query, setQuery }) => (
    <div className="px-4 sm:px-6 py-4">
        <div className="relative pl-8 sm:pl-10 rounded-md border border-foreground/80">
            <input
                placeholder="Search..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="outline-none w-full border-none py-2 text-sm sm:text-base text-foreground"
            />
            <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-foreground absolute left-2 top-1/2 -translate-y-1/2"
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
        </div>
        <hr className="text-foreground/80 mt-4 mx-0 sm:mx-2" />
    </div>
);

const SearchContent = ({ categories, products, closeHandler, query }) => (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4">
        {/* Categories */}
        <h1 className="font-medium text-base sm:text-lg text-foreground tracking-wide mt-2">
            Quick Links
        </h1>
        <ul className="text-foreground mt-2 space-y-1 text-xs sm:text-sm tracking-wide capitalize flex flex-col ">
            {categories?.slice(0, 3).map((item) => {
                const slug = slugify(item.name, {
                    lower: true,
                    strict: true,
                });
                return (
                    <Link
                        key={item._id}
                        onClick={closeHandler}
                        to={`/products/${slug}/${item._id}`}
                        className="cursor-pointer hover:text-foreground/80"
                    >
                        {item?.name}
                    </Link>
                );
            })}
        </ul>

        {/* Products */}
        <h1 className="font-medium text-base sm:text-lg text-foreground mt-4">
            {query ? "Search Results" : "Need some inspiration?"}
        </h1>
        <div className="mt-3 space-y-3">
            {products?.length > 0 ? (
                products.map((item) => (
                    <ProductCard
                        key={item._id}
                        item={item}
                        closeHandler={closeHandler}
                    />
                ))
            ) : (
                <p className="text-sm text-gray-500">No products found.</p>
            )}
        </div>
    </div>
);

const ProductCard = ({ item, closeHandler }) => (
    <Link to={`/product/${item._id}`} onClick={closeHandler}>
        <div className="flex h-20 sm:h-24 gap-3 border-b last:border-b-0 border-foreground/40 pb-3">
            {/* Image */}
            <div className="w-16 sm:w-20">
                <img
                    src={item.images?.[0]}
                    className="h-full w-full object-cover cursor-pointer"
                    alt={item?.name}
                />
            </div>
            {/* Info */}
            <div className="flex-1 space-y-1 mt-1">
                <h1 className="capitalize text-xs sm:text-sm cursor-pointer line-clamp-1">
                    {item?.name}
                </h1>
                <h2 className="text-xs sm:text-sm cursor-pointer">
                    {item?.price}
                </h2>
            </div>
        </div>
    </Link>
);
