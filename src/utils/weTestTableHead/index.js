import { appDownload } from './appDownload'
import { browseApp } from './browseApp'
import { douyin } from './douyin'
import { game } from './game'
import { httpVideo } from './httpVideo'
import { httpWeb } from './httpWeb'
import { liveVideo } from './liveVideo'
import { map } from './map'
import { multiFtpDownload } from './multiFtpDownload'
import { multiFtpUpload } from './multiFtpUpload'
import { normalVoiceCall } from './normalVoiceCall'
import { ottBasic } from './ottBasic'
import { pbm } from './pbm'
import { ping } from './ping'
import { scanCodePay } from './scanCodePay'
import { tcpDownload } from './tcpDownload'
import { tcpUpload } from './tcpUpload'
import { udpDownload } from './udpDownload'
import { udpUpload } from './udpUpload'
import { voiceCall } from './voiceCall'
import { redPacket } from '@/utils/weTestTableHead/redPacket'
import { socialContact } from '@/utils/weTestTableHead/socialContact'

// taskId
export function getWeTestDateTableHead(taskId) {
  switch (taskId) {
    case 101: return ping
    case 106: return pbm
    case 103: return multiFtpUpload
    case 102: return multiFtpDownload
    case 1052: return tcpUpload
    case 1051: return tcpDownload
    case 1042: return udpUpload
    case 1041: return udpDownload
    case 110: case 111: return ottBasic
    case 118: return douyin
    case 112: case 113: return scanCodePay
    case 117: return game
    case 116: case 114: case 115: case 123:return browseApp
    case 119: case 120: return voiceCall
    case 121: return normalVoiceCall
    case 124: return liveVideo
    case 125: return map
    case 126: return appDownload
    case 127: return redPacket
    case 301: case 302: return socialContact
    case 1081: case 1082: case 1083: case 1084: case 1085: case 1086: case 1087: case 1088 : return httpVideo
    case 1227: case 1221: case 1222: case 1223: case 1224: case 1225: case 1226: case 1228: case 1229: return httpWeb
    default:
      return
  }
}
