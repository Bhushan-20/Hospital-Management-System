import axiosInstance from "../apiConnector"


const getDoctor = async (id) => {
  return axiosInstance.get("/profile/doctor/getDoctor/" + id)
    .then((response) => response.data)
    .catch((error) => { throw error; });
}

const updateDoctor = async (doctor) => {
  return axiosInstance.put("/profile/doctor/update" , doctor)
    .then((response) => response.data)
    .catch((error) => { throw error; });
}

export { getDoctor, updateDoctor }; 