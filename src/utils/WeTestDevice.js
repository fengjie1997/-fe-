import { fetchGroupList } from '../api/monitored/monitored'

// 根据第三级groupId返回分组名
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

