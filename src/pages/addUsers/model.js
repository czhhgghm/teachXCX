import { addStudent, addFamily, addTeacher } from './service'

export default {
    namespace: 'addUsers',
    state: {},
    
    effects: {
        *addStudent({payload},{call,put}) {
            const response = yield call(addStudent,payload);
        },

        *addFamily({payload},{call,put}) {
            const response = yield call(addFamily,payload);
        },

        *addTeacher({payload},{call,put}) {
            const response = yield call(addTeacher,payload);
        }
    },

    reducers: {}
}