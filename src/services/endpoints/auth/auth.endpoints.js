const authEndpoints = {
    register: "/auth/register",
    sendOtp: "/auth/send-otp",
    login: "/auth/login",
    logout: "/auth/logout",
    changePassword: "/auth/change-password",
    forgotPasswordLink: "/auth/forgot-password-token", // this api was directly Called  In ResetPassword Components
    getUserDetails: "/auth/user",
    forgotPasswordToken: (token) => `/auth/forgot-password/${token}`,
};

export default authEndpoints;
