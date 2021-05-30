/**
 * 公共校验方法
 */
// 自定义任务名
export const businessNameCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入业务名称'))
  } else {
    callback()
  }
}
// 测试次数
export const testTimesCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入测试次数'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value <= 0) {
      callback(new Error('测试次数大于0'))
    } else {
      callback()
    }
  } else {
    callback(new Error('测试次数必须数字'))
  }
}
// 间隔时长
export const testIntervalsCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入间隔时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value <= 5) {
      callback(new Error('间隔时长(s)大于5'))
    } else {
      callback()
    }
  } else {
    callback(new Error('间隔时长(s)必须数字'))
  }
}
// 测试时长
export const testDurationCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入测试时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value <= 15) {
      callback(new Error('测试时长(s)大于15'))
    } else {
      callback()
    }
  } else {
    callback(new Error('测试时长(s)必须数字'))
  }
}
// 域名/IP
export const UrlCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入域名/IP'))
  }
  const reg1 = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/i
  const reg2 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  const reg3 = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/
  if (reg1.test(value) || reg2.test(value) || reg3.test(value)) {
    callback()
  } else {
    callback(new Error('域名/IP不合法'))
  }
}
export const pkgCountCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入发送包个数'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 1 || value > 20) {
      callback(new Error('发送包个数在1-20间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送包个数必须数字'))
  }
}
/**
 *  PING
 */
// PING测试时长
export const testDurationPingCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入测试时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value > 7200 || value < 2) {
      callback(new Error('测试时长(s)在2-7200间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('测试时长(s)必须数字'))
  }
}
// PING发送包大小
export const pkgSizePingCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入发送包大小(bytes)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 16 || value > 1800) {
      callback(new Error('发送包大小(bytes)在16-1800间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送包大小(bytes)必须数字'))
  }
}
// PING发送包周期
export const pkgPeriodPingCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入发送包周期(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 0.5 || value > 5) {
      callback(new Error('发送包周期(s)在0.5-5间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送包周期(s)必须数字'))
  }
}
// PING发送包个数
export const pkgCountPingCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入发送包个数'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 1 || value > 1800) {
      callback(new Error('发送包个数在1-1800间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送包个数必须数字'))
  }
}
/**
 *  FTP
 */
// ftp测试时长
export const testDurationFtpCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入测试时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value <= 15) {
      callback(new Error('测试时长(s)大于15'))
    } else {
      callback()
    }
  } else {
    callback(new Error('测试时长(s)必须数字'))
  }
}
/**
 * 业务配置支付金额验证
 */
export const payNumberCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入支付金额(元)'))
  }
  value = Number(value)
  console.log(value)
  const reg = /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 0) {
      callback(new Error('支付金额(元)大于0'))
    } else if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('支付金额(元)必须数字或两位小数'))
    }
  } else {
    callback(new Error('支付金额(元)必须数字或两位小数'))
  }
}
/**
 * 业务配置端口验证
 */
export const portStrCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入端口'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    callback()
  } else {
    callback(new Error('端口必须数字'))
  }
}
/**
 * 业务配置skype语音时长验证
 */
export const sendSkypeVoiceSecondsCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入发送语音时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 2 || value > 120) {
      callback(new Error('发送语音时长(s)在2-120间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送语音时长(s)必须数字'))
  }
}
export const sendSkypeVideoSecondsCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入发送视频时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 2 || value > 20) {
      callback(new Error('发送视频时长(s)在2-15间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送视频时长(s)必须数字'))
  }
}
export const sendWeChatVoiceSecondsCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入发送语音时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 2 || value > 60) {
      callback(new Error('发送语音时长(s)在2-60间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送语音时长(s)必须数字'))
  }
}
export const sendWeChatVideoSecondsCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入发送视频时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 2 || value > 15) {
      callback(new Error('发送视频时长(s)在2-15间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送视频时长(s)必须数字'))
  }
}
export const timeoutCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入超时时间(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 60) {
      callback(new Error('超时时间(s)大于或等于60'))
    } else {
      callback()
    }
  } else {
    callback(new Error('超时时间(s)必须数字'))
  }
}
export const dialSecondsCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入语音拨打时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value <= 10) {
      callback(new Error('语音拨打时长(s)大于10'))
    } else {
      callback()
    }
  } else {
    callback(new Error('语音拨打时长(s)必须数字'))
  }
}
export const callNameCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入被叫用户'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    callback()
  } else {
    callback(new Error('被叫用户必须数字'))
  }
}
export const tencentNewsTimeoutCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入超时时间(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 30) {
      callback(new Error('超时时间(s)大于或等于30'))
    } else {
      callback()
    }
  } else {
    callback(new Error('超时时间(s)必须数字'))
  }
}

export const gameTimeoutCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入超时时间(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 120) {
      callback(new Error('超时时间(s)大于120s'))
    } else {
      callback()
    }
  } else {
    callback(new Error('超时时间(s)必须数字'))
  }
}

export const pkgSizeCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入发送包大小(bytes)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 1 || value > 65535) {
      callback(new Error('发送包大小(bytes)在1-65535间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送包大小(bytes)必须数字'))
  }
}
export const pkgPeriodCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入发送包周期(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 0.5 || value > 5) {
      callback(new Error('发送包周期(s)在0.5-5间'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送包周期(s)必须数字'))
  }
}
export const refreshTimesCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入动作执行次数'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value <= 0) {
      callback(new Error('动作执行次数大于0'))
    } else {
      callback()
    }
  } else {
    callback(new Error('动作执行次数必须数字'))
  }
}
export const clearCacheTimesCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入删除缓存间隔次数'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value <= 0) {
      callback(new Error('删除缓存间隔次数大于0'))
    } else {
      callback()
    }
  } else {
    callback(new Error('删除缓存间隔次数必须数字'))
  }
}
export const selectActionCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择动作'))
  } else {
    callback()
  }
}
export const sendFileTimeoutCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入发送文件超时时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 30) {
      callback(new Error('发送文件超时时长(s)大于或等于30'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送文件超时时长(s)必须数字'))
  }
}

export const sendTextCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入发送文本'))
  }
  const reg1 = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
  const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
  const reg2 = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
  if (reg1.test(value) || reg.test(value) || reg2.test(value)) {
    callback(new Error('不能输入中文及中文格式字符'))
  } else {
    callback()
  }
}

export const payPasswordCheck = (rule, value, callback) => {
  const reg1 = /^\d{6}$/
  const reg2 = /^\+?[1-9][0-9]*$/
  if (!reg1.test(value) || !reg2.test(value)) {
    callback(new Error('请输入6位数字支付密码'))
  } else {
    callback()
  }
}

export const sendBandwidthCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入发送带宽(Mbps)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value > 0) {
      callback()
    } else {
      callback(new Error('发送带宽(Mbps)必须大于0'))
    }
  } else {
    callback(new Error('发送带宽(Mbps)必须数字'))
  }
}

export const pingTestSelectCheck = (rule, value, callback) => {
  if (value === true || value === false) {
    callback()
  } else {
    callback(new Error('请选择是否进行PING测试'))
  }
}

export const testTypeCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择测试类型'))
  } else {
    callback()
  }
}

export const threadCountCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入线程数量'))
  }
  const re = /^[0-9]+$/
  if (re.test(value) && value > 0) {
    callback()
  } else {
    callback(new Error('线程数量必须正整数'))
  }
}

export const videoUrlCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入URL地址'))
  } else {
    callback()
  }
}

export const pingServeripCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择PING服务器'))
  } else {
    callback()
  }
}

export const httpWebCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择或自定义测试网站'))
  } else {
    callback()
  }
}

export const calledNameCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入好友名称'))
  } else {
    callback()
  }
}

export const videoQualityCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择视频质量'))
  } else {
    callback()
  }
}

export const sendImgQualityCheck = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请选择发送图片大小'))
  } else {
    callback()
  }
}

export const videoSizeCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入发送视频时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 2 || value > 20) {
      callback(new Error('发送视频时长(s)范围为2-20'))
    } else {
      callback()
    }
  } else {
    callback(new Error('发送视频时长(s)必须数字'))
  }
}

export const playSecondSCheck = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入播放时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 10) {
      callback(new Error('播放时长(s)需要大于或等于10'))
    } else {
      callback()
    }
  } else {
    callback(new Error('播放时长(s)必须数字'))
  }
}

export const noFlowTimeoutSCheck = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback(new Error('请输入无流量超时(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 0) {
      callback(new Error('无流量超时(s)需要大于或等于0'))
    } else {
      callback()
    }
  } else {
    callback(new Error('无流量超时(s)必须数字'))
  }
}

export const bufferMaxTimesCheck = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback(new Error('请输入最大卡顿次数'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 0) {
      callback(new Error('最大卡顿次数大于或等于0'))
    } else {
      callback()
    }
  } else {
    callback(new Error('最大卡顿次数必须数字'))
  }
}

export const bufferMaxTimeXCheck = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback(new Error('请输入最大卡顿时长(s)'))
  }
  value = Number(value)
  if (typeof value === 'number' && !isNaN(value)) {
    if (value < 0) {
      callback(new Error('最大卡顿时长大于或等于0'))
    } else {
      callback()
    }
  } else {
    callback(new Error('最大卡顿时长必须数字'))
  }
}

export const searchPlaceCheck = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback(new Error('请输入搜索地点'))
  } else {
    callback()
  }
}

export const downloadApkNameCheck = (rule, value, callback) => {
  if (!value && value !== 0) {
    callback(new Error('请输入下载应用名称'))
  } else {
    callback()
  }
}
export default { callNameCheck, dialSecondsCheck, downloadApkNameCheck, searchPlaceCheck, tencentNewsTimeoutCheck, testDurationFtpCheck, pkgCountPingCheck, pkgPeriodPingCheck, pkgSizePingCheck, testDurationPingCheck, gameTimeoutCheck, videoSizeCheck, sendFileTimeoutCheck, clearCacheTimesCheck, selectActionCheck, refreshTimesCheck, videoUrlCheck, videoQualityCheck, bufferMaxTimeXCheck, bufferMaxTimesCheck, noFlowTimeoutSCheck, playSecondSCheck, sendImgQualityCheck, calledNameCheck, pingServeripCheck, threadCountCheck, sendBandwidthCheck, portStrCheck, businessNameCheck, timeoutCheck, testTimesCheck, testIntervalsCheck, UrlCheck, testDurationCheck, pkgCountCheck, pkgPeriodCheck, pkgSizeCheck, sendWeChatVideoSecondsCheck, sendWeChatVoiceSecondsCheck, sendSkypeVideoSecondsCheck, sendSkypeVoiceSecondsCheck, payNumberCheck, sendTextCheck, payPasswordCheck, httpWebCheck }
