import postRrequest from "../../utils/post"
import getRequest from "../../utils/get"

export async function getNewAdvice(data) {
    return getRequest({
        url: '/Suggestion/get',
        method: 'GET',
        data
    }) 
}

export async function deleteAdvice(data) {
    return postRrequest({
        url: `/Suggestion/delete?id=${data.id}`,
        method: 'POST',
        data
    }) 
}

export default {
    getNewAdvice,
    deleteAdvice
}