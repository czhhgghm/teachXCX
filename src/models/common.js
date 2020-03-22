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
        nickName: '',
        personName: '',
        userId: -1,
        loginCode: -1,
        id: -1,
        adviceData: []
    },
    
    effects: {
        *getSessionId({payload},{call}) {
            const response = yield call(getSessionId,payload)
            wx.setStorageSync('sessionKey', response.data.sessionKey)
            wx.setStorageSync('openid', response.data.openid)
        },
        *getPhone({payload},{call,put}) {
            const response = yield call(getPhone,payload)
            //将登陆信息全部保存到数据仓库并且做一次本地缓存
            if(response.code == 0) {
                const result = response.data
                wx.setStorageSync('userId', result.userId)
                wx.setStorageSync('authen', result.authen)
                wx.setStorageSync('name', result.name)
                wx.setStorageSync('id', result.id)
                wx.setStorageSync('code', response.code + 10)
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
                        loginCode: response.code + 10
                    }
                })
            }
            else if(response.code == 11) {
                yield put({
                    type: 'saveLoginCode',
                    payload: {
                        loginCode: response.code + 10
                    }
                })
            }
        },
        *submitAdvice({payload},{call}) {
            yield call(submitAdvice,payload)
        },
        *getNewAdvice({payload},{call,put}) {
            const response = yield call(getNewAdvice)
            yield put({
                type: 'saveNewAdvice',
                payload: {
                    adviceData: response.data.reverse()
                }
            })
        },
        *addCourse({payload},{call}) {
            const response = yield call(addCourse,payload)
        },
        *removeCourse({payload},{call}) {
            const response = yield call(removeCourse,payload)
        },
    },

    reducers: {
        saveNewAdvice(state, {payload}) {
            const { adviceData } = payload
            return {
                ...state,
                adviceData
            }
        },
        changeAuthen(state, {payload}) {
            const { authen } = payload
            return {
                ...state,
                authen
            }
        },
        saveLoginCode(state, {payload}) {
            const { loginCode } = payload
            return {
                ...state,
                loginCode
            }
        },
        savePersonDetails(state, {payload}) {
            const { userId, authen, personName, id } = payload
            return {
                ...state,
                userId,
                authen,
                personName,
                id
            }
        },
        saveUserInfo(state, { payload }) {
            const { nickName, avatarUrl }=payload
            return {
              ...state,
              nickName,
              avatarUrl
            }
        }
    }
}