import { getStudentClassFB, getTeacherClassFB } from './service'

export default {
    namespace: 'classFeedback',
    state: {
        studentFeedback: [],
        teacherFeedback: []
    },
    
    effects: {
        *getStudentClassFB({payload},{call,put}) {
            const response = yield call(getStudentClassFB,payload)
            if(response.data !== null) {
                yield put({
                    type: 'saveStudentClassFB',
                    payload: {
                        studentFeedback: response.data.reverse()
                    }
                })
            }
        },
        *getTeacherClassFB({payload},{call,put}) {
            const response = yield call(getTeacherClassFB,payload)
            if(response.data !== null) {
                yield put({
                    type: 'saveTeacherClassFB',
                    payload: {
                        teacherFeedback: response.data.reverse()
                    }
                }) 
            } 
        }
    },
    
    reducers: {
        saveStudentClassFB(state, {payload}) {
            const { studentFeedback } = payload
            return {
                ...state,
                studentFeedback
            }
        },
        saveTeacherClassFB(state, {payload}) {
            const { teacherFeedback } = payload
            return {
                ...state,
                teacherFeedback
            }
        }
    }
}