import {getSthing} from './service'

export default {
    namespace: 'common',
    state: {
        appId: '',
        avatarUrl: '',
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
        *getSthing({payload},{call,put}) {
            //将code发送给服务端，服务端拿它与微信服务端做交互获取openid和sessionkey。
            //服务器A拿到session_key后，生成一个随机数我们叫3rd_session,将它返回给客户端,我要缓存到storage
            const response = yield call(getSthing,payload);
        }
    },

    reducers: {
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