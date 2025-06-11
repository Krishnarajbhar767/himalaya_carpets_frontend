import { useEffect, useState } from "react";
import {
    ShoppingCart,
    CreditCard,
    Heart,
    Share2,
    Star,
    Check,
    Info,
    Truck,
    Shield,
    RotateCcw,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/apiConnector";
import { setWishList } from "../../../redux/slices/wishListSlice";
import slugify from "slugify";

/**
 * ProductInfo Component
 * Displays product information, pricing, customization options, and action buttons
 */
function ProductInfo({
    product,
    onAddToCart,

    onShare,
}) {
    const { cartItems } = useSelector((state) => state?.cart);
    const { user } = useSelector((state) => state?.user || null);
    const wishlistItems = useSelector((state) => state?.wishlist);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [withCustomization, setWithCustomization] = useState(false);
    const [isAlreadyInCart, setIsAlreadyInCart] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const customizationPrice = 500;
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
    const handleAddToCart = async () => {
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

    const handleBuyNow = async () => {
        const {
            data: { key },
        } = await axiosInstance.get("/payment/get-razorpay-key");

        const {
            data: { order },
        } = await axiosInstance.post("/payment/checkout", {
            amount: finalPrice,
        });

        var options = {
            key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Srijan Fabrics",
            description: "Test Transaction",
            image: "https://www.tshirtfactory.co.in/_next/static/media/logo%20t%20sirt.05e4aa5e.png",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: `${
                import.meta.env.VITE_BACKEND_URL
            }/payment/verify-payment`,
            prefill: {
                name: "KRISHNA",
                email: "krishnarajbhar767@gmail.com",
                contact: "9000090000",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#3399cc",
            },
        };
        const razorpay = new window.Razorpay(options);
        // Listen for payment failure event and redirect
        razorpay.on("payment.failed", function (response) {
            const reason = response?.error?.reason || "payment_failed"; // short & clean
            const slug = slugify(reason, {
                lower: true,
                strict: true,
            });
            window.location.href = `/paymentFailed?reason=${slug}`;
        });
        razorpay.open();
        // document.getElementById("rzp-button1").onclick = function (e) {
        //     rzp1.open();
        //     e.preventDefault();
        // };
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
            if (!res.data) {
                return;
            }

            dispatch(setWishList(res.data));
            setIsWishlisted(true);
        } else {
            const res = await axiosInstance.post("user/wishlist/remove", {
                userId: user?._id,
                productId: product._id,
            });
            if (!res.data) {
                return;
            }

            dispatch(setWishList(res.data));
            setIsWishlisted(false);
        }
    };

    useEffect(() => {
        if (!cartItems?.length) {
            setIsAlreadyInCart(false);
            return;
        }
        cartItems.map((item) => {
            console.log(item);
            if (item._id == product._id) {
                setIsAlreadyInCart(true);
            }
        });
    }, [localStorage, dispatch, product, cartItems]);
    useEffect(() => {
        const isWished =
            wishlistItems?.some((item) => item?._id === product?._id) ?? false;

        setIsWishlisted(isWished);
    }, [wishlistItems, product, cartItems]);
    return (
        <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-4 border-b border-gray-100 pb-4">
                <div className="flex items-start justify-between">
                    <div className="space-y-2 text-foreground">
                        <h1 className="text-2xl lg:text-3xl font-medium text-foreground leading-tight">
                            {product?.name}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-foreground">
                                {renderStars(product?.rating)}
                            </div>
                            <span className="text-sm text-foreground">
                                {product?.rating || 0} (
                                {product?.reviews?.length || 0} reviews)
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleWishlistToggle}
                            className={`p-2 rounded-full transition-colors text-foreground ${
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

                {/* Price Section */}
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-medium text-foreground">
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
                    {withCustomization && (
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

                <p className="text-foreground/80 leading-relaxed capitalize">
                    <span className="text-lg font-medium text-foreground italic">
                        Overview:
                    </span>{" "}
                    {product?.description}
                </p>
                <p className="text-foreground/80 leading-relaxed capitalize">
                    <span className="text-lg font-medium text-foreground italic">
                        Color:
                    </span>{" "}
                    {product?.color}
                </p>
                <p className="text-foreground/80 leading-relaxed capitalize">
                    <span className="text-lg font-medium text-foreground italic">
                        Technique :
                    </span>{" "}
                    {product?.technique}
                </p>
                <p className="text-foreground/80 leading-relaxed capitalize">
                    <span className="text-lg font-medium text-foreground italic">
                        Fabric :
                    </span>{" "}
                    {product?.fabric}
                </p>
                {product?.note && (
                    <p className="text-foreground/80 leading-relaxed capitalize">
                        <span className="text-lg font-medium text-foreground italic">
                            Note :
                        </span>{" "}
                        {product?.note}
                    </p>
                )}
                {product?.assurance && (
                    <p className="text-foreground/80 leading-relaxed capitalize">
                        <span className="text-lg font-medium text-foreground italic">
                            Assurance :
                        </span>{" "}
                        {product?.assurance}
                    </p>
                )}
            </div>

            {/* Customization Options */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-normal text-foreground">
                            Fall, pico and tassels
                        </span>
                        <button
                            className="text-gray-500 hover:text-gray-700"
                            title="Add decorative fall, pico and tassels"
                        >
                            <Info className="w-4 h-4" />
                        </button>
                    </div>
                    <span className="text-sm font-medium text-green-700">
                        +₹{customizationPrice}
                    </span>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setWithCustomization(true)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                            withCustomization
                                ? "bg-foreground text-white"
                                : "bg-white text-foreground/90 border border-gray-300 hover:border-foreground/60"
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {withCustomization && <Check className="w-4 h-4" />}
                            Yes
                        </div>
                    </button>
                    <button
                        onClick={() => setWithCustomization(false)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                            !withCustomization
                                ? "bg-foreground text-white"
                                : "bg-white text-foreground/90 border border-gray-300 hover:border-foreground/60"
                        }`}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {!withCustomization && (
                                <Check className="w-4 h-4" />
                            )}
                            No
                        </div>
                    </button>
                </div>

                {withCustomization && (
                    <div className="text-sm text-foreground/80 bg-green-50 p-3 rounded-lg">
                        <p>
                            Custom fall, pico and tassels will be added to your
                            product. This adds elegance and a premium finish.
                        </p>
                    </div>
                )}
            </div>

            {/* Size Selection */}
            {/* <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">
                    Size
                </label>
                <div className="flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                selectedSize === size
                                    ? "bg-gray-900 text-white"
                                    : "bg-white text-gray-900 border border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div> */}

            {/* Quantity Selection */}
            <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">
                    Quantity
                </label>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 border border-foreground rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        -
                    </button>
                    <span className="w-12 text-center font-medium">
                        {quantity}
                    </span>
                    <button
                        onClick={() =>
                            setQuantity(
                                Math.min(product?.stock || 10, quantity + 1)
                            )
                        }
                        className="w-10 h-10 border border-foreground rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
                <button
                    onClick={() => handleBuyNow(product?.finaPrice)}
                    disabled={!product?.stock}
                    className="w-full bg-foreground text-white py-3 px-6 rounded-lg font-medium hover:bg-foreground/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    <CreditCard className="w-5 h-5" />
                    Buy Now
                </button>
                <button
                    disabled={!product?.stock}
                    onClick={handleAddToCart}
                    className="w-full bg-white text-foreground py-3 px-6 rounded-lg font-medium border border-foreground/30 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 "
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
