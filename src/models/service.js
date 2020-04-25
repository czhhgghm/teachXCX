import getRequest from "../utils/get"
import postRrequest from "../utils/post"

export async function getSessionId(data) {
    return getRequest({
        url: '/user/login',
        method: 'GET',
        data
    }) 
}

export async function getPhone(data) {
    return postRrequest({
        url: '/user/phoneAndLogin',
        method: 'POST',
        data
    }) 
}

export default {
    getSessionId,
    getPhone
}