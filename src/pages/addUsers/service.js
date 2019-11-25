//执行异步请求
import getRequest from "../../utils/get";
import postRrequest from "../../utils/request";

// export async function getSessionId(data) {
//     return getRequest({
//         url: 'https://m-school.mynatapp.cc/user/login',
//         method: 'GET',
//         data,
//     }) 
// }

export async function addStudent(data) {
    return postRrequest({
        url: '/manager/addStudent',
        method: 'POST',
        data,
    }) 
}

export async function addFamily(data) {
    return postRrequest({
        url: '/manager/addFamily',
        method: 'POST',
        data,
    }) 
}

export async function addTeacher(data) {
    return postRrequest({
        url: '/manager/addTeacher',
        method: 'POST',
        data,
    }) 
}

export default {
    addStudent,
    addFamily,
    addTeacher
}