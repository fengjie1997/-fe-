import moment from 'moment-timezone'
import i18n from '@/lang'
import store from '@/store'
// 获取后台时间戳，转换当前时区的标准时间格式
export function getTime(timeStamp, timeZone, bool) {
  if (!timeStamp) {
    return '-'
  } else {
    const date = new Date(timeStamp)
    let dateZone = ''
    if (bool) {
      dateZone = moment(date).tz(timeZone).format('YYYY-MM-DD HH:mm:ss:SSS')
    } else {
      dateZone = moment(date).tz(timeZone).format('YYYY-MM-DD HH:mm:ss')
    }
    return dateZone
  }
}
// 转换时区时间
export function getTimeZone(timeZone) {
  const date = new Date()
  //  let timeZone=this.$store.getters.timezone
  const dateZone = moment(date).tz(timeZone).format('YYYY-MM-DD HH:mm:ss')
  return dateZone
  // picker.$emit('pick', date)
  // let time = "2019-01-30 11:00:00"
  // var moment1 = moment(time,'YYYY-MM-DD HH:mm:ss');
  // var time0 = moment(moment1,'YYYY-MM-DD HH:mm:ss').valueOf();获取时间戳
  // var time1 = moment(time0.format('YYYY-MM-DD HH:mm:ss'));时间戳转换格式时间
  // console.log(moment.tz(time, "America/Los_Angeles").format()); //给已知时间加上时区
  // console.log(moment(time).tz("America/Los_Angeles").format());  //转换到指定时区的时间
  // console.log(moment().tz("America/Los_Angeles").format()); //获取指定时区的当前时间
  // console.log("xx"+moment.tz.guess())			 // 如果你不知道你自己当前所在地的时区，请使用此代码查看.
  // moment.tz.setDefault("Asia/Shanghai");
}
// 时间戳转字符串
export const timestampToStr = (timestamp, format = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(timestamp).format(format)
}
// 转换时间戳
export function getTimeStamp(timeZone) {
  const timeStamp = moment(moment(timeZone, 'YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss').valueOf()
  return timeStamp
}
// 时间戳相减
export function getRemainTime(beginTime, endTime) {
  const dateBegin = new Date(beginTime)
  const dateEnd = new Date(endTime)
  const dateDiff = dateEnd.getTime() - dateBegin.getTime()// 时间差的毫秒数
  const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000))// 计算出相差天数
  const leave1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000)) // 计算相差分钟数
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000)
  return dayDiff + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
}
// 用于时区的小时差
// export function getRemainHour(beginTime, endTime) {
//   const dateBegin = new Date(beginTime)
//   const dateEnd = new Date(endTime)
//   const dateDiff = dateEnd.getTime() - dateBegin.getTime()// 时间差的毫秒数
//   const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000))// 计算出相差天数
//   const leave1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
//   const hours = Math.floor(leave1 / (3600 * 1000))// 计算出小时数
//   // 计算相差分钟数
//   const leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
//   const minutes = Math.floor(leave2 / (60 * 1000)) // 计算相差分钟数
//   // 计算相差秒数
//   const leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
//   const seconds = Math.round(leave3 / 1000)
//   return dayDiff + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
// }
// 时间戳相减 天
export function getRemainTimeDay(beginTime, endTime) {
  const dateBegin = new Date(beginTime)
  const dateEnd = new Date(endTime)
  const dateDiff = dateEnd.getTime() - dateBegin.getTime()// 时间差的毫秒数
  const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000))// 计算出相差天数
  return dayDiff + '天'
}
// element-ui 时间区间
export const pickerOptions = {
  shortcuts: [{
    text: i18n.t('loginLog.week'),
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: i18n.t('loginLog.month'),
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: i18n.t('loginLog.months'),
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}

// 毫秒转换秒
export function getSecond(value) {
  return value / 1000
}
// 秒转换毫秒
export function getMillionSecond(value) {
  return value * 1000
}

// 获取两个日期之间的所有日期
// var stime = '2018-07-25'  开始日期
// var etime = '2018-08-02'  结束日期

// 获取两日期之间日期列表函数
export function getdiffdate(stime, etime) {
  // 初始化日期列表，数组
  var diffdate = []
  var i = 0
  // 开始日期小于等于结束日期,并循环
  while (stime <= etime) {
    diffdate[i] = stime

    // 获取开始日期时间戳
    var stime_ts = new Date(stime).getTime()
    // console.log('当前日期：' + stime + '当前时间戳：' + stime_ts)

    // 增加一天时间戳后的日期
    var next_date = stime_ts + (24 * 60 * 60 * 1000)

    // 拼接年月日，这里的月份会返回（0-11），所以要+1
    var next_dates_y = new Date(next_date).getFullYear() + '-'
    var next_dates_m = (new Date(next_date).getMonth() + 1 < 10) ? '0' + (new Date(next_date).getMonth() + 1) + '-' : (new Date(next_date).getMonth() + 1) + '-'
    var next_dates_d = (new Date(next_date).getDate() < 10) ? '0' + new Date(next_date).getDate() : new Date(next_date).getDate()

    stime = next_dates_y + next_dates_m + next_dates_d

    // 增加数组key
    i++
  }
  return diffdate
}

export const timeRange = [{ label: '00:00', value: 0 }, { label: '00:30', value: 1 }, { label: '01:00', value: 2 }, { label: '01:30', value: 3 }, { label: '02:00', value: 4 }, { label: '02:30', value: 5 }, { label: '03:00', value: 6 }, { label: '03:30', value: 7 }, { label: '04:00', value: 8 }, { label: '04:30', value: 9 }, { label: '05:00', value: 10 }, { label: '05:30', value: 11 }, { label: '06:00', value: 12 }, { label: '06:30', value: 13 }, { label: '07:00', value: 14 }, { label: '07:30', value: 15 }, { label: '08:00', value: 16 }, { label: '08:30', value: 17 }, { label: '09:30', value: 18 }, { label: '10:00', value: 19 }, { label: '10:30', value: 20 }, { label: '11:00', value: 21 }, { label: '11:30', value: 22 }, { label: '12:00', value: 23 }, { label: '12:30', value: 24 },
  { label: '13:00', value: 25 }, { label: '13:30', value: 26 }, { label: '14:00', value: 27 }, { label: '14:30', value: 28 }, { label: '15:00', value: 29 }, { label: '15:30', value: 30 }, { label: '16:00', value: 31 }, { label: '16:30', value: 32 }, { label: '17:00', value: 33 }, { label: '17:30', value: 34 }, { label: '18:00', value: 35 }, { label: '18:30', value: 36 }, { label: '19:00', value: 37 }, { label: '19:30', value: 38 }, { label: '20:00', value: 39 }, { label: '20:30', value: 40 }, { label: '21:00', value: 41 }, { label: '21:30', value: 42 }, { label: '22:00', value: 43 }, { label: '22:30', value: 44 }, { label: '23:00', value: 45 }, { label: '23:30', value: 46 }, { label: '23:59', value: 47 }]

// 关于时区的转换，找不到具体的方法，只能根据时区和utc的小时差做加减法
/**
 * @param time 小时 {number}
 * @param ToUTC true/false{转UTC/转local时区}
 * @returns {number|*}
 */
export function getTimeZoneDiff(time, ToUTC) {
  const localHour = Number(getTimeZone(store.getters.timezone).substring(11, 13))
  const localDay = Number(getTimeZone(store.getters.timezone).substring(0, 10).replace('-', '').replace('-', ''))
  const UTCHour = Number(getTimeZone('Africa/Accra').substring(11, 13))
  const UTCDay = Number(getTimeZone('Africa/Accra').substring(0, 10).replace('-', '').replace('-', ''))
  console.log(getTimeZone(store.getters.timezone), getTimeZone('Africa/Accra'), localHour, UTCHour, localDay, UTCDay)
  let timeZoneDiff = ''
  if (localDay > UTCDay) {
    timeZoneDiff = 24 - UTCHour + localHour
  } else {
    timeZoneDiff = localHour - UTCHour
  }
  if (ToUTC) {
    const utc = time - timeZoneDiff
    if (utc < 0) {
      return 24 + utc
    } else {
      return utc
    }
  } else {
    const utc = time + timeZoneDiff
    if (utc >= 24) {
      return (utc - 24)
    } else {
      return utc
    }
  }
}
// 小时的格式
export function getHours(time) {
  let hour = ''
  if (time < 10) {
    hour = '0' + time.toString()
    return hour
  } else {
    hour = time.toString()
    return hour
  }
}
