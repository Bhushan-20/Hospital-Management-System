const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SIGNUP_API: BASE_URL + "/auth/registerUser",
    LOGIN_API: BASE_URL + "/auth/login",
}