import { Clock, Package, Truck, Check } from "lucide-react";

/**
 * DeliveryTimeline Component
 * Shows delivery steps and timeline for carpet orders
 */
function DeliveryTimeline() {
    const primaryColor = "rgb(83, 62, 45)"; // or your brand color
    const steps = [
        {
            icon: Clock,
            title: "Order Confirmation",
            description: "Within 24 hours of placing your order",
        },
        {
            icon: Package,
            title: "Processing & Packaging",
            description: "2-3 business days to prepare and inspect",
        },
        {
            icon: Truck,
            title: "Shipping",
            description:
                "5-7 business days (standard) or faster options if available",
        },
        {
            icon: Check,
            title: "Delivery",
            description: "Signature required upon delivery",
        },
    ];

    return (
        <div className="bg-white p-6 lg:p-10 rounded-lg max-w-5xl mx-auto mb-8">
            <h2
                className="text-2xl font-bold mb-10 text-center"
                style={{ color: primaryColor }}
            >
                Delivery Timeline
            </h2>

            <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-10">
                {steps.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center max-w-xs"
                        >
                            {/* Icon circle */}
                            <div
                                className="rounded-full border-4 flex items-center justify-center mb-4"
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderColor: primaryColor,
                                }}
                            >
                                <Icon
                                    className="w-8 h-8"
                                    style={{ color: primaryColor }}
                                />
                            </div>

                            {/* Title */}
                            <h3
                                className="font-semibold text-lg"
                                style={{ color: primaryColor }}
                            >
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p
                                className="text-sm mt-2"
                                style={{ color: primaryColor }}
                            >
                                {step.description}
                            </p>

                            {/* Progress dot except after last step */}
                            {idx < steps.length - 1 && (
                                <div
                                    className="mt-6 rounded-full block"
                                    style={{
                                        width: 16,
                                        height: 16,
                                        backgroundColor: primaryColor,
                                    }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default DeliveryTimeline;
