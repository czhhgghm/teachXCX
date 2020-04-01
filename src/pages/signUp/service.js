import getRequest from "../../utils/get";
import postRrequest from "../../utils/post";

export async function addRecommand(data) {
    return postRrequest({
        url: '/Recommand/addRecommand',
        method: 'POST',
        data
    }) 
}

export async function getRecommandList(data) {
    return getRequest({
        url: '/Recommand/recommandList',
        method: 'GET',
        data
    }) 
}

export async function reviewRecommand(data) {
    return postRrequest({
        url: `/Recommand/reviewRecommand?id=${data.id}`,
        method: 'POST',
        data
    }) 
}

export default {
    addRecommand,
    getRecommandList,
    reviewRecommand
}