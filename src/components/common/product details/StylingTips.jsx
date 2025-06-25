import { Instagram } from "lucide-react";

/**
 * StylingTips Component
 * Provides tips on styling carpets in interior spaces
 */
function StylingTips() {
    const tips = [
        {
            title: "Living Room Layering",
            description:
                "Place a larger neutral rug underneath and layer a patterned carpet on top to add depth and texture.",
        },
        {
            title: "Define Zones",
            description:
                "Use carpets to define seating or dining areas in open-plan spaces, anchoring furniture arrangements.",
        },
        {
            title: "Color Coordination",
            description:
                "Match carpet colors with throw pillows or curtains for a cohesive look; use contrasting hues for a bold statement.",
        },
        {
            title: "Bedroom Comfort",
            description:
                "Position a soft, plush carpet under the bed so your feet land on a warm surface when waking up.",
        },
        {
            title: "Outdoor Extension",
            description:
                "For outdoor carpets, style your patio by pairing with weather-resistant cushions and potted plants.",
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                        Styling Tips
                    </h2>
                    <div className="space-y-4">
                        {tips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-foreground text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">
                                        {tip.title}
                                    </h3>
                                    <p className="text-foreground">
                                        {tip.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="p-6 lg:p-8 flex items-center justify-center bg-gray-50 rounded-sm"
                    // Optionally use a background image or placeholder
                >
                    <div className="text-center text-foreground">
                        <Instagram className="w-10 h-10 mx-auto mb-3" />
                        <h3 className="text-xl font-bold mb-2">
                            Share Your Space
                        </h3>
                        <p className="mb-4">
                            Tag us on Instagram with #HimalayaCarpetsStyle to be
                            featured on our page
                        </p>
                        <button className="text-foreground px-6 py-2 rounded-lg font-medium border border-foreground hover:bg-foreground hover:text-white transition-colors">
                            Follow Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StylingTips;
