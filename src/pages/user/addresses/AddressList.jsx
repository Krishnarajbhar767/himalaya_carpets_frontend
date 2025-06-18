import { motion } from "framer-motion";
import { FiCheck, FiEdit, FiTrash } from "react-icons/fi";

function AddressList({
    addresses,
    defaultAddress,
    handleEdit,
    handleDeleteClick,
    handleSetDefault,
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 p-0">
            {addresses?.map((address) => (
                <motion.div
                    key={address._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-5 hover:shadow-md transition-shadow duration-300 focus-within:ring-2 focus-within:ring-foreground"
                    tabIndex={0}
                    role="region"
                    aria-labelledby={`address-${address._id}`}
                >
                    {/* Header: Address Summary and Default Badge */}
                    <div className="flex justify-between items-start mb-3">
                        <h3
                            id={`address-${address._id}`}
                            className="text-base md:text-lg font-semibold text-foreground truncate max-w-[70%]"
                        >
                            {address.street}, {address.city}
                        </h3>
                        {(defaultAddress?._id === address._id ||
                            addresses.length <= 1) && (
                            <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full"
                            >
                                <FiCheck
                                    className="mr-1 h-3 w-3"
                                    aria-hidden="true"
                                />
                                Default
                            </motion.span>
                        )}
                    </div>

                    {/* Address Details */}
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>{address.street}</p>
                        <p>
                            {address.city}, {address.state},{" "}
                            {address.postalCode}
                        </p>
                        <p>{address.country}</p>
                        <p className="mt-2">Phone: {address.phone}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex justify-end space-x-2">
                        <div className="relative group/edit">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleEdit(address)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={`Edit address: ${address.street}, ${address.city}`}
                            >
                                <FiEdit className="h-5 w-5" />
                            </motion.button>
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/edit:opacity-100 transition-opacity duration-200 pointer-events-none">
                                Edit
                            </span>
                        </div>

                        <div className="relative group/delete">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDeleteClick(address._id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label={`Delete address: ${address.street}, ${address.city}`}
                            >
                                <FiTrash className="h-5 w-5" />
                            </motion.button>
                            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200 pointer-events-none">
                                Delete
                            </span>
                        </div>

                        {defaultAddress?._id !== address._id && (
                            <div className="relative group/default">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                        handleSetDefault(address._id)
                                    }
                                    className="p-2 text-foreground hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-foreground"
                                    aria-label={`Set as default address: ${address.street}, ${address.city}`}
                                >
                                    <FiCheck className="h-5 w-5" />
                                </motion.button>
                                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/default:opacity-100 transition-opacity duration-200 pointer-events-none">
                                    Set Default
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default AddressList;
