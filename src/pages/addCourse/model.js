import { addCourse, removeCourse } from './service'

export default {
    namespace: 'course',
    state: {},
    
    effects: {
        *addCourse({payload},{call}) {
            yield call(addCourse,payload)
        },
        *removeCourse({payload},{call}) {
            yield call(removeCourse,payload)
        }
    },
    
    reducers: {}
}