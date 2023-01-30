import axios from "axios"
import { BASE_URL } from "../../../constants/urls"


export default () => {
    const newStatusMap = {
        true:'APPROVED',
        boolean: 'DISAPPROVED'
    }

    function handleChangeDealStatus({id,newStatus}:{id:number,newStatus: "APPROVED" | "DISAPPROVED" | "PENDING"}){
        return axios({
            method: 'patch',
            url: BASE_URL + '/admin/changeDealStatus',
            data:{
                newStatus:newStatus,
                id: id,
            }
        }).then( data => {
            return data
        })
    }

    return {handleChangeDealStatus}
}