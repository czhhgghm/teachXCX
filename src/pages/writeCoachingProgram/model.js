import { 
    checkGuidance,
    addGuidance,
    getPendingList,
    getPassList,
    getPersonGuidance,
    passGuidance,
    rejectGuidance,
    updateGuidance
 } from './service'

export default {
    namespace: 'writeCoachingProgram',
    state: {
        guidanceResponse: '',
        pendingList: [],
        passList: [],
        personGuidance: []
    },
    
    effects: {
        *checkGuidance({payload},{call,put}) {
            const response = yield call(checkGuidance,payload);
            const guidanceResponse = {
                guidanceID: response.data.state !== 0 ? response.data.guidance.id : '',
                state: response.data.state,
                text: response.data.state !== 0 ? response.data.guidance.text : ''
            }
            yield put({
                type: 'saveGuidance',
                payload: {
                    guidanceResponse
                }
            })
        },
        *addGuidance({payload},{call,put}) {
            const response = yield call(addGuidance,payload);
        },
        *updateGuidance({payload},{call,put}) {
            const response = yield call(updateGuidance,payload);
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
        *getPersonGuidance({payload},{call,put}) {
            const response = yield call(getPersonGuidance,payload);
            yield put({
                type: 'savePersonGuidance',
                payload: {
                    personGuidance: response.data
                }
            })
        },
        *passGuidance({payload},{call,put}) {
            const response = yield call(passGuidance,payload);
        },
        *rejectGuidance({payload},{call,put}) {
            const response = yield call(rejectGuidance,payload);
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
        },
        savePersonGuidance(state, {payload}) {
            const {personGuidance} = payload
            return {
                ...state,
                personGuidance
            }
        }
    }
}