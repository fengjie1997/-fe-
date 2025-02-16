export default {
  taskPlan: {
    title: {
      gpsStaticActionTitle: 'The test will be stopped after the user-defined GPS stationary duration',
      gpsMissActionTitle: 'The test will be stopped after the user-defined GPS lost duration',
      gpsMissAlarmTitle: 'The device will send alarm after the user-defined GPS lost duration',
      update: 'Modify test plan',
      create: 'Create test plan',
      edit: 'Edit test plan',
      list: 'Test plan list',
      templateManagement: 'Template management',
      randomDurationSetting: 'Random duration setting',
      timeSetting: 'Time Setting',
      tip: 'Tips',
      basicConfig: 'General',
      DataTransferConfig: 'Data Transmission Settings',
      otherConfig: 'Other Settings',
      fileSplit: 'Data File Partition Settings',
      fileSave: 'File Save Settings',
      fileUpload: 'File Upload Settings',
      speedControl: 'Speed Control',
      portBasicConfig: 'Basic port configuration',
      portConfig: 'Port Configuration'
    },
    tip: {
      applyTaskPlanToDevices: 'Are you sure to apply the test plan to the selected device?'
    },
    message: {
      notNull: 'This field is required',
      templateApply: 'Template applied to settings',
      record: 'Only single record can be operated',
      minRecord: 'Select at least one record',
      timePeriod: 'At least one time period is required',
      select: 'Please select',
      name: 'Please enter plan name',
      startTime: 'Please select start time',
      endTime: 'Please select end time',
      recurrenctType: 'Please select repeat type',
      testType: 'Please select test type',
      testLevel: 'Please select test category',
      testScenario: 'Please select test scenario',
      timeZoneSelect: 'Please select test time zone',
      timeConflict: 'Time period conflict',
      nameNull: 'Template name cannot be empty',
      switchModemPort: 'Switching the transport port will clear the test tasks under the original port and the new port'
    },
    label: {
      specifiedTime: 'Duration(min)',
      saveTemplate: 'Save Template',
      groupSequence: 'Priority',
      buildOnlyOnePpp: 'Single Dialup Services Test',
      testBeginOption0: 'Once the equipment is switched on',
      testBeginOption1: 'Once connected to FU server',
      loginType: 'Login Type',
      encryptType: 'Encrypt Type',
      maximumDuration: 'Maximum Duration(s)',
      minimumDuration: 'Minimum Duration(s)',
      testDurationSegmentationSettings: 'Test duration segmentation settings',
      custom: 'custom',
      cycleExecutionOrNot: 'Cycle execution or not',
      portDeviceType: 'Port Device Type',
      taskName: 'Task Name',
      schemaName: 'Name',
      waitDuration: 'Wait Duration(s)',
      failInterval: 'Failure Interval(s)',
      testInterval: 'Test interval(s)',
      networkType: 'Network Type',
      true: 'yes',
      false: 'no',
      //  基本配置  General
      name: 'Plan Name',
      recurrenctType: 'Repeat Type',
      // selectWeek: '选择星期', // executionCycle -> EveryWeek
      // dayNum: '天数', // executionCycle -> Multiple 0f Days Day Number
      // selectDate: '选择日期', // executionCycle -> Customize Select Date
      startTime: 'Start Time',
      endTime: 'End Time',
      testType: 'Test Type',
      testLevel: 'Test Category',
      testScenario: 'Test Scenario',
      timeZone: 'Timezone',
      //  数据传输设置label  Data Transmission Settings
      dataTransmit: 'Data Transmit Option',
      modemPort: 'Port Number',
      //  文件分割 Data File Partition Settings
      saveByPort: 'Save Data by Port',
      swicthType: 'Partition Type',
      //  文件保存 File Save Settings
      saveRCU: 'Save RCU File',
      saveORGRCU: 'Save RCU Source File',
      saveDCF: 'Save DCF File',
      saveCTI: 'Save CTI File',
      saveDTlog: 'Save DTLog File',
      saveCU: 'Save CU File',
      //  文件上传File Upload Settings
      uploadDataFileFormat: 'Upload File Format',
      uploadPCAPFile: 'Upload PCAP File',
      uploadMOSFile: 'Upload MOS File',
      uploadDataFileZip: 'Upload Data File Zip',
      //  车速控制  Speed Control
      isSpeedLimit: 'Enabled Speed Control',
      speedAction: 'Out of Speed Range',
      max: 'Maximum Speed (m/h)',
      maxSpeedPenaltyDuration: 'Maximum Speed Duration (min)',
      least: 'Minimum Speed (m/h)',
      leastSpeedPenaltyDuration: 'Minimum Speed Duration (min)',
      //  其他设置 Other Settings
      smaAlarmRecvNum: 'Alarm Received No.',
      testAction: 'Start Test Options',
      upsAction: 'Ups Action',
      gpsStaticAction: 'GPS Static Action(s)',
      gpsMissAction: 'GPS Lost Action(s)',
      gpsMissAlarm: 'GPS Lost Alarm(s)',
      taskGroupName: 'Task Group Name',
      synchronizationTimeWindow: 'Synchronization Time Window',
      timeInterval: 'time Interval', // 单位为(ms)
      numberOfCycles: 'Number Of Cycles',
      timeslot: 'Time Slot',
      addTask: 'Add Task',
      addTaskGroup: 'Add Task Group',
      groupOrTaskName: ' Group/Task Name',
      deviceModel: 'Device Type',
      executionTimePeriod: 'Execution Time Range',
      executionTimes: 'Execution Count',
      dialCreate: 'Dial-up Mode',
      connectionDisconnectStrategy: 'Disconnection Mode',
      networkConnectionSettings: 'Network Connection Settings',
      dialCreationMethod: 'Dial-up Mode',
      connectionMode: 'Connection Mode for Each Loop Test',
      useSet: 'Enable',
      dialNetwork: 'Dial Settings- Network Connection Information',
      dialName: 'Dial Connection Name',
      rasNumber: 'RAS Number',
      dialTel: 'Dial No',
      uplinkRequestRate: ' Uplink Request Rate',
      dwonlinkRequestRate: 'Download Request Rate',
      downlinkRequestRate: 'Download Request Rate',
      taskLevel: 'Service Grade',
      IPType: 'IP Type',
      connectionName: 'Dial Connection Name',
      dialSelect: 'Dial Settings-Optional Connection Information',
      enable: 'Enable',
      enableWIFI: 'Enable WIFI',
      templateName: 'Template Name'
    },
    menu: {
      addPrice: 'Value-added Service',
      taskVoice: 'Call Test',
      taskData: 'Data Test',
      dataTransfer: 'Modem Transfer',
      ftpUpload: 'FTP Upload',
      ftpDownload: 'FTP Download',
      multiFtpUpload: 'Multi FTP Upload',
      multiFtpDownload: 'Multi FTP Download'
    },
    form: {
      timeSetting: 'Fixed Time Settings',
      taskDuration: 'Test Duration (s)',
      taskPingDuration: 'Test Duration(ms)',
      interval: 'Interval (s)',
      intervalPing: 'Interval(ms)',
      isAvailable: 'Time Window',
      windowSize: 'Window Size (s)',
      windowSizePing: 'Window Size(ms)',
      guardDuration: 'Guard Time (s)',
      guardPingDuration: 'Guard Time(ms)',
      guardDurationMessage: 'Guard Time cannot be empty!',
      duration: 'Test Duration (s)',
      timeWindowSetting: 'Time Window',
      isLockBand: 'Lock Band',
      saveByPort: 'End Test with Net. Changed',
      isLockArfcn: 'Lock ARFCN',
      isLockCell: 'Lock Cell',
      lockArfcn: 'ARFCN Locked',
      lockCellFrequency: 'Cell ARFCN',
      lockCellPSC: 'Lock Cell PSC',
      lockNetwork: 'Network Mode',
      CallControl: 'Call Control',
      testControl: 'Network Control',
      lteBand: 'Lock Band',
      networkLockSetting: 'Network Lock Settings',
      detachStrategy: 'Detach Mode',
      connectionType: 'Dial-up Mode',
      connectionDisconnectStrategy: 'Disconnection Mode',
      singleTimeout: 'Single Dial Timeout (s)',
      reconnectCount: 'Max. Redial Times',
      totalTimeout: 'Total Dial Timeout (s)',
      port: 'Modem Port',
      discontEveryTime: 'Disconnect every time',
      modemFriendName: 'PPP Connection',
      captureMode: 'Capture Mode',
      fileSwitch: 'Switch Mode',
      tcpipCaptureSetting: 'Capture TCP/IP Packets'
    },
    commonTask: {
      infinite: 'Infinite',
      taskSequence: 'Execution Sequence',
      taskRepeatCount: 'Execution Count'
    },
    common: {
      input: 'Please enter',
      taskPlanConfig: 'Test Plan Configuration',
      selectTaskGroup: 'Please select task group',
      exportXml: 'Import *.XML files',
      exportXML: 'Export *.XML files',
      applyToOtherDevices: 'Apply test plan to other devices'
    },
    voice: {
      title: 'MTC Test Configuration',
      mocTestConfig: 'MOC Test Configuration',
      longCall: 'Long Call',
      mosTest: 'MOS Test',
      connection: 'Connection Duration (s)',
      duration: 'Call Duration (s)',
      lowMosThreshold: 'Low MOS',
      mtcDevicePort: 'MTC Port',
      testType: 'Test Mode',
      callType: 'Call Type',
      mosAlgorithm: 'MOS Algorithm',
      mosDeviceVer: 'MOS Device',
      sampleType: 'POLQA Sample',
      calcMode: 'POLQA Score',
      cdmaAmrRate: 'CDMA MR Rate',
      voiceType: 'Voice Type',
      umtsAmrRate: 'WCDMA MR Rate',
      callingNumber: 'Calling Number',
      calledNumber: 'Called Number'
    },
    ftpUpload: {
      fileSource: 'File Source',
      ftpUpload: 'FTP Upload Test Configuration',
      psCallMode: 'Test Mode',
      transferProtocol: 'Transfer Protocol',
      DataMode: 'Data Mode',
      uploadTimeout: 'Upload Timeout (s)',
      uploadDuration: 'Upload Duration (s)',
      fileSize: 'File Size (KB)',
      threadCount: 'Upload Thread',
      samplesInterval: 'Samples Interval (s)',
      reConnectCount: 'Reconnection Times',
      noDataTimeout: 'No Data Timeout (s)',
      maxDialNum: 'Max. Dial Count in Single Service',
      maxLandNum: 'Max. Login Count in Single Service',
      delAfterFinish: 'Delete Files After Upload Completed',
      remoteDirectory: 'Remote Directory',
      remoteDirectoryMessage: 'Please enter remote directory',
      localFile: 'Local File',
      ftpHostSetting: 'Server Settings',
      taskRepeatCount: 'Cycle Count'
    },
    ftpDownload: {
      ftpDownload: 'FTP Download Test Configuration',
      downloadTimeout: 'Download Timeout (s)',
      downloadDuration: 'Download Duration (s)',
      threadCount: 'Download Thread',
      downloadFile: 'Download File',
      downloadFileMessage: 'Download File cannot be empty!',
      saveDirectory: 'Directory',
      isSaveFile: 'Save File'
    },
    mftpDown: {
      title: 'Multi FTP Upload Test Configuration',
      message1: 'Please enter the name',
      message2: 'Please enter a correct name',
      mftpUpConfig: 'Multi FTP Download Configuration',
      doSave: 'Save File',
      reconnectInterval: 'Reconnection Interval (s)',
      siteName: 'Site Name',
      address: 'Address',
      ip: 'IP Address',
      addConfig: 'Add Multi FTP Download Configuration',
      updateConfig: 'Update Multi FTP Download Configuration',
      isAnonymous: 'Anonymous',
      connectionMode: 'Connection Mode',
      transferMode: 'Transfer Mode',
      endCondition: 'End Condition',
      waitTime: 'Start Waiting Time (s)'
    },
    mftpUp: {
      message1: 'Please enter the name',
      message2: 'Please enter a correct name',
      title: 'Multi FTP Upload Test Configuration',
      mftpUpConfig: 'Multi FTP Upload Configuration',
      addConfig: 'Add Multi FTP Upload Configuration',
      updateConfig: 'Update Multi FTP Upload Configuration'
    },
    httpPage: {
      title: 'HTTP Page Test Configuration',
      proxySetting: 'Proxy Configuration',
      showBrowser: 'Display Browser',
      pageTimeout: 'Page Timeout (s)',
      connectTimeout: 'Connection Timeout (s)',
      browserInterval: 'Browse Interval (s)',
      randomUrlCount: 'Random Address Count',
      useProxy: 'Use Proxy'
    },
    httpWeb: {
      websiteType: 'Website Type',
      fileSource: 'File Source',
      businessType: 'Service Type',
      uploadTimeout: 'Upload Timeout (s)',
      uploadDuration: 'Upload Duration (s)',
      downloadTimeout: 'Download Timeout (s)',
      downloadDuration: 'Download Duration (s)',
      fileSize: 'File Size',
      httpUpUrl: 'Upload URL',
      httpUpUrlMessage: 'Upload URL cannot be empty',
      upTitle: 'HTTP Upload Test Configuration',
      downTitle: 'HTTP Download Test Configuration',
      multiDownTitle: 'Multi HTTP Download Test Configuration'
    },
    ping: {
      packetSize_B: 'Packet Size (Byte)',
      title: 'Ping Test Configuration',
      timeout: 'Timeout (ms)'
    },
    pbm: {
      duration: 'Duration (s)',
      downSampleRatio: 'Download Ratio (%)',
      upSampleRatio: 'Upload Ratio (%)',
      title: 'PBM Test Configuration'
    },
    videoPlay: {
      mediaQuality: 'Media Quality',
      title: 'Video Play Test Configuration'
    },
    dataTransfer: {
      title: 'Modem Transfer Configuration',
      duration: 'Duration'
    },
    baidu: {
      title: 'Baidu cloud account information',
      isKey: 'Developer key or not',
      Key: 'key'
    },
    server: {
      authentication: 'Authentication',
      siteName: 'Site name'
    },
    SMS: {
      sendTitle: 'SMS Send Test Config',
      receiveTitle: 'SMS Receive Test Config',
      selfTitle: 'SMS Reception (Self) Config',
      testType: 'Test Mode',
      receiverNumber: 'Receive Number',
      // 此字段作为短信内容使用
      smsText: 'Content',
      smsc: 'SMS Center Number',
      smsFormat: 'SMS Format',
      sendTimeout: 'Send Timeout(s)',
      receiveTimeout: 'Receive Timeout(s)',
      sendPort: 'Send Port',
      sendBaudRate: 'Baud Rate (bps)',
      mtcDevicePort: 'MTC Port'
    }

  }
}
