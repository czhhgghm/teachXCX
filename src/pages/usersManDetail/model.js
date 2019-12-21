import { 
    getStudentsDetail,
    getTeachersDetail,
    getManagersDetail,
    getFamilyDetail
 } from './service'

export default {
    namespace: 'usersManDetail',
    state: {
        studentDetail: {families:[]},
        teacherDetail: [],
        managerDetail: [],
        familyDetail: {children:[]},
    },
    
    effects: {
        *getStudentsDetail({payload},{call,put}) {
            const response = yield call(getStudentsDetail,payload);
            yield put({
                type: 'saveStudentDetail',
                payload: {
                    studentDetail: response.data
                }
            })
        },
        *getTeachersDetail({payload},{call,put}) {
            const response = yield call(getTeachersDetail,payload);
            yield put({
                type: 'saveTeacherDetail',
                payload: {
                    teacherDetail: response.data
                }
            })
        },
        *getManagersDetail({payload},{call,put}) {
            const response = yield call(getManagersDetail,payload);
            yield put({
                type: 'saveManagerDetail',
                payload: {
                    managerDetail: response.data
                }
            })
        },
        *getFamilyDetail({payload},{call,put}) {
            const response = yield call(getFamilyDetail,payload);
            yield put({
                type: 'saveFamilyDetail',
                payload: {
                    familyDetail: response.data
                }
            })
        },
    },

    reducers: {
        saveStudentDetail(state, {payload}) {
            const {studentDetail} = payload
            return {
                ...state,
                studentDetail
            }
        },
        saveTeacherDetail(state, {payload}) {
            const {teacherDetail} = payload
            return {
                ...state,
                teacherDetail
            }
        },
        saveManagerDetail(state, {payload}) {
            const {managerDetail} = payload
            return {
                ...state,
                managerDetail
            }
        },
        saveFamilyDetail(state, {payload}) {
            const {familyDetail} = payload
            return {
                ...state,
                familyDetail
            }
        },
    }
}