/**
 * 添加测试任务目录
 */
export const getTaskMenu = () => {
  var list = [
    // first level
    {
      id: 0,
      name: '语音业务',
      value: 'taskVoice',
      parentId: null
    },
    {
      id: 1,
      name: '数据业务',
      value: 'taskData',
      parentId: null
    },
    {
      id: 2,
      name: '增值业务',
      value: 'taskValueAdd',
      parentId: null
    },
    {
      id: 3,
      name: 'Idle测试',
      value: 'idle',
      parentId: null
    },
    {
      id: 4,
      name: '扫频测试',
      value: 'taskSweep',
      parentId: null
    },
    {
      id: 5,
      name: 'MODEM传输任务',
      value: 'dataTransfer',
      parentId: null
    },
    {
      id: 6,
      name: '并行业务',
      value: 'parallel',
      parentId: null
    },
    // second level
    {
      id: 7,
      name: 'MOC',
      value: 'moc',
      parentId: 0
    },
    {
      id: 8,
      name: 'MTC',
      value: 'mtc',
      parentId: 0
    },
    {
      id: 9,
      name: 'FTP',
      value: 'taskFtp',

      parentId: 1
    },
    {
      id: 10,
      name: 'FTP上传',
      value: 'ftpUpload',
      parentId: 9
    },
    {
      id: 11,
      name: 'FTP下载',
      value: 'ftpDownload',
      parentId: 9
    },
    {
      id: 12,
      name: '多路FTP上传',
      value: 'multiFtpUpload',
      parentId: 9
    },
    {
      id: 13,
      name: '多路FTP下载',
      value: 'multiFtpDownload',

      parentId: 9
    },
    {
      id: 14,
      name: 'HTTP',
      value: 'TASK_HTTP',
      parentId: 1
    },
    {
      id: 15,
      name: 'Ping',
      value: 'ping',
      parentId: 1
    },
    {
      id: 16,
      name: 'PBM',
      value: 'pbm',
      parentId: 1
    },
    {
      id: 17,
      name: 'VIDEO',
      value: 'TASK_VIDEO',
      parentId: 1
    },
    {
      id: 18,
      name: 'SMS',
      value: 'TASK_SMS',
      parentId: 2
    },
    {
      id: 19,
      name: 'HTTP PAGE',
      value: 'httpPage',
      parentId: 14
    },
    {
      id: 20,
      name: 'HTTP Download',
      value: 'httpDownload',
      parentId: 14
    },
    {
      id: 21,
      name: 'HTTP Upload',
      value: 'httpUpload',
      parentId: 14
    },
    {
      id: 22,
      name: 'MHTTP Download',
      value: 'multiHttpDownload',
      parentId: 14
    },
    {
      id: 23,
      name: 'Video Telephony',
      value: 'TASKTYPE_VIDEO_TELEPHONY',
      parentId: 17
    },
    {
      id: 24,
      name: 'Video Play',
      value: 'TASK_SMS',
      parentId: 17
    },
    {
      id: 25,
      name: 'Speed',
      value: 'speed',
      parentId: 1
    },
    {
      id: 26,
      name: 'Email',
      value: 'TASKTYPE_EMAIL',
      parentId: 1
    },
    {
      id: 27,
      name: 'PPP',
      value: 'ppp',
      parentId: 1
    },
    {
      id: 28,
      name: 'PDP Active',
      value: 'pdpActive',
      parentId: 1
    },
    {
      id: 29,
      name: 'Attach测试',
      value: 'attach',
      parentId: 1
    },
    {
      id: 30,
      name: 'Tracert',
      value: 'tracert',
      parentId: 1
    },
    {
      id: 31,
      name: 'DNS',
      value: 'dns',
      parentId: 1
    },
    {
      id: 32,
      name: 'Facebook',
      value: 'facebook',
      parentId: 1
    },
    {
      id: 33,
      name: 'IPerf',
      value: 'iPerf',
      parentId: 1
    },
    {
      id: 34,
      name: 'UDP',
      value: 'udp',
      parentId: 1
    },
    {
      id: 35,
      name: 'OpenSignal',
      value: 'openSignal',
      parentId: 1
    },
    {
      id: 36,
      name: 'Skype',
      value: 'skype',
      parentId: 1
    },
    {
      id: 37,
      name: 'Bass',
      value: 'bass',
      parentId: 1
    },
    {
      id: 38,
      name: 'IDTTest',
      value: 'idt',
      parentId: 1
    },
    {
      id: 39,
      name: 'SMS Send',
      value: 'smsSend',
      parentId: 18
    },
    {
      id: 40,
      name: 'SMS Receive',
      value: 'smsReceive',
      parentId: 18
    },
    {
      id: 41,
      name: 'SMS Self',
      value: 'smsSelf',
      parentId: 18
    },
    {
      id: 42,
      name: 'MMS',
      value: 'MMS',
      parentId: 2
    },
    {
      id: 43,
      name: 'MMS Send',
      value: 'mmsSend',
      parentId: 42
    },
    {
      id: 44,
      name: 'MMS Receive',
      value: 'mmsReceive',
      parentId: 42
    },
    {
      id: 45,
      name: 'MMS Self',
      value: 'mmsSelf',
      parentId: 42
    },
    {
      id: 46,
      name: 'WAP',
      value: 'WAP',
      parentId: 2
    },
    {
      id: 47,
      name: 'WAP Page',
      value: 'wapPage',
      parentId: 46
    },
    {
      id: 48,
      name: 'WAP Download',
      value: 'wapDownload',
      parentId: 46
    },
    // {
    //   id: 49,
    //   name: 'USSD',
    //   value: 'TASK_SMS',
    //   parentId: 2
    // },
    {
      id: 50,
      name: 'WhatsApp',
      value: 'whatsApp',
      parentId: 2
    },
    {
      id: 51,
      name: 'WhatsApp',
      value: 'WhatsApp',
      parentId: 50
    },
    {
      id: 52,
      name: 'WhatsApp MOC',
      value: 'whatsAppMoc',
      parentId: 50
    },
    {
      id: 53,
      name: 'WhatsApp MTC',
      value: 'whatsAppMtc',
      parentId: 50
    },
    {
      id: 54,
      name: 'Instagram',
      value: 'instagram',
      parentId: 2
    },
    {
      id: 55,
      name: 'Facebook App',
      value: 'facebookApp',
      parentId: 2
    },
    {
      id: 56,
      name: 'TwitterAppTest',
      value: 'twitterApp',
      parentId: 2
    },
    // {
    //   id: 57,
    //   name: 'Scanner测试（旧设备）',
    //   value: 'TASK_SMS',
    //   parentId: 4
    // },
    {
      id: 58,
      name: 'CW功率测试',
      value: 'cwScanner',
      parentId: 4
    },
    {
      id: 59,
      name: 'Spectrum频谱测试',
      value: 'spectrumScanner',
      parentId: 4
    },
    {
      id: 60,
      name: 'Blind盲扫测试',
      value: 'blindScanner',
      parentId: 4
    },
    {
      id: 61,
      name: 'GSM_ColorCode',
      value: 'gsmScanner',
      parentId: 4
    },
    {
      id: 62,
      name: 'CDMA_pilot',
      value: 'cdmaScanner',
      parentId: 4
    },
    {
      id: 62,
      name: 'WCDMA_pilot',
      value: 'wcdmaScanner',
      parentId: 4
    },
    {
      id: 62,
      name: 'TDSCDMA_pilot',
      value: 'tdscdmaScanner',
      parentId: 4
    },
    {
      id: 62,
      name: 'LTE_pilot',
      value: 'lteScanner',
      parentId: 4
    },
    {
      id: 62,
      name: 'NB_pilot',
      value: 'nbScanner',
      parentId: 4
    }

  ]
  var map = {}
  list.forEach(function(item) {
    map[item.id] = item
  })
  var val = []
  list.forEach(item => {
    var parent = map[item.parentId]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      val.push(item)
    }
  })
  return JSON.parse(JSON.stringify(val))
}
