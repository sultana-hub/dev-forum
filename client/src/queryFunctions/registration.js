
import axiosInstance from '../api/axiosInstance'
import { endPoints } from '../api/url'

export const register=async(data)=>{
    const res=await axiosInstance.post(endPoints.register,data)
    console.log("registerd data",res.data)
    return res.data

}