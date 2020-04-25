import { updateManager, updateFamily, updateStudent, updateTeacher } from './service'

export default {
    namespace: 'changeUserInformation',
    state: {},
    
    effects: {
        *updateManager({payload},{call}) {
            yield call(updateManager,payload)
        },
        *updateFamily({payload},{call}) {
            yield call(updateFamily,payload)
        },
        *updateStudent({payload},{call}) {
            yield call(updateStudent,payload)
        },
        *updateTeacher({payload},{call}) {
            yield call(updateTeacher,payload)
        }
    },
    
    reducers: {}
}