import {getSessionId,getPhone} from './service'
import Taro from '@tarojs/taro'

export default {
    namespace: 'common',
    state: {
        appId: '',
        avatarUrl: '',
        phone: '',
        userName: '姓名',
        grade: '高三',
        perPhone: '15626097908',
        parentPhone: '15699999999',
        coachingCourse: '语文数学英语',
        beginProject: '2019-10',
        classTime: '周日上午',
        classPlace: '高要',
        studySituation: '补基础'
    },
    
    effects: {
        *getAppId({payload},{call,put}) {
            const accountInfo = accountInfo ? accountInfo:wx.getAccountInfoSync();
            yield put({
                type: 'saveAppId',
                payload: {
                    appId: accountInfo.miniProgram.appId
                }
            }) 
        },
        *getSessionId({payload},{call,put}) {
            // console.log('用于请求sessionKey的数据',payload)
            const response = yield call(getSessionId,payload);
            // console.log('发送code得到的响应',response)
            Taro.setStorage({ key: 'sessionKey', data: response.data })
        },
        *getPhone({payload},{call,put}) {
            console.log('用于请求电话的数据',payload)
            const response = yield call(getPhone,payload);
            console.log('获取的电话数据',response)
            yield put({
                type: 'savePhone',
                payload: {
                    phone: response.data
                }
            }) 
        },

    },

    reducers: {
        savePhone(state, {payload}) {
            const {phone} = payload
            return {
                ...state,
                phone
            }
        },
        saveAppId(state, {payload}) {
            const {appId} = payload
            return {
                ...state,
                appId
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
        changeUserName(state,{payload}) {
            const {userName} = payload
            return {
                ...state,
                userName
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
        changeCoachingCourse(state,{payload}) {
            const {coachingCourse} = payload
            return {
                ...state,
                coachingCourse
            }
        },
        changeBeginProject(state,{payload}) {
            const {beginProject} = payload
            return {
                ...state,
                beginProject
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
        changeStudySituation(state,{payload}) {
            const {studySituation} = payload
            return {
                ...state,
                studySituation
            }
        },
    }
}