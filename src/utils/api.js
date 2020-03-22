/** 
 * 得到当前的时间
 * @author davidChen 
 * @return 对象
 **/
function getCurrentTime() {
    const now = new Date()
    const year = now.getFullYear()
	const month = now.getMonth() + 1
    const date = now.getDate()
    const day = now.getDay()
    return {
        year,
        month,
        date,
        day
    }
}

/** 
 * 格式化时间
 * @author davidChen 
 * @param date 需要被处理的时间
 * @return strTime 字符串
 **/
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var strTime = year + '/' + month + '/' + day
    return strTime
}

/** 
 * 检验18位身份证号码（15位号码可以只检测生日是否正确即可） 
 * @author davidChen 
 * @param cid 18位的身份证号码 
 * @return Boolean 是否合法 
 **/
function isCnNewID(cid) {
    var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] //加权因子  
    var arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2] //校验码  
    if (/^\d{17}(\d|x)$/i.test(cid)) {
        var sum = 0,
            idx;
        for (var i = 0; i < cid.length - 1; i++) {
            // 对前17位数字与权值乘积求和  
            sum += parseInt(cid.substr(i, 1), 10) * arrExp[i]
        }
        // 计算模（固定算法）  
        idx = sum % 11
        // 检验第18为是否与校验码相等  
        return arrValid[idx] == cid.substr(17, 1).toUpperCase()
    } else {
        return false
    }
}


module.exports = {
    getCurrentTime,
    formatTime,
    isCnNewID
}