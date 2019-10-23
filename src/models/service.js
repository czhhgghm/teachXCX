//执行异步请求
import request  from "../utils/get";

export async function getSthing(data) {
    return request({
        url: 'https://m-school.mynatapp.cc/user/login',
        method: 'GET',
        data,
    }) 
}

export default {
    getSthing
}