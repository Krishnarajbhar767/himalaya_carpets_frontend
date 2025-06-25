import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SidebarFilter from "../../../components/common/SidebarFilter";
import { Star, Filter, Grid, List, ChevronDown } from "lucide-react";

// Enhanced CategoryPage Component adapted for Carpet schema
function CategoryPage() {
    const { id, category } = useParams();
    const displayCategory = category?.replace(/-/g, " ") || "Category";

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState("default");
    const [viewMode, setViewMode] = useState("grid");

    // Enhanced skeleton loader with shimmer effect
    const ProductSkeleton = () => (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                </div>
            </div>
            <div className="p-4 space-y-3">
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                </div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-3/4 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-20 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                    </div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded w-16 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Fetch products and category details
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/categories/${id}`
                );
                if (!response.ok)
                    throw new Error("Failed to fetch category data");
                const data = await response.json();
                const prods = data?.data?.products || [];
                setProducts(prods);
                setFilteredProducts(prods);
                setCategoryDetails({
                    name: data?.data?.name || displayCategory,
                    description:
                        data?.data?.description ||
                        "Explore our curated collection of premium carpets with various materials, weaves, textures, and styles.",
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [id, displayCategory]);

    // Handle filter changes: filters may include priceRange, material, weaving, texture, size, style, color
    const handleFilterChange = (filters) => {
        const { priceRange, material, weaving, texture, size, style, color } =
            filters;
        let filtered = products.filter((product) => {
            const inPriceRange =
                product.price >= priceRange[0] &&
                product.price <= priceRange[1];
            const matchesMaterial = material
                ? product.material === material
                : true;
            const matchesWeaving = weaving ? product.weaving === weaving : true;
            const matchesTexture = texture ? product.texture === texture : true;
            const matchesSize = size ? product.size === size : true;
            const matchesStyle = style ? product.style === style : true;
            const matchesColor = color ? product.color === color : true;
            return (
                inPriceRange &&
                matchesMaterial &&
                matchesWeaving &&
                matchesTexture &&
                matchesSize &&
                matchesStyle &&
                matchesColor
            );
        });

        filtered = sortProducts(filtered, sortOption);
        setFilteredProducts(filtered);
    };

    // Sort products based on selected option
    const sortProducts = (productsToSort, option) => {
        const sorted = [...productsToSort];
        if (option === "price-low-to-high") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (option === "price-high-to-low") {
            sorted.sort((a, b) => b.price - a.price);
        } else if (option === "rating") {
            sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (option === "newest") {
            sorted.sort(
                (a, b) =>
                    new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            );
        }
        return sorted;
    };

    // Handle sort option change
    const handleSortChange = (e) => {
        const option = e.target.value;
        setSortOption(option);
        const sorted = sortProducts(filteredProducts, option);
        setFilteredProducts(sorted);
    };

    const renderStars = (rating) => {
        return Array(5)
            .fill()
            .map((_, index) => (
                <Star
                    key={index}
                    className={`w-3 h-3 ${
                        index < Math.floor(rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                    }`}
                />
            ));
    };

    return (
        <main>
            <div className="boxedContainer pb-4">
                {/* Header Section */}
                <div className="py-8 border-b border-gray-200 bg-white mb-8 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center space-y-4">
                            <h1 className="text-3xl md:text-4xl font-medium text-foreground capitalize tracking-tight">
                                {categoryDetails?.name || displayCategory}
                            </h1>
                            <p className="text-lg text-foreground max-w-2xl mx-auto leading-relaxed">
                                {categoryDetails?.description}
                            </p>
                            <div className="flex items-center justify-center gap-2 text-sm text-foreground">
                                <span className="w-2 h-2 bg-green-500 rounded-full "></span>
                                <span className="text-foreground">
                                    {filteredProducts.length} Products Available
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter and Sort Controls */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden flex items-center gap-2 bg-foreground text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>

                        {/* View Mode Toggle */}
                        <div className="hidden sm:flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-md transition-colors ${
                                    viewMode === "grid"
                                        ? "bg-white shadow-sm text-foreground"
                                        : "text-foreground hover:text-foreground"
                                }`}
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-md transition-colors ${
                                    viewMode === "list"
                                        ? "bg-white shadow-sm text-foreground"
                                        : "text-foreground hover:text-foreground"
                                }`}
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-foreground">
                            Sort by:
                        </label>
                        <div className="relative">
                            <select
                                value={sortOption}
                                onChange={handleSortChange}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent text-sm font-medium cursor-pointer transition-all duration-200"
                            >
                                <option value="default">Featured</option>
                                <option value="newest">Newest First</option>
                                <option value="price-low-to-high">
                                    Price: Low to High
                                </option>
                                <option value="price-high-to-low">
                                    Price: High to Low
                                </option>
                                <option value="rating">Highest Rated</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filter */}
                    <SidebarFilter
                        onFilterChange={handleFilterChange}
                        isOpen={isSidebarOpen}
                        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                    />

                    {/* Product Grid/List */}
                    <div className="flex-1">
                        {loading ? (
                            <div
                                className={`grid gap-6 ${
                                    viewMode === "grid"
                                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                                        : "grid-cols-1"
                                }`}
                            >
                                {Array(6)
                                    .fill()
                                    .map((_, index) => (
                                        <ProductSkeleton key={index} />
                                    ))}
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-red-600 text-2xl">
                                        ⚠
                                    </span>
                                </div>
                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    Something went wrong
                                </h3>
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-foreground text-2xl">
                                        📦
                                    </span>
                                </div>
                                <h3 className="text-lg font-medium text-foreground mb-2">
                                    No products found
                                </h3>
                                <p className="text-foreground">
                                    Try adjusting your filters or search
                                    criteria
                                </p>
                            </div>
                        ) : (
                            <div
                                className={`grid gap-6 ${
                                    viewMode === "grid"
                                        ? "grid-cols-1 sm:grid-cols-2"
                                        : "grid-cols-1"
                                }`}
                            >
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product._id}
                                        className={`group bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 rounded-lg overflow-hidden ${
                                            viewMode === "list" ? "flex" : ""
                                        }`}
                                    >
                                        {/* Product Image */}
                                        <div
                                            className={`relative overflow-hidden bg-gray-50 ${
                                                viewMode === "list"
                                                    ? "w-48 flex-shrink-0"
                                                    : "aspect-[4/5]"
                                            }`}
                                        >
                                            <img
                                                src={
                                                    product.images?.[0] ||
                                                    "/placeholder.svg?height=400&width=400"
                                                }
                                                alt={product.name}
                                                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-300"
                                                onError={(e) =>
                                                    (e.target.src =
                                                        "/placeholder.svg?height=400&width=400")
                                                }
                                            />
                                            {product.stock < 10 &&
                                                product.stock > 0 && (
                                                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                                        Only {product.stock}{" "}
                                                        left
                                                    </div>
                                                )}
                                            {product.stock === 0 && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                    <span className="bg-white text-foreground px-3 py-1 rounded-full text-sm font-medium">
                                                        Out of Stock
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 flex-1 space-y-3">
                                            {/* Product Title */}
                                            <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-foreground transition-colors">
                                                {product.name}
                                            </h3>

                                            {/* Product Description */}
                                            <p className="text-sm text-foreground line-clamp-2 leading-relaxed">
                                                {product.description ||
                                                    "High-quality handmade carpet."}
                                            </p>

                                            {/* Rating and Reviews */}
                                            <div className="flex items-center gap-1">
                                                {renderStars(product.rating)}
                                                <span className="text-xs text-foreground">
                                                    (
                                                    {product.reviews?.length ||
                                                        0}
                                                    )
                                                </span>
                                            </div>

                                            {/* Price and Stock */}
                                            <div className="flex justify-between items-center">
                                                <div className="space-y-1">
                                                    <p className="text-xl font-bold text-foreground">
                                                        ₹
                                                        {product.price?.toLocaleString() ||
                                                            "N/A"}
                                                        {product.psft && (
                                                            <span className="text-sm font-medium">
                                                                /sqft
                                                            </span>
                                                        )}
                                                    </p>
                                                    {product.originalPrice &&
                                                        product.originalPrice >
                                                            product.price && (
                                                            <p className="text-sm text-foreground line-through">
                                                                ₹
                                                                {product.originalPrice.toLocaleString()}
                                                            </p>
                                                        )}
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-foreground">
                                                        Stock:{" "}
                                                        {product.stock || 0}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Product Details Grid */}
                                            <div className="grid grid-cols-2 gap-2 text-xs text-foreground bg-gray-50 p-3 rounded-lg">
                                                <div>
                                                    <span className="font-medium">
                                                        Material:
                                                    </span>{" "}
                                                    {product.material || "N/A"}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Weaving:
                                                    </span>{" "}
                                                    {product.weaving || "N/A"}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Texture:
                                                    </span>{" "}
                                                    {product.texture || "N/A"}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Size:
                                                    </span>{" "}
                                                    {product.size || "N/A"}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        Style:
                                                    </span>{" "}
                                                    {product.style || "N/A"}
                                                </div>
                                                <div>
                                                    <span className="font-medium">
                                                        HSN Code:
                                                    </span>{" "}
                                                    {product.hsnCode || "N/A"}
                                                </div>
                                            </div>

                                            {/* View Details Button */}
                                            <Link
                                                to={`/product/${product._id}`}
                                                className="block w-full text-center bg-foreground text-white py-3 px-4 rounded-lg hover:bg-foreground/90 transition-colors duration-200 font-medium"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CategoryPage;
