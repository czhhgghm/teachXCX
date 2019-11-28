//执行异步请求
import getRequest from "../../utils/get";
import postRrequest from "../../utils/request";

export async function getStudentsList(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/user/studentList',
        method: 'GET',
        data,
    }) 
}

export async function getTeachersList(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/user/teacherList',
        method: 'GET',
        data,
    }) 
}

export async function getManagersList(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/user/managerList',
        method: 'GET',
        data,
    }) 
}

export async function getFamilyList(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/user/familyList',
        method: 'GET',
        data,
    }) 
}

// export async function addStudent(data) {
//     return postRrequest({
//         url: '/manager/addStudent',
//         method: 'POST',
//         data,
//     }) 
// }



export default {
    getStudentsList,
    getTeachersList,
    getManagersList,
    getFamilyList
}