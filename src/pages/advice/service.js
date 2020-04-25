import postRrequest from "../../utils/post"

export async function submitAdvice(data) {
    return postRrequest({
        url: '/Suggestion/add',
        method: 'POST',
        data
    }) 
}

export default {
    submitAdvice
}