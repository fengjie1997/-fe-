import { getCacheDict } from './dictCache'

export function getBusinessList() {
  return [{ 'name': '测速类', 'children': getCacheDict('speedTest(WeTest)') },
    { 'name': '直播类', 'children': getCacheDict('WeTestLiveBroadcast') },
    { 'name': '地图类', 'children': getCacheDict('WeTestMap') },
    { 'name': '应用下载类', 'children': getCacheDict('WeTestAppDownload') },
    // { 'name': '社交类', 'children': getCacheDict('WeTestSocialContact') },
    // { 'name': '红包类', 'children': getCacheDict('WeTestRedPacket') },
    { 'name': '访问类', 'children': getCacheDict('visit(WeTest)') },
    { 'name': '通话类', 'children': getCacheDict('WeTestVoiceCall') },
    { 'name': '即时通讯', 'children': getCacheDict('communication（WeTest）') },
    { 'name': 'APP视频', 'children': getCacheDict('appVideo(WeTest)') },
    { 'name': '扫码支付', 'children': getCacheDict('scan_code_pay(WeTest)') },
    // { 'name': '游戏', 'children': getCacheDict('game(WeTest)') },
    { 'name': 'HTTP视频', 'children': getCacheDict('HttpVideos(WeTest)') }
    // { 'name': '网页业务', 'children': getCacheDict('HttpWeb(WeTest)') }
  ]
}
export function getTaskState(Business) {
  if (Business === 1) {
    return '已下发'
  }
  return '未下发'
}
export function getPingSelect(Business) {
  return Business === 'Yes'
}
export function getUrlSelect(Business) {
  switch (Business) {
    case 'Http_Baidu':return 'http://m.baidu.com'
    case 'Http_NetEase':return 'http://3g.163.com'
    case 'Http_SOHU':return 'http://m.sohu.com'
    case 'Http_People_Network':return 'http://m.people.cn'
    case 'Http_CTRIP':return 'http://m.ctrip.com'
    case 'Http_JD':return 'http://m.jd.com'
    case 'Http_Taobao':return 'http://m.taobao.com'
    case 'Http_Sina_Weibo':return 'http://m.weibo.com'
    default:
      return null
  }
}
// 测速类的task
export function getTaskByTaskId(taskId) {
  switch (taskId) {
    case 101 :return 'ping'
    case 106 :return 'pbm'
    case 103 :return 'multi_ftp_upload'
    case 102 :return 'multi_ftp_download'
    case 1052 :return 'tcp_upload'
    case 1051 :return 'tcp_download'
    case 1042 :return 'udp_upload'
    case 1041 :return 'udp_download'
    default:
      return '分类逻辑错误'
  }
}
/**
 * WeTest一级级业务
 * @param Business
 * @returns {string|*}
 */
export function getBusinessTypeName(task) {
  switch (task) {
    case 'red_packet':return '红包类'
    case 'app_download':return '应用下载类'
    case 'douyin':return 'App视频'
    case 'normal_voice_call' :return '普通通话'
    case 'voice_call' :return '语音通话'
    case 'http_web':return 'HTTP网页'
    case 'http_video':return 'HTTP视频'
    case 'app_video':return 'App视频'
    case 'ott_basic':return '即时通讯'
    case 'scan_code_pay':return '扫码支付'
    case 'browse_app':return '访问类'
    case 'game':return '游戏'
    case 'live_video':return '直播类'
    case 'map':return '地图类'
    case 'social':return '社交类'
    default:
      return '测速类'
  }
}
/**
 * WeTest二级业务
 * @param Business
 * @returns {string|*}
 */
export function getBusinessName(Business) {
  if (Business.substring(0, 9) === '(HttpWeb)') {
    return Business
  }
  if (Business.substring(0, 9) === '(HttpVideo)') {
    return Business
  }
  switch (Business) {
    case 'Facebook':return 'Facebook'
    case 'Instagram':return 'Instagram'
    case 'WeChat_Red_Packet':return '微信红包'
    case 'App_Treasure':return '应用宝'
    case 'Baidu_Map':return '百度地图'
    case 'HuYa':return '虎牙直播'
    case 'Tencent_News':return '腾讯新闻'
    case 'WeChat_Voice_Call':return '微信通话'
    case 'Skype_Voice_Call':return 'Skype通话'
    case 'Normal_Voice_Call':return '普通通话'
    case 'WeChat':return '微信'
    case 'Alipay':return '支付宝'
    case 'WeChat_Pay':return '微信支付'
    case 'King_of_Glory':return '王者荣耀'
    case 'JD':return '京东'
    case 'Taobao':return '淘宝'
    case 'TouTiao':return '今日头条'
    case 'Http_Taobao':return '淘宝官网'
    case 'Http_Baidu':return '百度官网'
    case 'Http_NetEase':return '网易官网'
    case 'Http_SOHU':return '搜狐官网'
    case 'Http_Sina_Weibo':return '新浪微博'
    case 'Http_CTRIP':return '携程网'
    case 'Http_JD':return '京东商城'
    case 'Http_People_Network':return '人民网'
    case 'Http_Sina_Video':return '新浪视频'
    case 'Http_v_ifeng':return '凤凰视频'
    case 'Http_tv_sohu':return '搜狐视频'
    case 'Http_iQIYI_Video':return '爱奇艺'
    case 'Http_Youku_Video':return '优酷视频'
    case 'Http_Tencent_Video':return '腾讯视频'
    case 'Http_DouYin_Video':return '抖音视频'
    case 'DouYin':return '抖音'
    default:
      return Business
  }
}
