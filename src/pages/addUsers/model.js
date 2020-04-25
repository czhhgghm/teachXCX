import { addStudent, addFamily, addTeacher, addManager } from './service'

export default {
    namespace: 'addUsers',
    state: {},
    
    effects: {
        *addStudent({payload},{call}) {
            yield call(addStudent,payload)
        },

        *addFamily({payload},{call}) {
            yield call(addFamily,payload)
        },

        *addTeacher({payload},{call}) {
            yield call(addTeacher,payload)
        },

        *addManager({payload},{call}) {
            yield call(addManager,payload)
        }
    },
    
    reducers: {}
}