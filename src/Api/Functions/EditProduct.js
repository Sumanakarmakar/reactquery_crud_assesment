import axiosInstance from "../ApiUrl";
import { endpoints } from "../Endpoints/Endpoints";


export const editProduct = async (id, data) => {
    try {
        const response = await axiosInstance.post(`${endpoints.cms.edit}/${id}`, data)
        return response?.data
    } catch (error) {
        console.log(error);
    }
}