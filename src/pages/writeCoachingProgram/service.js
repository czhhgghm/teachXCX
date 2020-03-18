//执行异步请求
import getRequest from "../../utils/get";
import postRrequest from "../../utils/request";

export async function checkGuidance(data) {
    return postRrequest({
        url: `/guidance/hasGuidance?studentId=${data.studentId}&teacherId=${data.teacherId}`,
        method: 'POST',
        data
    }) 
}

export async function addGuidance(data) {
    return postRrequest({
        url: '/guidance/addGuidance',
        method: 'POST',
        data
    }) 
}

export async function passGuidance(data) {
    return postRrequest({
        url: `/guidance/review?guidanceId=${data.guidanceId}`,
        method: 'POST',
        data
    }) 
}

export async function getPendingList(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/guidance/pendingList',
        method: 'GET',
        data
    }) 
}

export async function getPassList(data) {
    return getRequest({
        url: 'https://m-school.mynatapp.cc/guidance/reviewList',
        method: 'GET',
        data
    }) 
}

export default {
    checkGuidance,
    addGuidance,
    getPendingList,
    passGuidance,
    getPassList
}