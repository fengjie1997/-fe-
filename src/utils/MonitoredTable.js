import { getCacheDict } from './dictCache'
import { fetchGroupList } from '../api/monitored/monitored'
export function getDeviceType(data) {
  for (let i = 0; i < getCacheDict('deviceType').length; i++) {
    if (data === getCacheDict('deviceType')[i].code) {
      return getCacheDict('deviceType')[i].name
    }
  }
}

/**
 * 根据第三级groupId返回分组名
 * @param id
 */
export function getDeviceGroupId(id) {
  fetchGroupList().then(res => {
    const data = res.data
    if (data.code === 1) {
      for (let i = 0; i < data.data.length; i++) {
        for (let j = 0; j < data.data[i].children.length; j++) {
          if (id === data.data[i].children[j].id) {
            return data.data[i].children[j].name
          }
        }
      }
    }
  })
}

/**
 * 获取第三级分组的id、name
 */
export function getThreeDeviceGroupIds() {
  const groupIds = []
  fetchGroupList().then(res => {
    const data = res.data
    if (data.code === 1) {
      for (let i = 0; i < data.data.length; i++) {
        for (let j = 0; j < data.data[i].children.length; j++) {
          groupIds.push({
            id: data.data[i].children[j].id,
            name: data.data[i].children[j].name
          })
        }
      }
    }
  })
  return groupIds
}
/**
 * 传参第二级分组id，获取第三级分组的id、name
 */
export function getThreeDeviceGroupIdsBySeconds(id) {
  const groupIds = []
  fetchGroupList().then(res => {
    const data = res.data
    if (data.code === 1) {
      for (let i = 0; i < data.data.length; i++) {
        if (id === data.data[i].id) {
          for (let j = 0; j < data.data[i].children.length; j++) {
            groupIds[j] = data.data[i].children[j].id
          }
          return groupIds
        }
      }
    }
  })
}
/**
 * 获取第二级分组的id、name
 */
export function getSecondDeviceGroupIds() {
  const groupIds = []
  fetchGroupList().then(res => {
    const data = res.data
    if (data.code === 1) {
      for (let i = 0; i < data.data.length; i++) {
        groupIds[i] = {}
        groupIds[i].id = data.data[i].id
        groupIds[i].name = data.data[i].name
      }
    }
  })
  return groupIds
}
export function getDeviceStatus(data) {
  for (let i = 0; i < getCacheDict('deviceStatus').length; i++) {
    if (data === getCacheDict('deviceStatus')[i].code) {
      return getCacheDict('deviceStatus')[i].name
    }
  }
}

export function getAlarmLevel(data) {
  for (let i = 0; i < getCacheDict('alarmLevel').length; i++) {
    if (data === Number(getCacheDict('alarmLevel')[i].code)) {
      return getCacheDict('alarmLevel')[i].name
    }
  }
}

/**
 * 深度拷贝
 * @param initalObj
 * @param finalObj
 * @returns {*|{}}
 */
// export function deepClone(initalObj, finalObj) {
//   const obj = finalObj || {}
//   for (const i in initalObj) {
//     const prop = initalObj[i]
//
//     // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
//     if (prop === obj) {
//       continue
//     }
//
//     if (typeof prop === 'object') {
//       obj[i] = (prop.constructor === Array) ? [] : Object.create(prop)
//     } else {
//       obj[i] = prop
//     }
//   }
//   return obj
// }
export function deepClone(target, ...objs) {
  // const me = this
  objs.forEach(function(obj) {
    if (obj) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          if (Array.isArray(obj[key])) {
            target[key] = deepClone(target[key] || [], obj[key])
          } else if (typeof obj[key] === 'object') {
            target[key] = deepClone(target[key] || {}, obj[key])
          } else {
            target[key] = obj[key]
          }
        }
      }
    }
  })
  return target
}
