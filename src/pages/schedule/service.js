//执行异步请求
import getRequest from "../../utils/get";
import postRrequest from "../../utils/request";

export async function getStudentsCourse(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/student/courseList',
        method: 'GET',
        data,
    }) 
}

export async function getTeachersCourse(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/teacher/courseList',
        method: 'GET',
        data,
    }) 
}

export default {
    getStudentsCourse,
    getTeachersCourse
}