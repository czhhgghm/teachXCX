import { 
    getStudentsList,
    getStudentsListPage,
    getTeachersList,
    getTeachersListPage,
    getManagersList,
    getManagersListPage,
    getFamilyList,
    getFamilyListPage
 } from './service'

export default {
    namespace: 'usersManage',
    state: {
        studentList: [],
        studentPage: [],
        teacherList: [],
        teacherPage: [],
        managerList: [],
        managerPage: [],
        familyList: [],
        familyPage: [],
        managerTotal: 80,
        studentTotal: 80,
        familyTotal: 80,
        teacherTotal: 80,
        managerCurrent: 1,
        studentCurrent: 1,
        familyCurrent: 1,
        teacherCurrent: 1
    },
    
    effects: {
        *getStudentsList({payload},{call,put}) {
            const response = yield call(getStudentsList,payload)
            yield put({
                type: 'saveStudentList',
                payload: {
                    studentList: response.data,
                    studentTotal: response.data.length
                }
            })
        },
        *getStudentsListPage({payload},{call,put}) {
            const response = yield call(getStudentsListPage,payload)
            yield put({
                type: 'saveStudentListPage',
                payload: {
                    studentPage: response.data,
                }
            })
        },
        *getTeachersList({payload},{call,put}) {
            const response = yield call(getTeachersList,payload)
            yield put({
                type: 'saveTeacherList',
                payload: {
                    teacherList: response.data,
                    teacherTotal: response.data.length
                }
            })
        },
        *getTeachersListPage({payload},{call,put}) {
            const response = yield call(getTeachersListPage,payload)
            yield put({
                type: 'saveTeacherListPage',
                payload: {
                    teacherPage: response.data
                }
            })
        },
        *getManagersList({payload},{call,put}) {
            const response = yield call(getManagersList,payload)
            yield put({
                type: 'saveManagerList',
                payload: {
                    managerList: response.data,
                    managerTotal: response.data.length
                }
            })
        },
        *getManagersListPage({payload},{call,put}) {
            const response = yield call(getManagersListPage,payload)
            yield put({
                type: 'saveManagerListPage',
                payload: {
                    managerPage: response.data
                }
            })
        },
        *getFamilyList({payload},{call,put}) {
            const response = yield call(getFamilyList,payload)
            yield put({
                type: 'saveFamilyList',
                payload: {
                    familyList: response.data,
                    familyTotal: response.data.length
                }
            })
        },
        *getFamilyListPage({payload},{call,put}) {
            const response = yield call(getFamilyListPage,payload)
            yield put({
                type: 'saveFamilyListPage',
                payload: {
                    familyPage: response.data
                }
            })
        }
    },

    reducers: {
        saveStudentList(state, {payload}) {
            const { studentList, studentTotal } = payload
            return {
                ...state,
                studentList,
                studentTotal
            }
        },
        saveStudentListPage(state, {payload}) {
            const { studentPage } = payload
            return {
                ...state,
                studentPage
            }
        },
        saveTeacherList(state, {payload}) {
            const { teacherList, teacherTotal } = payload
            return {
                ...state,
                teacherList,
                teacherTotal
            }
        },
        saveTeacherListPage(state, {payload}) {
            const { teacherPage } = payload
            return {
                ...state,
                teacherPage
            }
        },
        saveManagerList(state, {payload}) {
            const { managerList, managerTotal } = payload
            return {
                ...state,
                managerList,
                managerTotal
            }
        },
        saveManagerListPage(state, {payload}) {
            const { managerPage } = payload
            return {
                ...state,
                managerPage
            }
        },
        saveFamilyList(state, {payload}) {
            const { familyList, familyTotal } = payload
            return {
                ...state,
                familyList,
                familyTotal
            }
        },
        saveFamilyListPage(state, {payload}) {
            const { familyPage } = payload
            return {
                ...state,
                familyPage
            }
        },
        clearManagersList(state, {payload}) {
            const { managerList, managerPage } = payload
            return {
                ...state,
                managerList,
                managerPage
            }
        },
        clearFamilyList(state, {payload}) {
            const { familyList, familyPage } = payload
            return {
                ...state,
                familyList,
                familyPage
            }
        },
        clearTeachersList(state, {payload}) {
            const { teacherList, teacherPage } = payload
            return {
                ...state,
                teacherList,
                teacherPage
            }
        },
        clearStudentsList(state, {payload}) {
            const { studentList, studentPage } = payload
            return {
                ...state,
                studentList,
                studentPage
            }
        },
        changeStudentCurrent(state, {payload}) {
            const { studentCurrent } = payload
            return {
                ...state,
                studentCurrent
            }
        },
        changeManagerCurrent(state, {payload}) {
            const { managerCurrent } = payload
            return {
                ...state,
                managerCurrent
            }
        },
        changeFamilyCurrent(state, {payload}) {
            const { familyCurrent } = payload
            return {
                ...state,
                familyCurrent
            }
        },
        changeTeacherCurrent(state, {payload}) {
            const { teacherCurrent } = payload
            return {
                ...state,
                teacherCurrent
            }
        }
    }
}