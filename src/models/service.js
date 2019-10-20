//执行异步请求
import Request  from "../utils/get";

export async function getSthing(data) {
    return Request({
        url: 'https://m-school.mynatapp.cc/user/login',
        method: 'GET',
        data,
    }) 
}

export default {
    getSthing
}