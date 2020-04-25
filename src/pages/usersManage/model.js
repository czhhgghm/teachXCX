import { 
    getStudentsList,
    getTeachersList,
    getManagersList,
    getFamilyList
 } from './service'

export default {
    namespace: 'usersManage',
    state: {
        studentList: [],
        teacherList: [],
        managerList: [],
        familyList: []
    },
    
    effects: {
        *getStudentsList({payload},{call,put}) {
            const response = yield call(getStudentsList,payload)
            yield put({
                type: 'saveStudentList',
                payload: {
                    studentList: response.data.reverse()
                }
            })
        },
        *getTeachersList({payload},{call,put}) {
            const response = yield call(getTeachersList,payload)
            yield put({
                type: 'saveTeacherList',
                payload: {
                    teacherList: response.data.reverse()
                }
            })
        },
        *getManagersList({payload},{call,put}) {
            const response = yield call(getManagersList,payload)
            yield put({
                type: 'saveManagerList',
                payload: {
                    managerList: response.data.reverse()
                }
            })
        },
        *getFamilyList({payload},{call,put}) {
            const response = yield call(getFamilyList,payload)
            yield put({
                type: 'saveFamilyList',
                payload: {
                    familyList: response.data.reverse()
                }
            })
        }
    },

    reducers: {
        saveStudentList(state, {payload}) {
            const { studentList } = payload
            return {
                ...state,
                studentList
            }
        },
        saveTeacherList(state, {payload}) {
            const { teacherList } = payload
            return {
                ...state,
                teacherList
            }
        },
        saveManagerList(state, {payload}) {
            const { managerList } = payload
            return {
                ...state,
                managerList
            }
        },
        saveFamilyList(state, {payload}) {
            const { familyList } = payload
            return {
                ...state,
                familyList
            }
        },
        clearManagersList(state, {payload}) {
            const { managerList } = payload
            return {
                ...state,
                managerList
            }
        },
        clearFamilyList(state, {payload}) {
            const { familyList } = payload
            return {
                ...state,
                familyList
            }
        },
        clearTeachersList(state, {payload}) {
            const { teacherList } = payload
            return {
                ...state,
                teacherList
            }
        },
        clearStudentsList(state, {payload}) {
            const { studentList } = payload
            return {
                ...state,
                studentList
            }
        },
        clearUsers(state, {payload}) {
            const { studentList, teacherList, managerList, familyList } = payload
            return {
                ...state,
                studentList,
                teacherList,
                managerList,
                familyList
            }
        }
    }
}