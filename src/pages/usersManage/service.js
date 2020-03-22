import getRequest from "../../utils/get"

export async function getStudentsList(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/user/studentList',
        method: 'GET',
        data
    }) 
}

export async function getTeachersList(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/user/teacherList',
        method: 'GET',
        data
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
        data
    }) 
}

export async function getStudentClassFB(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/manager/getStudentCourseSuggestion',
        method: 'GET',
        data,
    }) 
}

export async function getTeacherClassFB(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/manager/getTeacherCourseSuggestion',
        method: 'GET',
        data
    }) 
}

export default {
    getStudentsList,
    getTeachersList,
    getManagersList,
    getFamilyList,
    getStudentClassFB,
    getTeacherClassFB
}