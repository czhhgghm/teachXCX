import { updateManager, updateFamily, updateStudent, updateTeacher } from './service'

export default {
    namespace: 'changeUserInformation',
    state: {},
    
    effects: {
        *updateManager({payload},{call,put}) {
            const response = yield call(updateManager,payload)
        },
        *updateFamily({payload},{call,put}) {
            const response = yield call(updateFamily,payload)
        },
        *updateStudent({payload},{call,put}) {
            console.log('payload',payload)
            const response = yield call(updateStudent,payload)
        },
        *updateTeacher({payload},{call,put}) {
            const response = yield call(updateTeacher,payload)
        }
    },
    
    reducers: {}
}