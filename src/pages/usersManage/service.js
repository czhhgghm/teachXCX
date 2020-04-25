import getRequest from "../../utils/get"

export async function getStudentsList(data) {
    return getRequest({
        url: '/user/studentList',
        method: 'GET',
        data
    }) 
}

export async function getTeachersList(data) {
    return getRequest({
        url: '/user/teacherList',
        method: 'GET',
        data
    }) 
}

export async function getManagersList(data) {
    return getRequest({
        url: '/user/managerList',
        method: 'GET',
        data,
    }) 
}

export async function getFamilyList(data) {
    return getRequest({
        url: '/user/familyList',
        method: 'GET',
        data
    }) 
}

export default {
    getStudentsList,
    getTeachersList,
    getManagersList,
    getFamilyList
}