import { submitAdvice } from './service'

export default {
    namespace: 'advice',
    state: {},
    
    effects: {
        *submitAdvice({payload},{call}) {
            yield call(submitAdvice,payload)
        },
    },
    
    reducers: {}
}