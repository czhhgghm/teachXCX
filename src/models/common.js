import {
    getSessionId,
    getPhone,
    submitAdvice,
    getNewAdvice,
    addCourse,
    removeCourse
} from './service'

export default {
    namespace: 'common',
    state: {
        authen: '',
        avatarUrl: '',
        netName: '网名',
        personName: '真实姓名',
        userId: -1,
        loginCode: -1,
        perPhone: '15612345678',
        parentPhone: '13312345678',
        coachingCourse: '语文数学英语',
        beginProject: '2019-01-01',
        classTime: '周日上午',
        classPlace: '广州',
        id: -1,
        adviceData: []
    },
    
    effects: {
        *getSessionId({payload},{call}) {
            const response = yield call(getSessionId,payload);
            wx.setStorageSync('sessionKey', response.data.sessionKey)
            wx.setStorageSync('openid', response.data.openid)
        },
        *getPhone({payload},{call,put}) {
            const response = yield call(getPhone,payload)
            if(response.code == 0) {
                const result = response.data
                yield put({
                    type: 'savePersonDetails',
                    payload: {
                        userId: result.userId,
                        authen: result.authen,
                        personName: result.name,
                        id: result.id
                    }
                })
                yield put({
                    type: 'saveLoginCode',
                    payload: {
                        loginCode: response.code,
                    }
                })
            }
            else if(response.code == 11) {
                yield put({
                    type: 'saveLoginCode',
                    payload: {
                        loginCode: response.code,
                    }
                })
            }
        },
        *submitAdvice({payload},{call}) {
            yield call(submitAdvice,payload);
        },
        *getNewAdvice({payload},{call,put}) {
            const response = yield call(getNewAdvice);
            yield put({
                type: 'saveNewAdvice',
                payload: {
                    adviceData: response.data.reverse()
                }
            })
        },
        *addCourse({payload},{call}) {
            const response = yield call(addCourse,payload);
        },
        *removeCourse({payload},{call}) {
            const response = yield call(removeCourse,payload);
        },
    },

    reducers: {
        saveNewAdvice(state, {payload}) {
            const {adviceData} = payload
            return {
                ...state,
                adviceData
            }
        },
        changeAuthen(state, {payload}) {
            const {authen} = payload
            return {
                ...state,
                authen
            }
        },
        saveLoginCode(state, {payload}) {
            const {loginCode} = payload
            return {
                ...state,
                loginCode
            }
        },
        savePersonDetails(state, {payload}) {
            const {userId,authen,personName,id} = payload
            return {
                ...state,
                userId,
                authen,
                personName,
                id
            }
        },
        saveUserInfo(state, { payload }) {
            const { netName, avatarUrl }=payload;
            return {
              ...state,
              netName,
              avatarUrl
            }
        },
        changePerPhone(state,{payload}) {
            const {perPhone} = payload
            return {
                ...state,
                perPhone
            }
        },
        changeParentPhone(state,{payload}) {
            const {parentPhone} = payload
            return {
                ...state,
                parentPhone
            }
        },
        changeClassTime(state,{payload}) {
            const {classTime} = payload
            return {
                ...state,
                classTime
            }
        },
        changeClassPlace(state,{payload}) {
            const {classPlace} = payload
            return {
                ...state,
                classPlace
            }
        },
    }
}