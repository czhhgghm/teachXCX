import { 
    getStudentsCourse,
    getTeachersCourse
 } from './service'

export default {
    namespace: 'schedule',
    state: {
        studentsCourse: [],
        teachersCourse: [],
        showCourse: [false,false,false,false,false,false,false]
    },
    effects: {
        *getStudentsCourse({payload},{call,put}) {
            const response = yield call(getStudentsCourse,payload)
            response.data.unshift(response.data.pop())
            const showCourse = [false,false,false,false,false,false,false]
            response.data.forEach((item,index) => {
                item.forEach((ele)=>{
                    if(ele !== null) {                       
                        showCourse[index] = true
                    }
                })
            })
            yield put({
                type: 'saveStudentsCourse',
                payload: {
                    studentsCourse: response.data,
                    showCourse
                }
            })
        },
        *getTeachersCourse({payload},{call,put}) {
            const response = yield call(getTeachersCourse,payload);
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
            const {studentsCourse,showCourse} = payload
            return {
                ...state,
                studentsCourse,
                showCourse
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