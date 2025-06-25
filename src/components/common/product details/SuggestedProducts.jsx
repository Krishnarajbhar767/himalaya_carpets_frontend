import { Link } from "react-router-dom";
import { Package } from "lucide-react";

/**
 * SuggestedProducts Component
 * Displays related/suggested products
 */
function SuggestedProducts({ products = [] }) {
    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8">
            <div className="p-6 lg:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                    You Might Also Like
                </h2>
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((prod) => (
                            <div
                                key={prod._id}
                                className="group overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="aspect-square bg-gray-50 overflow-hidden">
                                    <img
                                        src={
                                            prod.images?.[0] ||
                                            "/placeholder.svg?height=300&width=300"
                                        }
                                        alt={prod.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                                        onError={(e) =>
                                            (e.target.src =
                                                "/placeholder.svg?height=300&width=300")
                                        }
                                    />
                                </div>
                                <div className="p-4 space-y-2">
                                    <h4 className="font-medium text-foreground line-clamp-2">
                                        {prod.name}
                                    </h4>
                                    <p className="text-lg font-bold text-foreground">
                                        ₹{prod.price?.toLocaleString() || "N/A"}
                                    </p>
                                    <Link
                                        to={`/products/${slugify(
                                            prod.category?.name || "",
                                            {
                                                lower: true,
                                                strict: true,
                                            }
                                        )}/${prod.category?._id}/${prod._id}`}
                                        className="block w-full text-center bg-foreground text-white py-2 px-4 rounded-lg hover:bg-foreground/90 transition-colors text-sm font-medium"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Package className="w-12 h-12 text-foreground mx-auto mb-4" />
                        <p className="text-foreground">
                            No related products available
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SuggestedProducts;
