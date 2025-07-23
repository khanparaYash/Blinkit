import { SummaryApi } from "../common/SummaryApi"
import { Axios } from "./Axios"

export const fetchUserDetails=async()=>{
    try {
        const responce=await Axios({
            ...SummaryApi.user_details
        })
        return responce
    } catch (error) {
        console.log(error);
        
    }
}