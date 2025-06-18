import { FiGrid, FiEdit, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCategories } from "../../../redux/slices/categorySlice";

function AdminCategories() {
    const categories = useSelector((state) => state.category.categories || []);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const confirmDelete = (id) => {
        dispatch(setCategories(categories.filter((cat) => cat.id !== id)));
        setDeleteCategoryId(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold uppercase text-gray-800 tracking-wide">
                    <FiGrid size={20} /> Categories
                </h2>
                <button
                    onClick={() => navigate("/admin/categories/add")}
                    className="bg-gray-800 text-white px-4 py-2 text-sm uppercase hover:bg-gray-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                >
                    Add Category
                </button>
            </div>

            {/* Category List */}
            {categories.length === 0 ? (
                <div className="text-center py-8 text-gray-600 text-sm">
                    No categories available.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col gap-2"
                        >
                            <h3 className="text-base font-medium text-gray-800 capitalize">
                                {category.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3 capitalize">
                                {category.description}
                            </p>
                            <p className="text-sm text-gray-600">
                                Products: {category.products?.length}
                            </p>
                            <div className="flex justify-between mt-2">
                                <button
                                    onClick={() =>
                                        navigate(`edit/${category._id}`)
                                    }
                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                                >
                                    <FiEdit size={14} /> Edit
                                </button>
                                <button
                                    onClick={() =>
                                        setDeleteCategoryId(category._id)
                                    }
                                    className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                    <FiTrash size={14} /> Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteCategoryId && (
                <div className="fixed inset-0 glass bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg"
                    >
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Confirm Deletion
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Are you sure you want to delete this category? This
                            action cannot be undone.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => confirmDelete(deleteCategoryId)}
                                className="bg-red-600 text-white px-4 py-2 text-sm uppercase hover:bg-red-700 transition-colors duration-200 shadow-md w-full sm:w-auto"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeleteCategoryId(null)}
                                className="bg-gray-200 text-gray-800 px-4 py-2 text-sm uppercase hover:bg-gray-300 transition-colors duration-200 shadow-md w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
}

export default AdminCategories;
