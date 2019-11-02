import {getSessionId,getPhone} from './service'
import Taro from '@tarojs/taro'

export default {
    namespace: 'common',
    state: {
        avatarUrl: '',
        userName: '姓名',
        iv: '',
        encryptedData: '',
        phone: '',
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
        *getSessionId({payload},{call,put}) {
            const response = yield call(getSessionId,payload);
            Taro.setStorage({ key: 'sessionKey', data: response.data })
        },
        *getPhone({payload},{call,put}) {
            const response = yield call(getPhone,payload);
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
        saveGetPhoneDatas(state, {payload}) {
            const {iv,encryptedData} = payload
            return {
                ...state,
                iv,
                encryptedData
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