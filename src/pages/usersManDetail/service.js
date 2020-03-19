import getRequest from "../../utils/get";

export async function getStudentsDetail(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/student/studentDetail',
        method: 'GET',
        data
    }) 
}

export async function getTeachersDetail(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/teacher/teacherDetail',
        method: 'GET',
        data
    }) 
}

export async function getManagerDetail(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/manager/managerDetail',
        method: 'GET',
        data
    }) 
}

export async function getFamilyDetail(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/family/familyDetail',
        method: 'GET',
        data
    }) 
}

export default {
    getStudentsDetail,
    getTeachersDetail,
    getManagerDetail,
    getFamilyDetail
}