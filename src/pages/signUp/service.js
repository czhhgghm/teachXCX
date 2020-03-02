//执行异步请求
import getRequest from "../../utils/get";
import postRrequest from "../../utils/request";

export async function addRecommand(data) {
    return postRrequest({
        url: '/Recommand/addRecommand',
        method: 'POST',
        data
    }) 
}

export async function getRecommandList(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/Recommand/recommandList',
        method: 'GET',
        data
    }) 
}

export default {
    addRecommand,
    getRecommandList
}