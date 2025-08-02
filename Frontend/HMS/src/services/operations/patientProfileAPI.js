import axiosInstance from "../apiConnector"


const getPatient = async (id) => {
  return axiosInstance.get("/profile/patient/getPatient/" + id)
    .then((response) => response.data)
    .catch((error) => { throw error; });
}

const updatePatient = async (patient) => {
  return axiosInstance.put("/profile/patient/update" , patient)
    .then((response) => response.data)
    .catch((error) => { throw error; });
}

export { getPatient, updatePatient }; 