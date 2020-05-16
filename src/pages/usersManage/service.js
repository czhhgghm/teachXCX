import getRequest from "../../utils/get"

export async function getStudentsList(data) {
    return getRequest({
        url: '/user/studentList',
        method: 'GET',
        data
    }) 
}

export async function getStudentsListPage(data) {
    return getRequest({
        url: '/user/studentListPage',
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

export async function getTeachersListPage(data) {
    return getRequest({
        url: '/user/teacherListPage',
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

export async function getManagersListPage(data) {
    return getRequest({
        url: '/user/managerListPage',
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

export async function getFamilyListPage(data) {
    return getRequest({
        url: '/user/familyListPage',
        method: 'GET',
        data
    }) 
}

export default {
    getStudentsList,
    getStudentsListPage,
    getTeachersList,
    getTeachersListPage,
    getManagersList,
    getManagersListPage,
    getFamilyList,
    getFamilyListPage
}