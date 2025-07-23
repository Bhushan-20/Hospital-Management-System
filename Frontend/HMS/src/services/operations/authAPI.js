import axiosInstance from "../apiConnector"

const registerUser = async (user) => {
  return axiosInstance.post("/auth/registerUser", user)
    .then((response) => response.data)
    .catch((error) => { throw error; });
}

const loginUser = async (user) => {
  return axiosInstance.post("/auth/login", user)
    .then((response) => response.data)
    .catch((error) => { throw error; });
}

export { registerUser, loginUser }; 