import { useForm } from "react-hook-form";
import { FiImage } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import SelectField from "../../../components/common/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import uploadMedia from "../../../utils/uploadMedia";
import productApis from "../../../services/api/admin/product/product.api";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import { setProducts } from "../../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const navigate = useNavigate();
    const categories = useSelector((state) => state.category.categories || []);
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const dispatch = useDispatch();

    // Static options for select fields. Adjust as needed or fetch from API.
    const weavingOptions = [
        { value: "Hand Knotted", label: "Hand Knotted" },
        { value: "Hand Tufted", label: "Hand Tufted" },
        { value: "Handloom", label: "Handloom" },
        { value: "Flatweave", label: "Flatweave" },
        { value: "Dhurrie", label: "Dhurrie" },
        // add more as needed
    ];

    const textureOptions = [
        { value: "Soft", label: "Soft" },
        { value: "Medium", label: "Medium" },
        { value: "Coarse", label: "Coarse" },
        // etc.
    ];

    const styleOptions = [
        { value: "Modern", label: "Modern" },
        { value: "Traditional", label: "Traditional" },
        { value: "Abstract", label: "Abstract" },
        { value: "Boho", label: "Boho" },
        // etc.
    ];

    // Example size options; you may also choose free text
    const sizeOptions = [
        { value: "3x5 ft", label: "3x5 ft" },
        { value: "4x6 ft", label: "4x6 ft" },
        { value: "5x8 ft", label: "5x8 ft" },
        { value: "6x9 ft", label: "6x9 ft" },
        { value: "8x10 ft", label: "8x10 ft" },
        // etc., or allow free text
    ];

    // Handle file input and generate preview
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    // Form submit handler
    const onSubmit = async (data) => {
        // Validate at least one image
        if (imageFiles.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }
        const toastId = toast.loading("Please wait...");
        try {
            // Upload images and get URLs
            const imagesUrls = await uploadMedia(imageFiles);
            if (!imagesUrls) {
                toast.error("Image upload failed.");
                return;
            }
            data.images = imagesUrls;

            // Now data contains:
            // name, description, price, psft, category, stock,
            // images, material, weaving, texture, pileThickness, size,
            // color, weight, assurance, hsnCode, style
            const products = await productApis.createProduct(data);
            dispatch(setProducts(products));

            // Reset form
            reset();
            setImageFiles([]);
            setImagePreviews([]);

            toast.success("Product created successfully");
            // Optionally navigate away or stay on page
            // navigate("/admin/products");
        } catch (error) {
            handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
    };

    const handleCancel = () => {
        reset();
        setImageFiles([]);
        setImagePreviews([]);
        navigate(-1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 p-0 sm:p-6 max-w-2xl mx-auto"
        >
            <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                Add Product (Carpet)
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <InputField
                    label="Name"
                    name="name"
                    register={register}
                    errors={errors}
                    rules={{ required: "Product name is required" }}
                />

                {/* Description */}
                <InputField
                    label="Description"
                    name="description"
                    register={register}
                    errors={errors}
                    rules={{ required: "Description is required" }}
                />

                {/* Price & Price per sqft */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Price (Total)"
                        name="price"
                        type="number"
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Price is required",
                            min: { value: 0, message: "Must be positive" },
                        }}
                    />
                    <InputField
                        label="Price per sqft (e.g., 700)"
                        type="number"
                        name="psft"
                        register={register}
                        errors={errors}
                        rules={{ required: "Price per sqft is required" }}
                    />
                </div>

                {/* Stock & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Stock"
                        name="stock"
                        type="number"
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Stock is required",
                            min: { value: 0, message: "Must be positive" },
                        }}
                    />
                    <SelectField
                        label="Category"
                        name="category"
                        register={register}
                        errors={errors}
                        rules={{ required: "Category is required" }}
                        options={categories.map((cat) => ({
                            value: cat._id || cat.value,
                            label: cat.name || cat.label,
                        }))}
                    />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1 flex items-center gap-2">
                        <FiImage size={16} /> Images
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="w-full p-2 border border-gray-300 rounded-md text-sm text-gray-800"
                    />
                    {imagePreviews.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {imagePreviews.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`Preview ${i}`}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Carpet-specific fields */}

                {/* Material & Weaving */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Material (e.g., 100% Jute)"
                        name="material"
                        register={register}
                        errors={errors}
                        rules={{ required: "Material is required" }}
                    />
                    <SelectField
                        label="Weaving Technique"
                        name="weaving"
                        register={register}
                        errors={errors}
                        rules={{ required: "Weaving is required" }}
                        options={weavingOptions}
                    />
                </div>

                {/* Texture & Pile Thickness */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectField
                        label="Texture"
                        name="texture"
                        register={register}
                        errors={errors}
                        rules={{ required: "Texture is required" }}
                        options={textureOptions}
                    />
                    <InputField
                        label="Pile Thickness (e.g., 2/7 inch)"
                        name="pileThickness"
                        register={register}
                        errors={errors}
                        rules={{ required: "Pile thickness is required" }}
                    />
                </div>

                {/* Size & Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* You can switch to InputField if sizes vary too much */}
                    <SelectField
                        label="Size"
                        name="size"
                        register={register}
                        errors={errors}
                        rules={{ required: "Size is required" }}
                        options={sizeOptions}
                    />
                    <SelectField
                        label="Style"
                        name="style"
                        register={register}
                        errors={errors}
                        rules={{ required: "Style is required" }}
                        options={styleOptions}
                    />
                </div>

                {/* Color & Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Color"
                        name="color"
                        register={register}
                        errors={errors}
                        rules={{ required: "Color is required" }}
                    />
                    <InputField
                        label="Weight (e.g., 10 kg)"
                        name="weight"
                        register={register}
                        errors={errors}
                        rules={{ required: "Weight is required" }}
                    />
                </div>

                {/* Assurance & HSN Code */}
                <InputField
                    label="Assurance (e.g., Colorfast, Long-lasting)"
                    name="assurance"
                    register={register}
                    errors={errors}
                    rules={{ required: "Assurance is required" }}
                />
                <InputField
                    label="HSN Code"
                    name="hsnCode"
                    register={register}
                    errors={errors}
                    rules={{
                        required: "HSN Code is required",
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "HSN Code must contain only numbers",
                        },
                    }}
                />

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        className="bg-neutral-800 h-12 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddProduct;
