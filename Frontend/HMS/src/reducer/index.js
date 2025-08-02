import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import userReducer from "../slice/userSlice";
import doctorReducer from "../slice/doctorSlice";
import patientReducer from "../slice/patientSlice";

const rootReducer = combineReducers({
    jwt: authReducer,
    user: userReducer,
    doctor: doctorReducer,
    patient: patientReducer
});

export default rootReducer;

  // Doctor-specific data
//     useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const data = await getDoctor(user.profileId);
//         setDoctorData(data);
//       } catch (error) {
//         console.error("Failed to fetch doctor data:", error);
//       }
//     };

//     if (user?.profileId) {
//       fetchDoctor();
//     }
//   }, [user]);