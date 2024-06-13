import axiosInstance from "../ApiUrl";
import { endpoints } from "../Endpoints/Endpoints";


export const forgetPw = async (data) => {
    try {
        const response = await axiosInstance.post(endpoints.auth.forgetpw, data)
        return response?.data
    } catch (err) {
        console.log("error fetching forgetpw api", err);
    }
}