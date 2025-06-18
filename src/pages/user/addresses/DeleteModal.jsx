import { motion } from "framer-motion";
import axiosInstance from "../../../utils/apiConnector";
import toast from "react-hot-toast";

function DeleteModal({
    isOpen,
    addressToDelete,
    setAddresses,
    setIsDeleteModalOpen,
    defaultAddress,
}) {
    const confirmDelete = async () => {
        if (addressToDelete === defaultAddress?._id) {
            toast.error("You Cant Delete Your Default Address");
            return;
        }
        const toastId = toast.loading("Please wait...");

        try {
            await axiosInstance.delete(`/user/address/${addressToDelete}`);
            setAddresses((prevAddresses) =>
                prevAddresses.filter((addr) => addr._id !== addressToDelete)
            );
            setIsDeleteModalOpen(false);
            toast.success("Address deleted successfully");
        } catch (error) {
            toast.error("Failed to delete");
            console.error("Error deleting address:", error);
        } finally {
            toast.dismiss(toastId);
        }
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        isOpen && (
            <div className="fixed inset-0 glass bg-opacity-30 flex items-center justify-center z-50 p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white bg-opacity-50 backdrop-blur-md p-4 sm:p-6 w-full max-w-sm shadow-lg border border-gray-300 border-opacity-20 rounded-lg"
                >
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
                        Confirm Deletion
                    </h3>
                    <p className="text-foreground text-sm sm:text-base mb-6">
                        Are you sure you want to delete this address? This
                        action cannot be undone.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={confirmDelete}
                            className="bg-red-600 text-white px-4 py-2 text-xs sm:text-sm"
                        >
                            Delete
                        </button>
                        <button
                            onClick={cancelDelete}
                            className="bg-gray-200 text-foreground px-4 py-2 text-xs sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        )
    );
}

export default DeleteModal;
