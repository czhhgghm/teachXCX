import { getSessionId, getPhone } from './service'

export default {
    namespace: 'common',
    state: {
        authen: '管理员',
        avatarUrl: '',
        netName: '网名',
        personName: '真实姓名',
        id: -1,
        loginCode: -1,
        grade: '高三',
        perPhone: '15612345678',
        parentPhone: '13312345678',
        coachingCourse: '语文数学英语',
        beginProject: '2019-01-01',
        classTime: '周日上午',
        classPlace: '广州',
    },
    
    effects: {
        *getSessionId({payload},{call,put}) {
            const response = yield call(getSessionId,payload);
            wx.setStorageSync('sessionKey', response.data.sessionKey)
            wx.setStorageSync('openid', response.data.openid)
            console.log('用得到的code,换取服务端rdSessionId和openid,保存到Storage里面了')
        },
        *getPhone({payload},{call,put}) {
            const response = yield call(getPhone,payload);
            const result = response.data
            console.log('getPhone接口的结果',result)
            yield put({
                type: 'savePersonDetails',
                payload: {
                    loginCode: response.code,
                    id: result.id,
                    authen: result.authen,
                    personName: result.name
                }
            })
        },
    },

    reducers: {
        changeAuthen(state, {payload}) {
            const {authen} = payload
            return {
                ...state,
                authen
            }
        },
        savePersonDetails(state, {payload}) {
            const {id,loginCode,authen,personName} = payload
            return {
                ...state,
                id,
                loginCode,
                authen,
                personName
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