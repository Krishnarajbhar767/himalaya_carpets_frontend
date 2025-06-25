import { useState, useEffect } from "react";
import {
    ShoppingCart,
    CreditCard,
    Heart,
    Share2,
    Star,
    Truck,
    Shield,
    RotateCcw,
    Minus,
    Plus,
    Info,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/apiConnector";
import { setWishList } from "../../../redux/slices/wishListSlice";
import slugify from "slugify";
import BookVideoCallModal from "../BookVideoCall";

/**
 * ProductInfo Component for carpets
 * Displays product information, pricing, customization options, and action buttons
 */
function ProductInfo({ product, onAddToCart, onBuyNow, onShare }) {
    const { cartItems } = useSelector((state) => state?.cart);
    const { user } = useSelector((state) => state?.user || {});
    const wishlistItems = useSelector((state) => state?.wishlist);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
    const [withCustomization, setWithCustomization] = useState(false);
    const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // If you offer customization for carpets, adjust price here
    const customizationPrice = 0; // or some logic
    const basePrice = product?.price || 0;
    const finalPrice = withCustomization
        ? basePrice + customizationPrice
        : basePrice;

    // Render star rating
    const renderStars = (rating) => {
        return Array(5)
            .fill()
            .map((_, index) => (
                <Star
                    key={index}
                    className={`w-4 h-4 ${
                        index < Math.floor(rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-foreground"
                    }`}
                />
            ));
    };

    // Handle add to cart
    const handleAdd = async () => {
        if (isAlreadyInCart) {
            navigate("/cart");
            return;
        }
        await onAddToCart?.({
            ...product,
            quantity,
            withCustomization,
            finalPrice,
        });
        setIsAlreadyInCart(true);
    };

    // Handle buy now
    const handleBuy = async () => {
        if (onBuyNow) {
            onBuyNow({
                ...product,
                quantity,
                withCustomization,
                finalPrice,
            });
        }
    };

    // Handle wishlist toggle
    const handleWishlistToggle = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        if (!isWishlisted) {
            const res = await axiosInstance.post("user/wishlist/add", {
                userId: user?._id,
                productId: product._id,
            });
            if (res?.data) {
                dispatch(setWishList(res.data));
                setIsWishlisted(true);
            }
        } else {
            const res = await axiosInstance.post("user/wishlist/remove", {
                userId: user?._id,
                productId: product._id,
            });
            if (res?.data) {
                dispatch(setWishList(res.data));
                setIsWishlisted(false);
            }
        }
    };

    useEffect(() => {
        if (!cartItems?.length) {
            setIsAlreadyInCart(false);
            return;
        }
        const exist = cartItems.some((item) => item._id === product._id);
        setIsAlreadyInCart(exist);
    }, [cartItems, product]);

    useEffect(() => {
        const isWished =
            wishlistItems?.some((item) => item?._id === product?._id) ?? false;
        setIsWishlisted(isWished);
    }, [wishlistItems, product]);

    return (
        <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-4 border-b border-gray-100 pb-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2 text-foreground">
                        <h1 className="text-2xl lg:text-3xl font-medium leading-tight">
                            {product?.name}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {renderStars(product?.rating)}
                            </div>
                            <span className="text-sm">
                                {product?.rating || 0} (
                                {product?.reviews?.length || 0} reviews)
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleWishlistToggle}
                            className={`p-2 rounded-full transition-colors ${
                                isWishlisted
                                    ? "bg-red-50 text-red-600"
                                    : "bg-gray-50 text-foreground hover:text-red-600"
                            }`}
                        >
                            <Heart
                                className={`w-5 h-5 ${
                                    isWishlisted ? "fill-current" : ""
                                }`}
                            />
                        </button>
                        <button
                            onClick={onShare}
                            className="p-2 rounded-full bg-gray-50 text-foreground hover:text-gray-900 transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div>
                    <span
                        onClick={() => setIsBookCallModalOpen(true)}
                        className="px-6 py-2 border bg-gray-50 cursor-pointer hover:bg-gray-100"
                    >
                        Book A Video Call
                    </span>
                    {isBookCallModalOpen && (
                        <BookVideoCallModal
                            isOpen={isBookCallModalOpen}
                            onClose={() => setIsBookCallModalOpen(false)}
                        />
                    )}
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-medium">
                        ₹{finalPrice.toLocaleString()}
                    </span>
                    {product?.originalPrice &&
                        product.originalPrice > basePrice && (
                            <>
                                <span className="text-lg text-gray-500 line-through">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                                <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full font-medium">
                                    {Math.round(
                                        ((product.originalPrice - basePrice) /
                                            product.originalPrice) *
                                            100
                                    )}
                                    % OFF
                                </span>
                            </>
                        )}
                    {/* Optionally display price per sqft */}
                    {product?.psft && (
                        <span className="text-sm text-gray-600 italic">
                            ({product.psft} per sqft)
                        </span>
                    )}
                    {withCustomization && customizationPrice > 0 && (
                        <span className="text-sm text-green-700 font-medium">
                            (Includes ₹{customizationPrice} for customization)
                        </span>
                    )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                    {product?.stock > 0 ? (
                        <>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-700 font-medium">
                                In Stock ({product.stock} available)
                            </span>
                        </>
                    ) : (
                        <>
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-sm text-red-700 font-medium">
                                Out of Stock
                            </span>
                        </>
                    )}
                </div>

                {/* Overview & Key Attributes */}
                <p className="text-foreground/80 leading-relaxed">
                    <span className="text-lg font-medium italic">
                        Overview:
                    </span>{" "}
                    {product?.description}
                </p>
                {/* Display key carpet attributes */}
                {product?.material && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            Material:
                        </span>{" "}
                        {product.material}
                    </p>
                )}
                {product?.weaving && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            Weaving:
                        </span>{" "}
                        {product.weaving}
                    </p>
                )}
                {product?.texture && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            Texture:
                        </span>{" "}
                        {product.texture}
                    </p>
                )}
                {product?.pileThickness && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            Pile Thickness:
                        </span>{" "}
                        {product.pileThickness}
                    </p>
                )}
                {product?.size && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            Size:
                        </span>{" "}
                        {product.size}
                    </p>
                )}
                {product?.color && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            Color:
                        </span>{" "}
                        {product.color}
                    </p>
                )}
                {product?.weight && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            Weight:
                        </span>{" "}
                        {product.weight}
                    </p>
                )}
                {product?.style && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            Style:
                        </span>{" "}
                        {product.style}
                    </p>
                )}
                {product?.assurance && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            Assurance:
                        </span>{" "}
                        {product.assurance}
                    </p>
                )}
                {product?.hsnCode && (
                    <p className="text-foreground/80 leading-relaxed">
                        <span className="text-lg font-medium italic">
                            HSN Code:
                        </span>{" "}
                        {product.hsnCode}
                    </p>
                )}
            </div>

            {/* Customization Options (if applicable) */}
            {/* ...similar to prior code, adjust labels if needed... */}

            {/* Quantity Selection */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                    Quantity
                </label>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="w-10 h-10 border border-foreground rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <Minus />
                    </button>
                    <span className="w-12 text-center font-medium">
                        {quantity}
                    </span>
                    <button
                        onClick={() =>
                            setQuantity((q) =>
                                Math.min(product?.stock || 10, q + 1)
                            )
                        }
                        className="w-10 h-10 border border-foreground rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        <Plus />
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={handleBuy}
                    disabled={!product?.stock}
                    className="w-full bg-foreground text-white py-3 px-6 rounded-lg font-medium hover:bg-foreground/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <CreditCard className="w-5 h-5" />
                    Buy Now
                </button>
                <button
                    disabled={!product?.stock}
                    onClick={handleAdd}
                    className="w-full bg-white text-foreground py-3 px-6 rounded-lg font-medium border border-foreground/30 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <ShoppingCart className="w-5 h-5" />
                    {isAlreadyInCart ? "Go To Cart" : "Add To Cart"}
                </button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                    <Truck className="w-6 h-6 text-foreground mx-auto mb-1" />
                    <p className="text-xs text-foreground/80">Free Shipping</p>
                </div>
                <div className="text-center">
                    <Shield className="w-6 h-6 text-foreground mx-auto mb-1" />
                    <p className="text-xs text-foreground/80">Authenticated</p>
                </div>
                <div className="text-center">
                    <RotateCcw className="w-6 h-6 text-foreground mx-auto mb-1" />
                    <p className="text-xs text-foreground/80">
                        7 Days Easy Returns
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ProductInfo;
