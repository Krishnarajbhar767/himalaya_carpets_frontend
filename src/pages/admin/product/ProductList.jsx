import {
    FiBox,
    FiEdit,
    FiTrash,
    FiArrowUp,
    FiArrowDown,
    FiSearch,
} from "react-icons/fi";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductList = () => {
    const products = useSelector((state) => state.product.products) || [];

    // --- local state for search / price ---
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    // --- sorting state ---
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");

    const toggleSort = (field) => {
        if (sortField === field) {
            setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    // --- apply search, price filter, and sorting ---
    const displayedProducts = useMemo(() => {
        let list = [...products];

        // 1. search by name
        if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            list = list.filter((p) => p.name.toLowerCase().includes(term));
        }

        // 2. price filter
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        list = list.filter((p) => p.price >= min && p.price <= max);

        // 3. sorting
        if (sortField) {
            list.sort((a, b) => {
                let aVal = a[sortField],
                    bVal = b[sortField];
                if (sortField === "category") {
                    aVal = a.category.name;
                    bVal = b.category.name;
                }
                if (aVal == null || bVal == null) return 0;
                if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
                return aVal < bVal ? 1 : -1;
            });
        }

        return list;
    }, [products, searchTerm, minPrice, maxPrice, sortField, sortOrder]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiBox size={20} /> Products
                </h2>
                <Link
                    to="/admin/products/add"
                    className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                >
                    Add Product
                </Link>
            </div>

            {/* Search & Price Filters */}
            <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center border border-gray-300 rounded-md px-2">
                    <FiSearch className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ml-1 py-1 text-sm outline-none"
                    />
                </div>
                <input
                    type="number"
                    placeholder="Min price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
                <input
                    type="number"
                    placeholder="Max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                />
            </div>

            {/* Sorting Controls */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => toggleSort("price")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Price
                    {sortField === "price" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>
                <button
                    onClick={() => toggleSort("stock")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Stock
                    {sortField === "stock" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>
                <button
                    onClick={() => toggleSort("rating")}
                    className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Sort by Rating
                    {sortField === "rating" &&
                        (sortOrder === "asc" ? (
                            <FiArrowUp size={16} />
                        ) : (
                            <FiArrowDown size={16} />
                        ))}
                </button>
            </div>

            {/* Product Grid */}
            {displayedProducts.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-600 text-sm">
                        No products match your criteria.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {displayedProducts.map((product) => (
                        <motion.div
                            key={product._id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col gap-2"
                        >
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-36 h-36 object-cover mx-auto rounded-xs object-top"
                            />
                            <h3 className="text-base font-medium text-gray-800 text-center">
                                {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {product.description}
                            </p>
                            <p className="text-sm text-gray-600">
                                Category: {product.category.name}
                            </p>
                            <p className="text-sm text-gray-600">
                                Price: ₹{product.price}
                            </p>
                            <p className="text-sm text-gray-600">
                                Stock: {product.stock}
                            </p>
                            <div className="flex justify-between mt-2">
                                <Link
                                    to={`/admin/products/edit/${product._id}`}
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <FiEdit size={14} /> Edit
                                </Link>
                                <button
                                    onClick={() => {
                                        /* your delete logic */
                                    }}
                                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                    <FiTrash size={14} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default ProductList;
