import toast from 'react-hot-toast'
export const AxiosTostError=(error)=>{
    toast.error(error?.response?.data?.message)
}