// common rule
import { commonTask } from './common/commonTask.js'
// voice
import { taskMoc } from './voice/moc'
import { taskMtc } from './voice/mtc'
// dataTransfer
import { taskDataTransfer } from './dataTransfer/dataTransfer'
// ftp
import { taskFtpUpload } from './data/ftp/ftpUpload'
import { taskFtpDownload } from './data/ftp/ftpDownload'
import { taskMultiFtpUpload } from './data/ftp/mftpUp/index'
import { taskMultiFtpDownload } from './data/ftp/mftpDown/index'
// http
import { taskHttpPage } from './data/http/httpPage'
import { taskHttpUpload } from './data/http/httpUpload'
import { taskHttpDownload } from './data/http/httpDownload'
import { taskMultiHttpDownload } from './data/http/multiHttpDownload'
// video
import { taskVideoPlay } from './data/video/videoPlay'
import { taskVideoTelephony } from './data/video/videoTelephony'
// data other
import { taskAttach } from './data/attach'
import { taskPdpActive } from './data/pdpActive'
import { taskPPP } from './data/ppp'
import { taskPing } from './data/ping/ping'
import { taskPbm } from './data/pbm/pbm'
import { taskDns } from './data/dns'
import { taskSpeed } from './data/speed'
import { taskTracert } from './data/tracert'
import { taskIperf } from './data/iPerf'
import { taskFacebook } from './data/facebook'
import { taskSkype } from './data/skype'
import { taskUdp } from './data/udp'
import { taskOpenSignal } from './data/openSignal'
import { taskBass } from './data/bass'
import { taskIdt } from './data/idt'
// idle
import { taskIdle } from './idle/idle'
// parallel
import { taskParallel } from './parallel/parallel'
// increment
import { taskUssd } from './increment/ussd'
import { taskTwitterapp } from './increment/twitterapp'
import { taskInstagram } from './increment/instagram'
import { taskFacebookapp } from './increment/facebookapp'
import { taskMmsSend } from './increment/mms/mmsSend'
import { taskMmsSelf } from './increment/mms/mmsSelf'
import { taskMmsReceive } from './increment/mms/mmsReceive'
import { taskSmsSend } from './increment/sms/smsSend'
import { taskSmsSelf } from './increment/sms/smsSelf'
import { taskSmsReceive } from './increment/sms/smsReceive'
import { taskWapPage } from './increment/wap/wapPage'
import { taskWapDownload } from './increment/wap/wapDownload'
import { taskWhatsApp } from './increment/whatsapp/whatsapp'
import { taskWhatsAppMoc } from './increment/whatsapp/whatsappMoc'
import { taskWhatsAppMtc } from './increment/whatsapp/whatsappMtc'
// scanner
import { taskCwScanner } from './scanner/cwScanner'
import { taskSpectrumScanner } from './scanner/spectrumScanner'
import { taskBlindScanner } from './scanner/blindScanner'
import { taskGsmScanner } from './scanner/gsmScanner'
import { taskCdmaScanner } from './scanner/cdmaScanner'
import { taskWcdmaScanner } from './scanner/wcdmaScanner'
import { taskTdscdmaScanner } from './scanner/tdscdmaScanner'
import { taskLteScanner } from './scanner/lteScanner'
import { taskNbScanenr } from './scanner/nbScanner'
// import {}
// task rule list
var taskRules = [
  {
    name: 'moc',
    type: 'MOC',
    task: taskMoc
  },
  {
    name: 'mtc',
    type: 'MTC',
    task: taskMtc
  },
  {
    name: 'dataTransfer',
    type: 'Data Transfer',
    task: taskDataTransfer
  },
  {
    name: 'videoPlay',
    type: 'Video Play',
    task: taskVideoPlay
  },
  {
    name: 'videoTelephony',
    type: 'Video Telephony',
    task: taskVideoTelephony
  },
  {
    name: 'ftpUpload',
    type: 'FTP Upload',
    task: taskFtpUpload
  },
  {
    name: 'ftpDownload',
    type: 'FTP Download',
    task: taskFtpDownload
  },
  {
    name: 'multiFtpUpload',
    type: 'Multi-FTP Upload',
    task: taskMultiFtpUpload
  },
  {
    name: 'multiFtpDownload',
    type: 'Multi-FTP Download',
    task: taskMultiFtpDownload

  },
  {
    name: 'httpPage',
    type: 'HTTP Page',
    task: taskHttpPage
  },
  {
    name: 'httpUpload',
    type: 'HTTP Upload',
    task: taskHttpUpload
  },
  {
    name: 'httpDownload',
    type: 'HTTP Download',
    task: taskHttpDownload
  },
  {
    name: 'multiHttpDownload',
    type: 'Multi HTTP Download',
    task: taskMultiHttpDownload
  },
  {
    name: 'attach',
    type: 'Attach',
    task: taskAttach
  },
  {
    name: 'pdpActive',
    type: 'PDP Active',
    task: taskPdpActive
  },
  {
    name: 'ppp',
    type: 'PPP',
    task: taskPPP
  },
  {
    name: 'ping',
    type: 'Ping',
    task: taskPing

  },
  {
    name: 'pbm',
    type: 'PBM',
    task: taskPbm
  },
  {
    name: 'dns',
    type: 'DNS',
    task: taskDns
  },
  {
    name: 'speed',
    type: 'SPEED',
    task: taskSpeed
  },
  {
    name: 'tracert',
    type: 'Tracert',
    task: taskTracert

  },
  {
    name: 'iPerf',
    type: 'iPerf',
    task: taskIperf
  },
  {
    name: 'facebook',
    type: 'Facebook',
    task: taskFacebook
  },
  {
    name: 'skype',
    type: 'Skype',
    task: taskSkype
  },
  {
    name: 'udp',
    type: 'UDP',
    task: taskUdp
  },
  {
    name: 'openSignal',
    type: 'OpenSignal',
    task: taskOpenSignal
  },
  {
    name: 'bass',
    type: 'Bass',
    task: taskBass

  },
  {
    name: 'idt',
    type: 'IDT',
    task: taskIdt
  },
  {
    name: 'idle',
    type: 'Idle',
    task: taskIdle
  },
  {
    name: 'parallel',
    type: 'Parallel Service',
    task: taskParallel
  },
  {
    name: 'ussd',
    type: 'USSD',
    task: taskUssd
  },
  {
    name: 'twitterApp',
    type: 'Twitterapp',
    task: taskTwitterapp

  },
  {
    name: 'instagram',
    type: 'Instagram',
    task: taskInstagram

  },
  {
    name: 'facebookApp',
    type: 'Facebook App',
    task: taskFacebookapp

  },
  {
    name: 'mmsSend',
    type: 'MMS Send',
    task: taskMmsSend

  },
  {
    name: 'mmsSelf',
    type: 'MMS Self',
    task: taskMmsSelf
  },
  {
    name: 'mmsReceive',
    type: 'MMS Receive',
    task: taskMmsReceive
  },
  // 短信发
  {
    name: 'smsSend',
    type: 'SMS Send',
    task: taskSmsSend
  },
  // 短信收
  {
    name: 'smsReceive',
    type: 'SMS Receive',
    task: taskSmsReceive
  },
  // 自发自收
  {
    name: 'smsSelf',
    type: 'SMS Self',
    task: taskSmsSelf
  },
  {
    name: 'wapPage',
    type: 'Wap Page',
    task: taskWapPage
  },
  {
    name: 'wapDownload',
    type: 'Wap Download',
    task: taskWapDownload
  },
  {
    name: 'whatsApp',
    type: 'Whats App',
    task: taskWhatsApp
  },
  {
    name: 'whatsAppMoc',
    type: 'Whats App MOC',
    task: taskWhatsAppMoc
  },
  {
    name: 'whatsAppMtc',
    type: 'Whats App MTC',
    task: taskWhatsAppMtc
  },
  {
    name: 'cwScanner',
    type: 'Scanner',
    task: taskCwScanner
  },
  {
    name: 'spectrumScanner',
    type: 'Scanner',
    task: taskSpectrumScanner
  },
  {
    name: 'blindScanner',
    type: 'Scanner',
    task: taskBlindScanner
  },
  {
    name: 'gsmScanner',
    type: 'Scanner',
    task: taskGsmScanner
  },
  {
    name: 'cdmaScanner',
    type: 'Scanner',
    task: taskCdmaScanner
  },
  {
    name: 'wcdmaScanner',
    type: 'Scanner',
    task: taskWcdmaScanner
  },
  {
    name: 'tdscdmaScanner',
    type: 'Scanner',
    task: taskTdscdmaScanner
  },
  {
    name: 'lteScanner',
    type: 'Scanner',
    task: taskLteScanner
  },
  {
    name: 'nbScanner',
    type: 'Scanner',
    task: taskNbScanenr
  }

]
/**
 * 构造表单规则
 * @param ruleList
 * @param commonLule
 * @returns whole rule list
 */
function buildFormRule(rules, commonTask) {
  console.log(rules)
  console.log(commonTask)
  var allRules = {}
  rules.forEach(eleRule => {
    var modelFormRule = Object.assign([], commonTask)
    modelFormRule.forEach((item, idx) => {
      // 修改名称
      if (item.field === 'taskName') {
        var myTask = Object.assign({}, item)
        myTask.value = eleRule.name
        modelFormRule[idx] = myTask
      }
      // 修改类型
      if (item.field === 'taskType') {
        var myType = Object.assign({}, item)
        myType.value = eleRule.type
        modelFormRule[idx] = myType
      }
    })
    modelFormRule.splice(10, 0, eleRule.task)
    allRules[eleRule.name] = Object.assign([], modelFormRule)
  })
  console.log(allRules.moc)
  // allRules.moc.splice(-1, 1)
  allRules.moc.splice(allRules.moc.length - 3, 1)
  // allRules.moc.splice(-1, 1)
  // mtc
  allRules.mtc.splice(allRules.mtc.length - 3, 1)
  // video play
  allRules.videoPlay.splice(allRules.videoPlay.length - 3, 1)
  // sms
  allRules.smsSend.splice(allRules.smsSend.length - 3, 1)
  allRules.smsReceive.splice(allRules.smsReceive.length - 3, 1)
  allRules.smsSelf.splice(allRules.smsSelf.length - 3, 1)
  // video telephony
  allRules.videoTelephony.splice(-1, 1)
  allRules.videoTelephony.splice(-1, 1)
  allRules.videoTelephony.splice(-1, 1)
  allRules.videoTelephony.splice(-1, 1)
  allRules.videoTelephony.splice(-1, 1)
  // modem传输任务
  allRules.dataTransfer.splice(allRules.dataTransfer.length - 5, 1)
  allRules.dataTransfer.splice(allRules.dataTransfer.length - 4, 1)
  return allRules
}
function getFormName(rules) {
  var arr = []
  rules.forEach(item => {
    var ele = {
      name: item.name,
      type: item.type
    }
    arr.push(ele)
  })
  console.log(arr)
  return arr
}

export const typeFormName = getFormName(taskRules)
export const taskFormRules = buildFormRule(taskRules, commonTask)
