import axios from "axios"
import { BASE_URL } from "../../../constants/urls"
import { DealStatus } from "../../../sharedComponents/portfolioManager/portfolioDataSchemas"


export default () => {
    const newStatusMap = {
        true:'APPROVED',
        boolean: 'DISAPPROVED'
    }

    function handleChangeDealStatus({id,newStatus}:{id:number,newStatus: DealStatus}){
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