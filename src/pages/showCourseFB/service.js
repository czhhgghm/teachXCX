import getRequest from "../../utils/get"

export async function getStudentClassFB(data) {
    return getRequest({
        url: '/manager/getStudentCourseSuggestion',
        method: 'GET',
        data,
    }) 
}

export async function getTeacherClassFB(data) {
    return getRequest({
        url: '/manager/getTeacherCourseSuggestion',
        method: 'GET',
        data
    }) 
}

export default {
    getStudentClassFB,
    getTeacherClassFB
}