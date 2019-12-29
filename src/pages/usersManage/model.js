import { 
    getStudentsList,
    getTeachersList,
    getManagersList,
    getFamilyList,
    getStudentClassFB,
    getTeacherClassFB
 } from './service'

export default {
    namespace: 'usersManage',
    state: {
        studentList: [],
        teacherList: [],
        managerList: [],
        familyList: [],
    },
    
    effects: {
        *getStudentsList({payload},{call,put}) {
            const response = yield call(getStudentsList,payload);

            yield put({
                type: 'saveStudentList',
                payload: {
                    studentList: response.data
                }
            })
        },
        *getTeachersList({payload},{call,put}) {
            const response = yield call(getTeachersList,payload);

            yield put({
                type: 'saveTeacherList',
                payload: {
                    teacherList: response.data
                }
            })
        },
        *getManagersList({payload},{call,put}) {
            const response = yield call(getManagersList,payload);

            yield put({
                type: 'saveManagerList',
                payload: {
                    managerList: response.data
                }
            })
        },
        *getFamilyList({payload},{call,put}) {
            const response = yield call(getFamilyList,payload);
            
            yield put({
                type: 'saveFamilyList',
                payload: {
                    familyList: response.data
                }
            })
        },
        *getStudentClassFB({payload},{call,put}) {
            const response = yield call(getStudentClassFB,payload);
            
            // yield put({
            //     type: 'saveFamilyDetail',
            //     payload: {
            //         familyDetail: response.data
            //     }
            // })
        },
        *getTeacherClassFB({payload},{call,put}) {
            const response = yield call(getTeacherClassFB,payload);
            
        }
    },

    reducers: {
        saveStudentList(state, {payload}) {
            const {studentList} = payload
            return {
                ...state,
                studentList
            }
        },
        saveTeacherList(state, {payload}) {
            const {teacherList} = payload
            return {
                ...state,
                teacherList
            }
        },
        saveManagerList(state, {payload}) {
            const {managerList} = payload
            return {
                ...state,
                managerList
            }
        },
        saveFamilyList(state, {payload}) {
            const {familyList} = payload
            return {
                ...state,
                familyList
            }
        },
    }
}