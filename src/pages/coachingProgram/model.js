import { getStudents } from './service'

export default {
    namespace: 'coachingProgram',
    state: {
        studentList: []
    },
    
    effects: {
        *getStudents({payload},{call,put}) {
            const response = yield call(getStudents,payload);
            yield put({
                type: 'saveStudents',
                payload: {
                    studentList: response.data
                }
            })
        },
    },
    
    reducers: {
        saveStudents(state, {payload}) {
            const { studentList } = payload
            return {
                ...state,
                studentList
            }
        },
    }
}