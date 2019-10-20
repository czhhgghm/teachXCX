import {getSthing} from './service'

export default {
    namespace: 'common',
    state: {
        appId: '',
        userName: '刘德华',
        grade: '高三',
        perPhone: '10086',
        parentPhone: '10086886',
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