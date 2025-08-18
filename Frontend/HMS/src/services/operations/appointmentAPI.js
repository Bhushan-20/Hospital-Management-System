import axiosInstance from "../apiConnector";

const scheduleAppointment = async (appointment) => {
  return axiosInstance
    .post("/appointment/schedule", appointment)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const cancelAppointment = async (id) => {
  return axiosInstance
    .put("/appointment/cancel/" + id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getAppointment = async (id) => {
  return axiosInstance
    .get("/appointment/get/" + id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getAppointmentDetails = async (id) => {
  return axiosInstance
    .get("/appointment/get/details/" + id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getAllAppointments = async (id) => {
  return axiosInstance
    .get("/appointment/getAllAppointments/" + id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getAllAppointmentsOfDoctor = async (id) => {
  return axiosInstance
    .get("/appointment/doctors/getAllAppointments/" + id)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export {
  scheduleAppointment,
  cancelAppointment,
  getAppointment,
  getAppointmentDetails,
  getAllAppointments,
  getAllAppointmentsOfDoctor
};
