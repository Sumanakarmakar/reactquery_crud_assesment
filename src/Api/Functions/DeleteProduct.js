import axiosInstance from "../ApiUrl";
import { endpoints } from "../Endpoints/Endpoints";


export const deleteProduct=async(id)=>{
    try{
        const response=await axiosInstance.delete(`${endpoints.cms.delete}/${id}`)
        return response?.data
    }catch(error){
        console.log(error);
    }
}