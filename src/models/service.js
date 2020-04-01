import getRequest from "../utils/get"
import postRrequest from "../utils/post"

export async function getSessionId(data) {
    return getRequest({
        url: '/user/login',
        method: 'GET',
        data
    }) 
}

export async function getNewAdvice(data) {
    return getRequest({
        url: '/Suggestion/get',
        method: 'GET',
        data
    }) 
}

export async function getPhone(data) {
    return postRrequest({
        url: '/user/phoneAndLogin',
        method: 'POST',
        data
    }) 
}

export async function submitAdvice(data) {
    return postRrequest({
        url: '/Suggestion/add',
        method: 'POST',
        data
    }) 
}

export async function deleteAdvice(data) {
    return postRrequest({
        url: `/Suggestion/delete?id=${data.id}`,
        method: 'POST',
        data
    }) 
}

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
    getSessionId,
    getPhone,
    submitAdvice,
    deleteAdvice,
    getNewAdvice,
    addCourse
}