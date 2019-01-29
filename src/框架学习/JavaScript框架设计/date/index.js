//大致有四种构造器的使用方法
// new Date()
// new Date(value)
// new Date(dateString)
// new Date(Year, Month, Day, ?hour, ?minute, ?second, ?millisecond)

//getMonth比较特别，返回0-11

/**
 * 两个日期相隔多少天
 * @param {Date} start 
 * @param {Date} end 
 */
function getDatePeriod(start, end){
    //date * 1转换成时间戳
    return Math.abs(start*1 - end*1) / 1000 / 60 / 60 / 24
}
//求出date所在月的第一天
function getFirstDayInMonth(date){
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

function getLastDayInMonth(date){
    return new Date(date.getFullYear(), date.getMonth()+1, 0)
}

//求出所在季度的第一天
function getFirstDayInQuarter(date){
    return new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3, 1)
}

function getLastDayInQuarter(date){
    return new Date(date.getFullYear(), ~~(date.getMonth() / 3) * 3 + 3, 0)
}

//判断闰年
function isLeapYear(date){
    let y = date.getFullYear()
    return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0
}

function isLeapYear2(date){
    return new Date(date.getFullYear(), 2, 0).getDate() === 29
}

//取得当前月份的天数
function getDaysInMonth(date){
    const dayInMonths = [31, 28, 31, 30, 31, 30,  31, 31, 30, 31, 30, 31], m = date.getMonth()
    return  m === 1 && isLeapYear(date) ? 29 : dayInMonths[m]
}

function getDaysInMonth2(date){
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

