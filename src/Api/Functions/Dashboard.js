import axiosInstance from "../ApiUrl";
import { endpoints } from "../Endpoints/Endpoints";


export const profiledata=async()=>{
    try{
        const res=await axiosInstance.get(endpoints.auth.dashboard)
        return res?.data?.data
    }catch(error){
        console.log(error);
    }
}