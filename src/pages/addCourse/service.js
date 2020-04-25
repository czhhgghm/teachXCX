import postRrequest from "../../utils/post"

export async function addCourse(data) {
    return postRrequest({
        url: '/manager/addCourse',
        method: 'POST',
        data
    }) 
}

export async function removeCourse(data) {
    return postRrequest({
        url: `/manager/removeCourse?id=${data.id}`,
        method: 'POST'
    }) 
}

export default {
    addCourse,
    removeCourse
}