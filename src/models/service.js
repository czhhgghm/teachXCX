//执行异步请求
import getRequest from "../utils/get";
import postRrequest from "../utils/request";

export async function getSessionId(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/user/login',
        method: 'GET',
        data,
    }) 
}

export async function getPhone(data) {
    return postRrequest({
        url: '/user/phone',
        method: 'POST',
        data,
    }) 
}

export default {
    getSessionId,
    getPhone
}