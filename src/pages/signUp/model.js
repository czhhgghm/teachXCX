import { 
    addRecommand,
    getRecommandList,
    reviewRecommand
 } from './service'

export default {
    namespace: 'signUp',
    state: {
        recommandList: [],
        addRecommandCode: -1
    },
    effects: {
        *addRecommand({payload},{call,put}) {
            const response = yield call(addRecommand,payload)
            yield put({
                type: 'saveAddRecommandCode',
                payload: {
                    addRecommandCode: response.code
                }
            })
        },
        *getRecommandList({payload},{call,put}) {
            const response = yield call(getRecommandList,payload)
            yield put({
                type: 'saveRecommandList',
                payload: {
                    recommandList: response.data
                }
            })
        },
        *reviewRecommand({payload},{call,put}) {
            const response = yield call(reviewRecommand,payload)
        }
    },

    reducers: {
        saveRecommandList(state, {payload}) {
            const { recommandList } = payload
            return {
                ...state,
                recommandList
            }
        },
        saveAddRecommandCode(state, {payload}) {
            const { addRecommandCode } = payload
            return {
                ...state,
                addRecommandCode
            }
        }
    }
}