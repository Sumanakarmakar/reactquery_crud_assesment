import axiosInstance from "../ApiUrl";
import { endpoints } from "../Endpoints/Endpoints";


export const updatepassword = async (data) => {
    try {
        const res = await axiosInstance.post(endpoints.auth.updatepw, data)
        return res?.data
    } catch (error) {
        console.log(error);
    }
}