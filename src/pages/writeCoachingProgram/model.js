import { 
    checkGuidance,
    addGuidance,
    getPendingList,
    getPassList,
    passGuidance
 } from './service'

export default {
    namespace: 'writeCoachingProgram',
    state: {
        guidanceResponse: '',
        pendingList: [],
        passList: []
    },
    
    effects: {
        *checkGuidance({payload},{call,put}) {
            const response = yield call(checkGuidance,payload);
            yield put({
                type: 'saveGuidance',
                payload: {
                    guidanceResponse: response.data
                }
            })
        },
        *addGuidance({payload},{call,put}) {
            const response = yield call(addGuidance,payload);
        },
        *getPendingList({payload},{call,put}) {
            const response = yield call(getPendingList,payload);
            yield put({
                type: 'savePendingList',
                payload: {
                    pendingList: response.data.reverse()
                }
            })
        },
        *getPassList({payload},{call,put}) {
            const response = yield call(getPassList,payload);
            yield put({
                type: 'savePassList',
                payload: {
                    passList: response.data.reverse()
                }
            })
        },
        *passGuidance({payload},{call,put}) {
            const response = yield call(passGuidance,payload);
        }
    },

    reducers: {
        saveGuidance(state, {payload}) {
            const {guidanceResponse} = payload
            return {
                ...state,
                guidanceResponse
            }
        },
        savePendingList(state, {payload}) {
            const {pendingList} = payload
            return {
                ...state,
                pendingList
            }
        },
        savePassList(state, {payload}) {
            const {passList} = payload
            return {
                ...state,
                passList
            }
        }
    }
}