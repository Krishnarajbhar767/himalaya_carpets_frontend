import { Check } from "lucide-react";

/**
 * CareInstructions Component
 * Displays carpet care and maintenance instructions
 */
function CareInstructions() {
    const careCategories = [
        {
            title: "Regular Maintenance",
            instructions: [
                "Vacuum regularly to remove dust and prevent fiber matting.",
                "Rotate the carpet every 3–6 months for even wear.",
            ],
        },
        {
            title: "Spot Cleaning",
            instructions: [
                "Blot spills immediately with a clean, dry cloth. Avoid rubbing.",
                "Use a mild detergent solution (test on a small area first).",
                "Avoid excessive moisture; do not soak the backing.",
            ],
        },
        {
            title: "Deep Cleaning",
            instructions: [
                "Professional cleaning recommended every 12–18 months.",
                "Use dry-clean or low-moisture cleaning methods to protect fibers.",
            ],
        },
        {
            title: "Sunlight & Moisture",
            instructions: [
                "Avoid direct prolonged sunlight to prevent color fading.",
                "Keep away from damp areas; ensure proper room ventilation.",
            ],
        },
    ];

    return (
        <div className="bg-white rounded-lg overflow-hidden mb-8 p-6 lg:p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
                Care Instructions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careCategories.map((category, index) => (
                    <div key={index} className="p-5 bg-foreground/5 rounded-sm">
                        <h3 className="font-semibold text-lg text-foreground mb-3">
                            {category.title}
                        </h3>
                        <ul className="space-y-2 text-foreground">
                            {category.instructions.map((instruction, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2"
                                >
                                    <Check className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <span>{instruction}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CareInstructions;
