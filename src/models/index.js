//把所有的数据都导入到这里,再一次性暴露出去

// import index from '../pages/index/model'
// import audit from '../pages/audit/model'
import addUsers from '../pages/addUsers/model'
import common from '../models/common'

export default [
    common,
    addUsers
]

// export default [
//     index, audit, common, leave
// ]