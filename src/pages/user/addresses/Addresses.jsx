import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiEdit, FiTrash, FiCheck, FiX } from "react-icons/fi";
import AddressForm from "./AddressForm"; // Address Form Component
import AddressList from "./AddressList"; // Address List Component
import DeleteModal from "./DeleteModal"; // Delete Modal Component
import axiosInstance from "../../../utils/apiConnector";

function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);

    // Fetch user's addresses and default address on component load
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const { data } = await axiosInstance.get(
                    "/user/address/getAll"
                ); // Assuming API for fetching addresses
                setAddresses(data.addresses);
                setDefaultAddress(data.defaultAddress); // Set default address from response
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        };

        fetchAddresses();
    }, []);

    const handleEdit = (address) => {
        setEditAddress(address);
        setIsAddressFormOpen(true);
    };

    const handleDeleteClick = (id) => {
        setAddressToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleSetDefault = (id) => {
        axiosInstance.put(`/user/address/default/${id}`).then((response) => {
            // Set the new default address
            setDefaultAddress((a) => response.data?.defaultAddress);
            setAddresses((prevAddresses) =>
                prevAddresses.map((address) => ({
                    ...address,
                    isDefault: address._id === id,
                }))
            );
            console.log("Addresses AFter Setting Default", addresses);
            console.log(defaultAddress);
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6 px-4 sm:px-6 md:px-0 lg:px-8"
        >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl font-semibold uppercase text-foreground tracking-wide">
                    <FiMapPin size={20} /> Saved Addresses
                </h2>
                <button
                    onClick={() => {
                        setIsAddressFormOpen(true);
                        setEditAddress(null);
                    }}
                    className="bg-foreground text-white px-4 py-2 text-xs sm:text-sm uppercase hover:bg-foreground/90 transition-colors duration-200 shadow-md w-full sm:w-auto"
                >
                    Add Address
                </button>
            </div>

            {addresses?.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                    <p className="text-foreground text-sm sm:text-base mb-2">
                        No addresses saved
                    </p>
                    <p className="text-foreground text-xs sm:text-sm">
                        Add an address to see it here
                    </p>
                </div>
            ) : (
                <AddressList
                    key={defaultAddress}
                    addresses={addresses}
                    defaultAddress={defaultAddress}
                    handleEdit={handleEdit}
                    handleDeleteClick={handleDeleteClick}
                    handleSetDefault={handleSetDefault}
                />
            )}

            {isAddressFormOpen && (
                <AddressForm
                    isOpen={isAddressFormOpen}
                    setIsOpen={setIsAddressFormOpen}
                    editAddress={editAddress}
                    setAddresses={setAddresses}
                    defaultAddress={defaultAddress}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    addressToDelete={addressToDelete}
                    setAddresses={setAddresses}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    defaultAddress={defaultAddress}
                />
            )}
        </motion.div>
    );
}

export default Addresses;
