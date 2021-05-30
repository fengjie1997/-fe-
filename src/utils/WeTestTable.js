/**
 * 字符串拼接
 * @param str
 * @returns {*}
 */
export function removeleft(str) {
  if (str) {
    var reg = /^\{/gi
    // var reg2 = /\}$/gi
    str = str.replace(reg, '')
    // str = str.replace(reg2, '')
    return str
  } else {
    return str
  }
}
export function removeright(str) {
  if (str) {
    var reg2 = /\}$/gi
    str = str.replace(reg2, '')
    return str
  } else {
    return str
  }
}
export function remove(str) {
  if (str) {
    var reg = /^\{/gi
    var reg2 = /\}$/gi
    str = str.replace(reg, '')
    str = str.replace(reg2, '')
    return str
  } else {
    return str
  }
}

export function getTestPlanStatus(data) {
  switch (data) {
    case 0: return '取消'
    case 1: return '未接收'
    case 2: return '传输中'
    case 3: return '已接收'
    case 4: return '测试中'
    case 5: return '测试完成'
    default:
      return data
  }
}

export function getAppType(data) {
  if (data === 1) {
    return 'WeTest'
  } else {
    return 'WeTest ST'
  }
}

// // 从字典中获取一级业务名渲染table内容
// export function getFirstTaskName(data) {
//   if (data === 1) {
//     return 'WeTest'
//   } else {
//     return 'WeTest ST'
//   }
// }
