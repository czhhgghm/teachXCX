import { 
    getStudentsDetail,
    getTeachersDetail,
    getManagerDetail,
    getFamilyDetail
 } from './service'

export default {
    namespace: 'usersManDetail',
    state: {
        studentDetail: {
            name: '数据请求中',
            phone: '数据请求中',
            place: '数据请求中',
            school: '数据请求中',
            families: [],
            courses: []
        },
        teacherDetail: {
            name: '数据请求中',
            phone: '数据请求中'
        },
        managerDetail: {
            name: '数据请求中',
            phone: '数据请求中'
        },
        familyDetail: {
            name: '数据请求中',
            phone: '数据请求中',
            children:[]
        },
    },
    
    effects: {
        *getStudentsDetail({payload},{call,put}) {
            const response = yield call(getStudentsDetail,payload)
            response.data.courses.forEach(element => {
                element.begin = element.begin.substring(0,10)
                element.end = element.end.substring(0,10)
            });
            yield put({
                type: 'saveStudentDetail',
                payload: {
                    studentDetail: response.data
                }
            })
        },
        *getTeachersDetail({payload},{call,put}) {
            const response = yield call(getTeachersDetail,payload)
            yield put({
                type: 'saveTeacherDetail',
                payload: {
                    teacherDetail: response.data
                }
            })
        },
        *getManagerDetail({payload},{call,put}) {
            const response = yield call(getManagerDetail,payload)
            yield put({
                type: 'saveManagerDetail',
                payload: {
                    managerDetail: response.data
                }
            })
        },
        *getFamilyDetail({payload},{call,put}) {
            const response = yield call(getFamilyDetail,payload)
            yield put({
                type: 'saveFamilyDetail',
                payload: {
                    familyDetail: response.data
                }
            })
        }
    },

    reducers: {
        saveStudentDetail(state, {payload}) {
            const { studentDetail } = payload
            return {
                ...state,
                studentDetail
            }
        },
        saveTeacherDetail(state, {payload}) {
            const { teacherDetail } = payload
            return {
                ...state,
                teacherDetail
            }
        },
        saveManagerDetail(state, {payload}) {
            const { managerDetail } = payload
            return {
                ...state,
                managerDetail
            }
        },
        saveFamilyDetail(state, {payload}) {
            const { familyDetail } = payload
            return {
                ...state,
                familyDetail
            }
        }
    }
}