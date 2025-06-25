import { useState } from "react";
import { ChevronDown, ChevronUp, X, Filter, RotateCcw } from "lucide-react";

// Enhanced SidebarFilter Component for Carpet schema filters
function SidebarFilter({ onFilterChange, isOpen, toggleSidebar }) {
    // Default price range; adjust max as needed
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [material, setMaterial] = useState("");
    const [weaving, setWeaving] = useState("");
    const [texture, setTexture] = useState("");
    const [size, setSize] = useState("");
    const [style, setStyle] = useState("");
    const [color, setColor] = useState("");

    const [openSections, setOpenSections] = useState({
        price: true,
        material: true,
        weaving: true,
        texture: true,
        size: true,
        style: true,
        color: true,
    });

    // Calculate active filter count
    const activeFilters = [
        priceRange[0] !== 0 || priceRange[1] !== 200000,
        material !== "",
        weaving !== "",
        texture !== "",
        size !== "",
        style !== "",
        color !== "",
    ].filter(Boolean).length;

    // Toggle accordion section
    const toggleSection = (section) => {
        setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    // Handle applying filters
    const handleApplyFilters = () => {
        onFilterChange({
            priceRange,
            material,
            weaving,
            texture,
            size,
            style,
            color,
        });
        if (isOpen && toggleSidebar) toggleSidebar();
    };

    // Handle clearing filters
    const handleClearFilters = () => {
        setPriceRange([0, 200000]);
        setMaterial("");
        setWeaving("");
        setTexture("");
        setSize("");
        setStyle("");
        setColor("");
        onFilterChange({
            priceRange: [0, 200000],
            material: "",
            weaving: "",
            texture: "",
            size: "",
            style: "",
            color: "",
        });
    };

    const FilterSection = ({ title, isOpen, onToggle, children }) => (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
                <span className="font-medium text-foreground">{title}</span>
                {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-foreground" />
                ) : (
                    <ChevronDown className="w-4 h-4 text-foreground" />
                )}
            </button>
            {isOpen && <div className="p-4 bg-white">{children}</div>}
        </div>
    );

    // Sample options for carpets; adjust as needed or fetch dynamically
    const materialOptions = [
        "All Materials",
        "100% Jute",
        "Wool",
        "Synthetic",
        "Cotton",
    ];
    const weavingOptions = [
        "All Weaving",
        "Hand Knotted",
        "Hand Tufted",
        "Handloom",
        "Flatweave",
        "Dhurrie",
    ];
    const textureOptions = ["All Textures", "Soft", "Medium", "Rough"];
    const sizeOptions = [
        "All Sizes",
        "3x5 ft",
        "4x6 ft",
        "5x8 ft",
        "6x9 ft",
        "8x10 ft",
    ];
    const styleOptions = [
        "All Styles",
        "Modern",
        "Persian",
        "Traditional",
        "Contemporary",
    ];
    const colorOptions = [
        "All Colors",
        "Beige",
        "Gray",
        "Black",
        "White",
        "Red",
        "Blue",
        "Green",
        "Yellow",
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-foreground bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-80 bg-white z-50 transform transition-transform duration-300 shadow-xl lg:relative lg:translate-x-0 lg:w-72 lg:shadow-none lg:border-r lg:border-gray-200 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-foreground" />
                        <h3 className="text-lg font-semibold text-foreground">
                            Filters
                            {activeFilters > 0 && (
                                <span className="ml-2 bg-foreground text-white text-xs px-2 py-1 rounded-full">
                                    {activeFilters}
                                </span>
                            )}
                        </h3>
                    </div>
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden p-1 hover:bg-gray-200 rounded-md transition-colors"
                    >
                        <X className="w-5 h-5 text-foreground" />
                    </button>
                </div>

                {/* Filter Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Price Range Filter */}
                    <FilterSection
                        title="Price Range"
                        isOpen={openSections.price}
                        onToggle={() => toggleSection("price")}
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-foreground mb-1">
                                        Min Price
                                    </label>
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) =>
                                            setPriceRange([
                                                Number(e.target.value),
                                                priceRange[1],
                                            ])
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent text-sm transition-all duration-200"
                                        placeholder="₹0"
                                    />
                                </div>
                                <div className="text-foreground mt-6">-</div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium text-foreground mb-1">
                                        Max Price
                                    </label>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) =>
                                            setPriceRange([
                                                priceRange[0],
                                                Number(e.target.value),
                                            ])
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent text-sm transition-all duration-200"
                                        placeholder="₹200,000"
                                    />
                                </div>
                            </div>

                            {/* Price Range Slider */}
                            <div className="space-y-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="200000"
                                    step="100"
                                    value={priceRange[0]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            Number(e.target.value),
                                            priceRange[1],
                                        ])
                                    }
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="200000"
                                    step="100"
                                    value={priceRange[1]}
                                    onChange={(e) =>
                                        setPriceRange([
                                            priceRange[0],
                                            Number(e.target.value),
                                        ])
                                    }
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                />
                            </div>

                            <div className="flex justify-between text-sm text-foreground">
                                <span>₹{priceRange[0].toLocaleString()}</span>
                                <span>₹{priceRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                    </FilterSection>

                    {/* Material Filter */}
                    <FilterSection
                        title="Material"
                        isOpen={openSections.material}
                        onToggle={() => toggleSection("material")}
                    >
                        <div className="space-y-2">
                            {materialOptions.map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="material"
                                        value={
                                            opt === "All Materials" ? "" : opt
                                        }
                                        checked={
                                            material ===
                                            (opt === "All Materials" ? "" : opt)
                                        }
                                        onChange={(e) =>
                                            setMaterial(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-foreground">
                                        {opt}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Weaving Filter */}
                    <FilterSection
                        title="Weaving"
                        isOpen={openSections.weaving}
                        onToggle={() => toggleSection("weaving")}
                    >
                        <div className="space-y-2">
                            {weavingOptions.map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="weaving"
                                        value={opt === "All Weaving" ? "" : opt}
                                        checked={
                                            weaving ===
                                            (opt === "All Weaving" ? "" : opt)
                                        }
                                        onChange={(e) =>
                                            setWeaving(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-foreground">
                                        {opt}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Texture Filter */}
                    <FilterSection
                        title="Texture"
                        isOpen={openSections.texture}
                        onToggle={() => toggleSection("texture")}
                    >
                        <div className="space-y-2">
                            {textureOptions.map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="texture"
                                        value={
                                            opt === "All Textures" ? "" : opt
                                        }
                                        checked={
                                            texture ===
                                            (opt === "All Textures" ? "" : opt)
                                        }
                                        onChange={(e) =>
                                            setTexture(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-foreground">
                                        {opt}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Size Filter */}
                    <FilterSection
                        title="Size"
                        isOpen={openSections.size}
                        onToggle={() => toggleSection("size")}
                    >
                        <div className="space-y-2">
                            {sizeOptions.map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="size"
                                        value={opt === "All Sizes" ? "" : opt}
                                        checked={
                                            size ===
                                            (opt === "All Sizes" ? "" : opt)
                                        }
                                        onChange={(e) =>
                                            setSize(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-foreground">
                                        {opt}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Style Filter */}
                    <FilterSection
                        title="Style"
                        isOpen={openSections.style}
                        onToggle={() => toggleSection("style")}
                    >
                        <div className="space-y-2">
                            {styleOptions.map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="style"
                                        value={opt === "All Styles" ? "" : opt}
                                        checked={
                                            style ===
                                            (opt === "All Styles" ? "" : opt)
                                        }
                                        onChange={(e) =>
                                            setStyle(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <span className="text-sm text-foreground">
                                        {opt}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </FilterSection>

                    {/* Color Filter */}
                    <FilterSection
                        title="Color"
                        isOpen={openSections.color}
                        onToggle={() => toggleSection("color")}
                    >
                        <div className="space-y-2">
                            {colorOptions.map((opt) => (
                                <label
                                    key={opt}
                                    className="flex items-center space-x-3 cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name="color"
                                        value={opt === "All Colors" ? "" : opt}
                                        checked={
                                            color ===
                                            (opt === "All Colors" ? "" : opt)
                                        }
                                        onChange={(e) =>
                                            setColor(e.target.value)
                                        }
                                        className="w-4 h-4 text-foreground border-gray-300 focus:ring-foreground"
                                    />
                                    <div className="flex items-center gap-2">
                                        {opt !== "All Colors" && (
                                            <div
                                                className="w-4 h-4 rounded-full border border-gray-300"
                                                style={{
                                                    backgroundColor:
                                                        opt.toLowerCase(),
                                                }}
                                            />
                                        )}
                                        <span className="text-sm text-foreground">
                                            {opt}
                                        </span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </FilterSection>
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-200 p-4 bg-gray-50">
                    <div className="space-y-3">
                        <button
                            onClick={handleApplyFilters}
                            className="w-full bg-foreground text-white py-3 px-4 rounded-lg hover:bg-foreground transition-colors font-medium"
                        >
                            Apply Filters
                        </button>
                        <button
                            onClick={handleClearFilters}
                            className="w-full bg-white text-foreground py-3 px-4 rounded-lg border border-foreground hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-4 h-4" />
                            Clear All Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SidebarFilter;
