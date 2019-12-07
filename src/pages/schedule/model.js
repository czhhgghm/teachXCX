import { 
    getStudentsCourse,
    getTeachersCourse
 } from './service'

export default {
    namespace: 'schedule',
    state: {
        studentsCourse: [],
        teachersCourse: [],
    },
    
    effects: {
        *getStudentsCourse({payload},{call,put}) {
            const response = yield call(getStudentsCourse,payload);
            console.log('getStudentsCourse接口数据:',response)
            yield put({
                type: 'saveStudentsCourse',
                payload: {
                    studentsCourse: response.data
                }
            })
        },
        *getTeachersCourse({payload},{call,put}) {
            const response = yield call(getTeachersCourse,payload);
            console.log('getTeachersCourse接口数据:',response)
            yield put({
                type: 'saveTeachersCourse',
                payload: {
                    teachersCourse: response.data
                }
            })
        },
    },

    reducers: {
        saveStudentsCourse(state, {payload}) {
            const {studentsCourse} = payload
            return {
                ...state,
                studentsCourse
            }
        },
        saveTeachersCourse(state, {payload}) {
            const {teachersCourse} = payload
            return {
                ...state,
                teachersCourse
            }
        },
    }
}