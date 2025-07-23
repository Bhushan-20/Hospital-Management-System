import axios from "axios"

 const axiosInstance = axios.create({
    baseURL:"http://localhost:9000/api/v1"
 });

 axiosInstance.interceptors.request.use(
    (config)=>{
        return config;
    }
 )

 export default axiosInstance;

// export const apiConnector = (method,url,bodyData,headers,params) => {
//     return axiosInstance({
//         method:`${method}`,
//         url:`${url}`,
//         data:bodyData ?bodyData:null,
//         headers:headers? headers:null,
//         params:params?params:null
//     })
// }