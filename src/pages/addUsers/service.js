import postRrequest from "../../utils/request";

export async function addStudent(data) {
    return postRrequest({
        url: '/manager/addStudent',
        method: 'POST',
        data
    }) 
}

export async function addFamily(data) {
    return postRrequest({
        url: '/manager/addFamily',
        method: 'POST',
        data
    }) 
}

export async function addTeacher(data) {
    return postRrequest({
        url: '/manager/addTeacher',
        method: 'POST',
        data
    }) 
}

export async function addManager(data) {
    return postRrequest({
        url: '/manager/addManager',
        method: 'POST',
        data
    }) 
}

export default {
    addStudent,
    addFamily,
    addTeacher,
    addManager
}