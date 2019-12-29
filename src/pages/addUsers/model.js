import { addStudent, addFamily, addTeacher } from './service'

export default {
    namespace: 'addUsers',
    state: {},
    
    effects: {
        *addStudent({payload},{call,put}) {
            const response = yield call(addStudent,payload);
            console.log('addStudent得到的结果',response)
        },

        *addFamily({payload},{call,put}) {
            const response = yield call(addFamily,payload);
            console.log('addFamily得到的结果',response)
        },

        *addTeacher({payload},{call,put}) {
            const response = yield call(addTeacher,payload);
            console.log('addTeacher得到的结果',response)
        }
    },

    reducers: {}
}