import getRequest from "../../utils/get"

export async function getStudents(data) {
    return getRequest({
        url: `/teacher/teacherStudent?id=${data.id}`,
        method: 'GET',
        data
    }) 
}

export default {
    getStudents
}