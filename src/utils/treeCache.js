const KEY = 'CAHCHETREE-'

export function setLocalStorageTree(data) {
  for (var key in data) {
    localStorage.removeItem(KEY + key)
    localStorage.setItem(KEY + key, JSON.stringify(data[key]))
  }
}

export function getCacheTree(code) {
  return JSON.parse(localStorage.getItem(KEY + code))
}

