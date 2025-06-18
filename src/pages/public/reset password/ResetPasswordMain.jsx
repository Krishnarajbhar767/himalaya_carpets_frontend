import React, { useEffect, useState } from "react";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import Heading from "../home/components/Heading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../utils/apiConnector";
import toast from "react-hot-toast";
import { handleAxiosError } from "../../../utils/handleAxiosError";

// ResetPassword Component for UI design (logic to be implemented manually)
function ResetPasswordMain() {
    const {
        register,
        watch,
        handleSubmit,

        formState: { errors },
    } = useForm();
    // State for form animation
    const [isFormVisible, setIsFormVisible] = useState(false);
    const passwordValue = watch("password");
    const confirmPasswordValue = watch("confirmPassword");
    const { token } = useParams();
    const navigate = useNavigate();
    // Trigger form fade-in animation on mount
    const validateToken = async () => {
        try {
            const res = await axiosInstance.post(
                `/auth/validate-forgot-password-token/${token}`
            );
        } catch (error) {
            const err = handleAxiosError(error, "Invalida token");
            navigate("/reset-password");
        }
    };
    useEffect(() => {
        setIsFormVisible(true);
        validateToken();
    }, [token]);

    const handleResetPassword = async (data) => {
        const toastId = toast.loading("Please wait");
        try {
            // call api
            const res = await axiosInstance.put(
                `/auth/forgot-password/${token}`,
                data
            );
            toast.success("Password changed successfully");
            navigate("/login");
            // check for response
            // toast.success
            // redirect to login
        } catch (error) {
            toast.error(error.response?.data.message);
            console.log(error);
        } finally {
            toast.dismiss(toastId);
        }
    };
    return (
        <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
            <div
                className={`boxedContainer w-full max-w-md md:w-[40%] h-auto py-8 px-8 border border-foreground/50 bg-white transition-all duration-500 ease-in-out ${
                    isFormVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                }`}
            >
                {/* Form Header */}
                <Heading text="Set New Password" />
                <p className="text-sm text-foreground text-center mt-2 mb-6">
                    Enter your new password below to complete the reset process.
                </p>

                {/* Reset Password Form */}
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(handleResetPassword)}
                >
                    {/* Password Input Field */}
                    <InputField
                        value={passwordValue}
                        register={register}
                        name={"password"}
                        type="password"
                        label={"Password*"}
                        errors={errors}
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Password must not exceed 20 characters",
                            },
                        }}
                    />

                    {/* Confirm Password Input Field */}
                    <InputField
                        value={confirmPasswordValue}
                        register={register}
                        name={"confirmPassword"}
                        type="password"
                        label={"Confirm Password*"}
                        errors={errors}
                        rules={{
                            required: "Confirm password is required",
                            validate: (value) =>
                                value === watch("password") ||
                                "Passwords must match",
                        }}
                    />

                    {/* Submit Button */}
                    <Button
                        text="Reset Password"
                        type="submit"
                        className="w-full bg-black text-white px-6 py-3 hover:bg-gray-800 transition-all duration-200"
                    />
                </form>

                {/* Back to Login Link */}
                <div className="text-center mt-6">
                    <span className="text-sm text-gray-600">
                        Back to{" "}
                        <Link
                            to="/login"
                            className="text-sm text-black underline hover:text-gray-800 transition-all duration-200"
                        >
                            Login
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordMain;
