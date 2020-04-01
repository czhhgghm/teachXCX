import getRequest from "../../utils/get"
import postRrequest from "../../utils/post"

export async function postStudentFB(data) {
    return postRrequest({
        url: '/student/courseSuggestion',
        method: 'POST',
        data
    }) 
}

export async function postTeacherFB(data) {
    return postRrequest({
        url: '/teacher/courseSuggestion',
        method: 'POST',
        data
    }) 
}

export async function getStudentsCourse(data) {
    return getRequest({
        url: '/student/courseList',
        method: 'GET',
        data
    }) 
}

export async function getTeachersCourse(data) {
    return getRequest({
        url: '/teacher/courseList',
        method: 'GET',
        data
    }) 
}

export default {
    getStudentsCourse,
    getTeachersCourse,
    postStudentFB,
    postTeacherFB
}