import { getSessionId, getPhone } from './service'

export default {
    namespace: 'common',
    state: {
        identityId: 0,
        avatarUrl: '',
        userName: '姓名',
        personDetails: {},
        loginCode: -1,
        grade: '高三',
        perPhone: '15626097908',
        parentPhone: '15699999999',
        coachingCourse: '语文数学英语',
        beginProject: '2019-10',
        classTime: '周日上午',
        classPlace: '高要',
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
            yield put({
                type: 'savePersonDetails',
                payload: {
                    personDetails: response.data,
                    loginCode: response.code
                }
            })
        },
    },

    reducers: {
        changeIdentityId(state, {payload}) {
            const {identityId} = payload
            return {
                ...state,
                identityId
            }
        },
        savePersonDetails(state, {payload}) {
            const {personDetails,loginCode} = payload
            return {
                ...state,
                personDetails,
                loginCode
            }
        },
        saveUserInfo(state, { payload }) {
            const { userName, avatarUrl }=payload;
            return {
              ...state,
              userName,
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