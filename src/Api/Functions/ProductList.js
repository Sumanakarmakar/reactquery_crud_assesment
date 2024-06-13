import axiosInstance from "../ApiUrl";
import { endpoints } from "../Endpoints/Endpoints";


export const getProductList=async()=>{
    try{
        const response=await axiosInstance.get(endpoints.cms.viewproduct)
        return response?.data?.data
    }catch(error){
        console.log(error);
    }
}