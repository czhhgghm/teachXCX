import { getNewAdvice, deleteAdvice } from './service'

export default {
    namespace: 'showAdvice',
    state: {
        adviceData: []
    },
    
    effects: {
        *getNewAdvice({payload},{call,put}) {
            const response = yield call(getNewAdvice,payload)
            yield put({
                type: 'saveNewAdvice',
                payload: {
                    adviceData: response.data.reverse()
                }
            })
        },
        *deleteAdvice({payload},{call}) {
            yield call(deleteAdvice,payload)
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
    }
}