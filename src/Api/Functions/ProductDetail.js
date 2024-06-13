import axiosInstance from "../ApiUrl";
import { endpoints } from "../Endpoints/Endpoints";



export const getProductDetails=async(id)=>{
    try{
        const response=await axiosInstance.get(`${endpoints.cms.productdetails}/${id}`)
        return response?.data?.data
    }catch(error){
        console.log(error);
    }
}