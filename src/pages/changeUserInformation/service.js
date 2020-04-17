import postRrequest from "../../utils/post"

export async function updateManager(data) {
    return postRrequest({
        url: '/manager/updateManager',
        method: 'POST',
        data
    }) 
}

export async function updateFamily(data) {
    return postRrequest({
        url: '/manager/updateFamily',
        method: 'POST',
        data
    }) 
}

export async function updateStudent(data) {
    return postRrequest({
        url: '/manager/updateStudent',
        method: 'POST',
        data
    }) 
}

export async function updateTeacher(data) {
    return postRrequest({
        url: '/manager/updateTeacher',
        method: 'POST',
        data
    }) 
}

export default {
    updateManager,
    updateFamily,
    updateStudent,
    updateTeacher
}