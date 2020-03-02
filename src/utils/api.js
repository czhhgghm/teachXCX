function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
	const month = now.getMonth()+1;
    const date = now.getDate();
    const day = now.getDay();
    const currentDay = year + '-' + month + '-' + date;
    return {
        year,
        month,
        date,
        day,
        currentDay
    }
}

module.exports = {
    getCurrentTime,
}