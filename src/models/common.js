import { getSessionId, getPhone, loginWithOpenid, loginWithPhone } from './service'
import Taro from '@tarojs/taro'

export default {
    namespace: 'common',
    state: {
        identityId: 0,
        avatarUrl: '',
        userName: '姓名',
        phone: '',
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
            wx.setStorageSync('phone', response.data)
            console.log('getPhone接口得到的结果:',response)
            console.log('getPhone接口得到的结果可能都需要保存到本地,或者后续重新请求这个结果')
            yield put({
                type: 'savePhoneAndLogin',
                payload: {
                    phone: response.data,
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
        savePhoneAndLogin(state, {payload}) {
            const {phone} = payload
            return {
                ...state,
                phone,
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