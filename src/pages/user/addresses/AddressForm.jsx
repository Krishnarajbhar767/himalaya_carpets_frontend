import { useForm } from "react-hook-form";
import InputField from "../../../components/common/InputField"; // Custom Input Field
import axios from "axios"; // For making API calls
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import axiosInstance from "../../../utils/apiConnector";
import toast from "react-hot-toast";

function AddressForm({
    isOpen,
    setIsOpen,
    editAddress,
    setAddresses,
    defaultAddress,
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: editAddress || {
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: "",
            phone: "",
        },
    });

    const isFormUpdated = (oldData, newData) => {
        if (
            JSON.stringify(oldData).toLowerCase() ===
            JSON.stringify(newData).toLowerCase()
        ) {
            return false;
        } else {
            return true;
        }
    };
    const onSubmit = async (data) => {
        try {
            if (editAddress) {
                if (!isFormUpdated(editAddress, data)) {
                    toast.error("No Changes Made To  Address");
                    return;
                }
                const toastId = toast.loading("Please wait...");
                const {
                    data: { address: updatedAddress },
                } = await axiosInstance.put(
                    `/user/address/${editAddress._id}`,
                    data
                );

                setAddresses((prev) =>
                    prev.map((addr) =>
                        addr._id === editAddress._id ? updatedAddress : addr
                    )
                );
                toast.dismiss(toastId);
                toast.success("Address Updated SuccessFully");
            } else {
                const toastId = toast.loading("Please wait...");
                const {
                    data: { address: newAddress },
                } = await axiosInstance.post("/user/address/add", data);
                setAddresses((prev) => [...prev, newAddress]);
                toast.dismiss(toastId);
                toast.success("Address Added SuccessFully");
            }
            setIsOpen(false);
        } catch (error) {
            console.error("Error saving address:", error);
        }
    };

    return (
        <div className="fixed inset-0  glass bg-opacity-30 flex items-center justify-center z-50 p-4 sm:p-6">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="max-h-[90%] bg-white bg-opacity-50 backdrop-blur-md p-4 sm:p-6 w-full max-w-md sm:max-w-lg my-4 sm:my-0 shadow-lg border border-gray-300 border-opacity-20 rounded-lg relative overflow-y-scroll"
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 text-foreground hover:text-foreground"
                >
                    <RxCross2 />
                </button>
                <h3 className="text-lg sm:text-xl font-semibold uppercase text-foreground mb-4 tracking-wide">
                    {editAddress ? "Edit Address" : "Add Address"}
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputField
                        label="Street"
                        name="street"
                        register={register}
                        errors={errors}
                        rules={{ required: "Street is required" }}
                    />
                    <InputField
                        label="City"
                        name="city"
                        register={register}
                        errors={errors}
                        rules={{ required: "City is required" }}
                    />
                    <InputField
                        label="State"
                        name="state"
                        register={register}
                        errors={errors}
                        rules={{ required: "State is required" }}
                    />
                    <InputField
                        label="Postal Code"
                        name="postalCode"
                        register={register}
                        errors={errors}
                        rules={{ required: "Postal code is required" }}
                    />
                    <InputField
                        label="Country"
                        name="country"
                        register={register}
                        errors={errors}
                        rules={{ required: "Country is required" }}
                    />
                    <InputField
                        label="Phone"
                        name="phone"
                        type="tel"
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Phone number is required",
                            pattern: {
                                value: /^[6-9]\d{9}$/,
                                message: "Enter a valid Indian phone number",
                            },
                        }}
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-foreground text-white"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 bg-gray-200 mx-4"
                    >
                        Cancel
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

export default AddressForm;
