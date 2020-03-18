import postRrequest from "../../utils/request";
import getRequest from "../../utils/get";

export async function getStudents(data) {
    return getRequest({
        url: `https://m-school.mynatapp.cc/teacher/teacherStudent?id=${data.id}`,
        method: 'GET',
        data
    }) 
}

export default {
    getStudents
}