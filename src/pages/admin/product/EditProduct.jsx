import { useForm } from "react-hook-form";
import { FiImage } from "react-icons/fi";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InputField from "../../../components/common/InputField";
import SelectField from "../../../components/common/SelectField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import uploadMedia from "../../../utils/uploadMedia";
import productApis from "../../../services/api/admin/product/product.api";
import { setProducts } from "../../../redux/slices/productSlice";

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const { products } = useSelector((state) => state.product);
    const categories = useSelector((state) => state.category.categories || []);
    const product = products?.find((p) => p._id === id);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm();

    const [existingImages, setExistingImages] = useState([]);
    const [newImageFiles, setNewImageFiles] = useState([]);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [initialData, setInitialData] = useState(null);

    const watchedFields = watch();
    const dispatch = useDispatch();

    useEffect(() => {
        if (product) {
            const init = {
                name: product.name,
                description: product.description,
                price: product.price,
                psft: product.psft,
                category: product.category._id || product.category,
                stock: product.stock,
                material: product.material,
                weaving: product.weaving,
                texture: product.texture,
                pileThickness: product.pileThickness,
                size: product.size,
                color: product.color,
                weight: product.weight,
                assurance: product.assurance,
                hsnCode: product.hsnCode,
                style: product.style,
            };
            reset(init);
            setInitialData(init);
            setExistingImages(product.images || []);
        }
    }, [product, reset]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map((file) => URL.createObjectURL(file));
        setNewImageFiles((prev) => [...prev, ...files]);
        setNewImagePreviews((prev) => [...prev, ...previews]);
    };

    const removeExistingImage = (index) => {
        const updated = [...existingImages];
        updated.splice(index, 1);
        setExistingImages(updated);
    };

    const removeNewImage = (index) => {
        const files = [...newImageFiles];
        const previews = [...newImagePreviews];
        files.splice(index, 1);
        previews.splice(index, 1);
        setNewImageFiles(files);
        setNewImagePreviews(previews);
    };

    const isFormChanged = () => {
        if (!initialData) return false;
        for (let key in initialData) {
            if (String(watchedFields[key]) !== String(initialData[key])) {
                return true;
            }
        }
        if (newImageFiles.length > 0) return true;
        if (existingImages.length !== (product?.images?.length || 0))
            return true;
        return false;
    };

    const onSubmit = async (data) => {
        if (!isFormChanged()) {
            toast.error("No changes detected.");
            return;
        }
        setIsSubmitting(true);
        const toastId = toast.loading("Please wait...");
        let uploadedImageUrls = [];

        if (newImageFiles.length > 0) {
            const formData = new FormData();
            newImageFiles.forEach((file) => formData.append("files", file));

            try {
                const response = await uploadMedia(formData);
                uploadedImageUrls = Array.isArray(response)
                    ? response
                    : [response];
            } catch (error) {
                toast.error("Failed to upload images");
                return;
            }
        }

        const finalImages = [...existingImages, ...uploadedImageUrls];

        const updatedData = {
            ...data,
            images: finalImages,
        };

        try {
            const updatedProducts = await productApis.updateProduct(
                updatedData,
                id
            );
            dispatch(setProducts(updatedProducts));
            toast.success("Product updated");
            navigate(-1);
        } catch (error) {
            toast.error("Failed to update product");
        } finally {
            toast.dismiss(toastId);
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => navigate(-1);

    if (!product) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-600 text-sm">Product not found.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 p-4 sm:p-6 max-w-2xl mx-auto"
        >
            <h3 className="text-lg font-semibold uppercase text-gray-800 mb-4 tracking-wide">
                Edit Product
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <InputField
                    label="Name"
                    name="name"
                    register={register}
                    errors={errors}
                    rules={{ required: "Product name is required" }}
                />
                <InputField
                    label="Description"
                    name="description"
                    register={register}
                    errors={errors}
                    rules={{ required: "Description is required" }}
                />
                <InputField
                    label="₹/sqft"
                    name="psft"
                    register={register}
                    errors={errors}
                    rules={{ required: "psft is required" }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        label="Price"
                        name="price"
                        type="number"
                        register={register}
                        errors={errors}
                        rules={{ required: "Price is required" }}
                    />
                    <InputField
                        label="Stock"
                        name="stock"
                        type="number"
                        register={register}
                        errors={errors}
                        rules={{ required: "Stock is required" }}
                    />
                </div>
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
                    <div className="mt-2 flex flex-wrap gap-2">
                        {existingImages.map((src, i) => (
                            <div key={i} className="relative w-36   h-36">
                                <img
                                    src={src}
                                    alt="img"
                                    className="w-full h-full object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(i)}
                                    className="absolute top-0 right-0 text-white bg-red-500 rounded-full px-1 h-6 w-6"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                        {newImagePreviews.map((src, i) => (
                            <div
                                key={`new-${i}`}
                                className="relative w-36   h-36"
                            >
                                <img
                                    src={src}
                                    alt="new img"
                                    className="w-full h-full object-cover rounded"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(i)}
                                    className="absolute top-0 right-0 text-white bg-red-500 rounded-full px-1 h-6 w-6"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <InputField
                    label="Material"
                    name="material"
                    register={register}
                    errors={errors}
                    rules={{ required: "Material is required" }}
                />
                <InputField
                    label="Weaving"
                    name="weaving"
                    register={register}
                    errors={errors}
                    rules={{ required: "Weaving is required" }}
                />
                <InputField
                    label="Texture"
                    name="texture"
                    register={register}
                    errors={errors}
                    rules={{ required: "Texture is required" }}
                />
                <InputField
                    label="Pile Thickness"
                    name="pileThickness"
                    register={register}
                    errors={errors}
                    rules={{ required: "Pile Thickness is required" }}
                />
                <InputField
                    label="Size"
                    name="size"
                    register={register}
                    errors={errors}
                    rules={{ required: "Size is required" }}
                />
                <InputField
                    label="Color"
                    name="color"
                    register={register}
                    errors={errors}
                    rules={{ required: "Color is required" }}
                />
                <InputField
                    label="Weight"
                    name="weight"
                    register={register}
                    errors={errors}
                    rules={{ required: "Weight is required" }}
                />
                <InputField
                    label="Assurance"
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
                    rules={{ required: "HSN Code is required" }}
                />
                <InputField
                    label="Style"
                    name="style"
                    register={register}
                    errors={errors}
                    rules={{ required: "Style is required" }}
                />

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="submit"
                        style={{
                            cursor: isSubmitting ? "not-allowed" : "pointer",
                        }}
                        disabled={isSubmitting}
                        className="bg-neutral-950 text-white px-4 py-2 h-12 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full "
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

export default EditProduct;
