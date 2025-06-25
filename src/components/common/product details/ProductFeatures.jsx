import { Sparkles, Scissors, Award, Leaf, Zap, Gift } from "lucide-react";

/**
 * ProductFeatures Component
 * Displays generic key features for all carpet products
 */
function ProductFeatures() {
    const features = [
        {
            icon: Sparkles,
            title: "Premium Quality",
            description:
                "Our carpets are crafted from top-grade materials to ensure durability and a luxurious feel.",
        },
        {
            icon: Scissors,
            title: "Skilled Craftsmanship",
            description:
                "Handmade by experienced artisans using traditional weaving techniques for exceptional artistry.",
        },
        {
            icon: Award,
            title: "Timeless Design",
            description:
                "Featuring classic and contemporary patterns that enhance any interior décor.",
        },
        {
            icon: Leaf,
            title: "Eco-Friendly Materials",
            description:
                "Produced with sustainable practices and eco-conscious materials to minimize environmental impact.",
        },
        {
            icon: Zap,
            title: "Versatile Use",
            description:
                "Suitable for living rooms, bedrooms, offices, and outdoor spaces, adapting to diverse settings.",
        },
        {
            icon: Gift,
            title: "Perfect Gift",
            description:
                "Elegantly packaged, making our carpets an ideal gift for housewarmings and special occasions.",
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8 p-6 lg:p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">
                Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <feature.icon className="w-6 h-6 text-foreground" />
                        </div>
                        <div>
                            <h3 className="font-medium text-lg text-foreground mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-foreground">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductFeatures;
