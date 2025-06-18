import React from "react";
import InputField from "../../../components/common/InputField";
import Button from "../../../components/common/Button";
import { useForm } from "react-hook-form";
import Heading from "../home/components/Heading";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/apiConnector";
import toast from "react-hot-toast";

function ResetPassword() {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
        reset,
    } = useForm();
    const emailValue = watch("email");
    const handleSendResetLink = async (data) => {
        const toastId = toast.loading("Please wait");
        try {
            const res = await axiosInstance.post(
                "/auth/forgot-password-token",
                data
            );
            toast.success("Reset link sent");
            reset();
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        } finally {
            toast.dismiss(toastId);
        }
    };
    return (
        <div>
            <div className="boxedContainer px-8 md:w-[40%]  h-auto py-6">
                <Heading text={"Reset Password"} />
                <form
                    className="flex flex-col gap-2 mt-6"
                    onSubmit={handleSubmit(handleSendResetLink)}
                >
                    <h1 className="text-sm text-foreground mb-3 text-center">
                        We will send you an email to reset your password
                    </h1>
                    <InputField
                        value={emailValue}
                        register={register}
                        name={"email"}
                        type="email"
                        label={"Email Or Username*"}
                        errors={errors}
                        rules={{
                            required: "Email is required.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Please enter a valid email address",
                            },
                        }}
                    />
                    <Button text="Send Link" type={"submit"} />
                </form>
                <h1 className="text-sm text-center mt-3">
                    Back to{" "}
                    <Link
                        to={"/login"}
                        className="underline text-xs text-gray-600 cursor-pointer"
                    >
                        Login
                    </Link>
                </h1>
            </div>
        </div>
    );
}

export default ResetPassword;
