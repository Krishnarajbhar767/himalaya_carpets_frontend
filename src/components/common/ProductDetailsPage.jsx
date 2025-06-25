import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Package } from "lucide-react";

// Import modular components (ensure these are updated if they previously referenced saree fields)
import ProductImageGallery from "./product details/ProductImageGallery";
import ProductInfo from "./product details/ProductInfo";
import ProductFeatures from "./product details/ProductFeatures";
import CareInstructions from "./product details/CareInstructions";
import StylingTips from "./product details/StylingTips";
import ProductTabs from "./product details/ProductTabs";
import DeliveryTimeline from "./product details/DeliveryTimeline";
import SuggestedProducts from "./product details/SuggestedProducts";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, setCart } from "../../redux/slices/cartSlice";
import axiosInstance from "../../utils/apiConnector";
import toast from "react-hot-toast";
import { setWishList } from "../../redux/slices/wishListSlice";
import slugify from "slugify";

/**
 * Enhanced ProductDetailsPage Component
 * Orchestrates all product detail sections for carpets
 */
function ProductDetailsPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomedImage, setZoomedImage] = useState("");
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const wishlistItems = useSelector((state) => state.wishlist);

    // Mock reviews data (you may fetch real ones from backend)
    const mockReviews = [
        {
            user: "Priya Sharma",
            rating: 5,
            comment:
                "Excellent quality and beautiful design. Highly recommended!",
            date: "2024-01-15",
            verified: true,
        },
        {
            user: "Rahul Patel",
            rating: 4,
            comment: "Good product, fast delivery. Value for money.",
            date: "2024-01-10",
            verified: true,
        },
        {
            user: "Meera Singh",
            rating: 5,
            comment: "Soft texture and craftsmanship is outstanding.",
            date: "2024-01-05",
            verified: false,
        },
    ];

    // Fetch product data and related products
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                // Fetch main product
                const productResponse = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/products/${id}`
                );
                if (!productResponse.ok)
                    throw new Error("Failed to fetch product");
                const productData = await productResponse.json();
                const prod = productData?.data;
                setProduct(prod);

                // Fetch related products if category exists
                if (prod?.category) {
                    const relatedResponse = await fetch(
                        `${import.meta.env.VITE_BACKEND_URL}/categories/${
                            prod.category?._id
                        }`
                    );
                    if (!relatedResponse.ok)
                        throw new Error("Failed to fetch related products");
                    const relatedData = await relatedResponse.json();
                    const related = (relatedData?.data?.products || [])
                        .filter((p) => p._id !== prod._id)
                        .slice(0, 4);
                    setRelatedProducts(related);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Event handlers (Add to cart, share, zoom)
    const handleAddToCart = async (data) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const isExist = existingCart.some((item) => item._id === data._id);
        if (!isExist) {
            const updatedCart = [...existingCart, { ...data }];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            // If user logged in, sync with backend
            if (user) {
                try {
                    await axiosInstance.post("/user/cart/add", {
                        product: data?._id,
                        quantity: data?.quantity,
                        finalPrice: data?.finalPrice,
                        withCustomization: data.withCustomization,
                        totalPrice: data.finalPrice * data?.quantity,
                        userId: user?._id,
                    });
                } catch (error) {
                    toast.error("Something went wrong");
                    console.error(error);
                    return;
                }
            }
            dispatch(setCart(updatedCart));
        }
    };

    const handleBuyNow = (data) => {
        console.log("Buy now:", data);
        // Implement similar to original but using carpet fields if needed
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product?.name,
                text: product?.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            console.log("Link copied to clipboard");
        }
    };

    const handleZoom = (image) => {
        setZoomedImage(image);
        setIsZoomed(true);
    };

    // Loading skeleton
    const ProductDetailsSkeleton = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex gap-4">
                <div className="hidden md:block w-20 space-y-2">
                    {Array(4)
                        .fill()
                        .map((_, index) => (
                            <div
                                key={index}
                                className="w-20 h-20 bg-gray-200 rounded-md animate-pulse"
                            />
                        ))}
                </div>
                <div className="flex-1">
                    <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                </div>
            </div>
            <div className="space-y-6">
                {Array(6)
                    .fill()
                    .map((_, index) => (
                        <div
                            key={index}
                            className="h-12 bg-gray-200 rounded animate-pulse"
                        />
                    ))}
            </div>
        </div>
    );

    // Error state
    if (error) {
        return (
            <main className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-red-600 text-2xl">⚠</span>
                        </div>
                        <h3 className="text-lg font-medium text-text-foreground mb-2">
                            Something went wrong
                        </h3>
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </main>
        );
    }

    // Loading state
    if (loading) {
        return (
            <main className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <ProductDetailsSkeleton />
                </div>
            </main>
        );
    }

    // Product not found
    if (!product) {
        return (
            <main className="min-h-screen bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-8 h-8 text-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Product not found
                        </h3>
                        <p className="text-foreground">
                            The product you're looking for doesn't exist
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb Navigation */}
                <div className="mb-6">
                    <nav className="flex items-center space-x-2 text-[11px] md:text-sm text-foreground text-nowrap">
                        <Link
                            to="/"
                            className="hover:text-gray-900 text-foreground"
                        >
                            Home
                        </Link>
                        <span>/</span>
                        <Link
                            to={`/products/${slugify(product.category?.name, {
                                lower: true,
                                strict: true,
                            })}/${product.category?._id}`}
                            className="hover:text-gray-900 text-foreground capitalize"
                        >
                            {product.category?.name || "Category"}
                        </Link>
                        <span>/</span>
                        <span className="text-foreground font-medium">
                            {product.name}
                        </span>
                    </nav>
                </div>

                {/* Main Product Section */}
                <div className="bg-white rounded-lg overflow-hidden mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-8">
                        {/* Product Image Gallery */}
                        <ProductImageGallery
                            images={product.images || []}
                            productName={product.name}
                            onZoom={handleZoom}
                        />

                        {/* Product Information */}
                        <ProductInfo
                            product={product}
                            onAddToCart={handleAddToCart}
                            onShare={handleShare}
                            onBuyNow={handleBuyNow}
                        />
                    </div>
                </div>

                {/* Product Information Tabs */}
                <ProductTabs product={product} reviews={mockReviews} />
                {/* Suggested Products Section */}
                <SuggestedProducts products={relatedProducts} />
                {/* Product Features Section */}
                <ProductFeatures product={product} />

                {/* Care Instructions Section */}
                <CareInstructions />

                {/* Styling Tips Section */}
                <StylingTips />

                {/* Delivery Timeline Section */}
                <DeliveryTimeline />

                {/* Zoom Modal */}
                {isZoomed && (
                    <div className="fixed inset-0 bg-foreground bg-opacity-75 flex items-center justify-center z-50 p-4">
                        <div className="relative max-w-4xl max-h-full">
                            <img
                                src={zoomedImage || "/placeholder.svg"}
                                alt={product?.name}
                                className="max-w-full max-h-full object-contain"
                            />
                            <button
                                onClick={() => setIsZoomed(false)}
                                className="absolute top-4 right-4 bg-white text-foreground p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default ProductDetailsPage;
