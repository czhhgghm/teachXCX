import getRequest from "../../utils/get"

export async function getStudentsDetail(data) {
    return getRequest({
        url: `/student/studentDetail?id=${data.id}`,
        method: 'GET',
        data
    }) 
}

export async function getTeachersDetail(data) {
    return getRequest({
        url: '/teacher/teacherDetail',
        method: 'GET',
        data
    }) 
}

export async function getManagerDetail(data) {
    return getRequest({
        url: '/manager/managerDetail',
        method: 'GET',
        data
    }) 
}

export async function getFamilyDetail(data) {
    return getRequest({
        url: '/family/familyDetail',
        method: 'GET',
        data: data
    }) 
}

export default {
    getStudentsDetail,
    getTeachersDetail,
    getManagerDetail,
    getFamilyDetail
}