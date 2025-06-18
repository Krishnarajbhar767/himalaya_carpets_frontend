import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import InputField from "./InputField";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/apiConnector";

const BookVideoCallModal = ({ isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const loading = toast.loading("Please wait...");
        try {
            const options = {
                body: data,
                email: data.email,
            };
            const res = await axiosInstance.post("/bookVideoCall", options);
            toast.success("Thank You, We will contact you shortly");
        } catch (error) {
            console.log("Error While Book A Video Call", error);
            toast.error("Failed to book your video call");
        } finally {
            toast.dismiss(loading);
            reset();
            onClose();
        }
        // console.log("Form Data:", data);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 glass bg-opacity-40 z-[10000000] flex justify-center items-center p-4">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white max-h-[90%] overflow-y-scroll w-full max-w-lg rounded-lg shadow-lg p-6 relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-700 hover:text-black"
                >
                    <FiX size={20} />
                </button>
                <h3 className="text-xl font-semibold mb-6">
                    Book a Video Call
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <InputField
                        label="Full Name"
                        name="fullName"
                        register={register}
                        errors={errors}
                        rules={{ required: "Full name is required" }}
                    />
                    <InputField
                        label="Email"
                        name="email"
                        type="email"
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        }}
                    />
                    <InputField
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Phone number is required",
                            pattern: {
                                value: /^[6-9]\d{9}$/,
                                message: "Invalid phone number",
                            },
                        }}
                    />
                    <InputField
                        label="Preferred Date"
                        name="date"
                        type="date"
                        register={register}
                        errors={errors}
                        rules={{ required: "Date is required" }}
                    />
                    <InputField
                        label="Preferred Time"
                        name="time"
                        type="time"
                        register={register}
                        errors={errors}
                        rules={{ required: "Time is required" }}
                    />
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-foreground text-white px-4 py-2 rounded text-sm hover:bg-opacity-90"
                        >
                            Book Call
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default BookVideoCallModal;
