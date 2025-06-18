import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import InputField from "./InputField";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../utils/handleAxiosError";
import axiosInstance from "../../utils/apiConnector";

export default function JoinNewsLetter() {
    const {
        register,
        watch,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [showPopup, setShowPopup] = useState(false);
    const emailValue = watch("email");

    const subscribeNewsHandler = async (data) => {
        const toastId = toast.loading("Please wait...");
        try {
            await axiosInstance.post("/newsletter", data);
            toast.success("You're subscribed! 🎉 Welcome aboard!");
            reset();
            setShowPopup(false);
            localStorage.setItem("newsletterShown", "true");
        } catch (error) {
            const message = handleAxiosError(error);
        } finally {
            toast.dismiss(toastId);
        }
    };

    useEffect(() => {
        const hasSeenPopup = localStorage.getItem("newsletterShown");
        if (!hasSeenPopup) {
            const timeoutId = setTimeout(() => {
                setShowPopup(true);
            }, 5000);
            return () => clearTimeout(timeoutId);
        }
    }, []);

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-[500000] p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-md w-full max-w-md md:max-w-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
                    >
                        {/* Left Image */}
                        <div className="w-full md:w-1/2 hidden md:block">
                            <img
                                src="https://demoapus-wp.com/uomo/wp-content/uploads/2020/12/banner-mail.jpg"
                                alt="Join Newsletter"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Right Form */}
                        <div className="w-full md:w-1/2 p-4 md:p-6 flex flex-col relative">
                            <button
                                onClick={() => setShowPopup(false)}
                                className="absolute right-4 top-4 text-2xl text-foreground hover:text-black transition"
                                aria-label="Close newsletter popup"
                            >
                                <RxCross2 />
                            </button>

                            <div className="mt-8 flex-1 flex flex-col justify-center space-y-4">
                                <h1 className="text-2xl font-semibold text-foreground">
                                    Sign Up to Our Newsletter
                                </h1>
                                <p className="text-foreground text-sm">
                                    Be the first to get the latest news about
                                    trends, promotions, and more.
                                </p>

                                <form
                                    onSubmit={handleSubmit(
                                        subscribeNewsHandler
                                    )}
                                    className="w-full"
                                >
                                    <InputField
                                        value={emailValue}
                                        register={register}
                                        name="email"
                                        type="email"
                                        label="Your Email*"
                                        errors={errors}
                                        rules={{
                                            required: "Email is required.",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message:
                                                    "Enter a valid email address.",
                                            },
                                        }}
                                    />
                                    <div className="mt-4">
                                        <Button type="submit" text="Join" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
