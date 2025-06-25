import { useState } from "react";
import { Package, Star, Truck, RotateCcw, Shield } from "lucide-react";

/**
 * ProductTabs Component
 * Displays product information in tabbed interface (specifications, reviews, shipping)
 * Updated for carpets
 */
function ProductTabs({ product, reviews = [] }) {
    const [activeTab, setActiveTab] = useState("specifications");

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

    const tabs = [
        {
            id: "specifications",
            label: "Specifications",
            icon: Package,
        },
        {
            id: "reviews",
            label: `Reviews (${product?.reviews?.length || 0})`,
            icon: Star,
        },
        {
            id: "shipping",
            label: "Shipping & Returns",
            icon: Truck,
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8">
            {/* Tab Navigation */}
            <div className="border-b border-foreground/20">
                <nav className="flex space-x-8 px-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={` py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                                activeTab === tab.id
                                    ? "border-foreground text-foreground"
                                    : "border-transparent text-foreground hover:text-foreground hover:border-foreground/400"
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {/* Specifications Tab */}
                {activeTab === "specifications" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-foreground">
                            Product Specifications
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {[
                                    {
                                        label: "Category",
                                        value: product?.category?.name || "N/A",
                                    },
                                    {
                                        label: "Material",
                                        value: product?.material || "N/A",
                                    },
                                    {
                                        label: "Weaving",
                                        value: product?.weaving || "N/A",
                                    },
                                    {
                                        label: "Texture",
                                        value: product?.texture || "N/A",
                                    },
                                    {
                                        label: "Pile Thickness",
                                        value: product?.pileThickness || "N/A",
                                    },
                                ].map((spec, index) => (
                                    <div
                                        key={index}
                                        className="capitalize flex justify-between py-2 border-b border-gray-100"
                                    >
                                        <span className="font-medium text-foreground">
                                            {spec.label}
                                        </span>
                                        <span className="text-foreground">
                                            {spec.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4">
                                {[
                                    {
                                        label: "Size",
                                        value: product?.size || "N/A",
                                    },
                                    {
                                        label: "Color",
                                        value: product?.color || "N/A",
                                    },
                                    {
                                        label: "Weight",
                                        value: product?.weight || "N/A",
                                    },
                                    {
                                        label: "Assurance",
                                        value: product?.assurance || "N/A",
                                    },
                                    {
                                        label: "HSN Code",
                                        value: product?.hsnCode || "N/A",
                                    },
                                    {
                                        label: "Stock",
                                        value:
                                            product?.stock != null
                                                ? product.stock
                                                : "N/A",
                                    },
                                ].map((spec, index) => (
                                    <div
                                        key={index}
                                        className="capitalize flex justify-between py-2 border-b border-gray-100"
                                    >
                                        <span className="font-medium text-foreground ">
                                            {spec.label}
                                        </span>
                                        <span className="text-foreground">
                                            {spec.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-foreground">
                                Customer Reviews
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {renderStars(product?.rating || 0)}
                                </div>
                                <span className="capitalize text-sm text-foreground">
                                    {product?.rating || 0} out of 5 (
                                    {product?.reviews?.length || 0} reviews)
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {(product?.reviews || []).map((review, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-100 pb-6 last:border-b-0"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            {/* Could render user avatar if available */}
                                            <Star className="w-5 h-5 text-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="capitalize flex items-center gap-2 mb-1">
                                                <span className="font-medium text-foreground">
                                                    {/* Assuming review.user has name fields */}
                                                    {review?.user?.firstName ||
                                                        review?.user ||
                                                        "User"}
                                                    {review?.user?.lastName
                                                        ? ` ${review.user.lastName}`
                                                        : ""}
                                                </span>
                                                {review?.verified && (
                                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                                        Verified Purchase
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex">
                                                    {renderStars(review.rating)}
                                                </div>
                                                {review?.createdAt && (
                                                    <span className="text-sm text-foreground flex items-center gap-1">
                                                        {/* Optionally import Calendar icon */}
                                                        {/* <Calendar className="w-3 h-3" /> */}
                                                        {new Date(
                                                            review.createdAt
                                                        ).toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-foreground leading-relaxed">
                                                {review.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Shipping Tab */}
                {activeTab === "shipping" && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-foreground">
                            Shipping & Returns
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h4 className="font-medium text-foreground">
                                    Shipping Information
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Truck className="w-5 h-5 text-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">
                                                Free Standard Shipping
                                            </p>
                                            <p className="text-sm text-foreground">
                                                On orders over ₹5,000
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Truck className="w-5 h-5 text-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">
                                                Express Delivery
                                            </p>
                                            <p className="text-sm text-foreground">
                                                3-5 business days
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-medium text-foreground">
                                    Returns & Exchanges
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <RotateCcw className="w-5 h-5 text-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">
                                                7-Day Returns
                                            </p>
                                            <p className="text-sm text-foreground">
                                                Free returns on all orders
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Shield className="w-5 h-5 text-foreground mt-0.5" />
                                        <div>
                                            <p className="font-medium">
                                                Quality Guarantee
                                            </p>
                                            <p className="text-sm text-foreground">
                                                100% authentic carpets
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductTabs;
