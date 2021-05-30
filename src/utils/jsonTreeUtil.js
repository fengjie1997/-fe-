/**
 * Created by peihang.chen on 2019/03/10
 */

export function handleSearch(tree, value) {
  // 不满足搜索条件的待删除元素索引数组
  const removeArr = []
  // replace时正则匹配，全局匹配
  // eslint-disable-next-line no-eval
  const regExp = eval('/' + value + '/g')
  // 满足条件的字符串匹配为以下内容
  // let replaceStr = `${value}`
  const replaceStr = undefined
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    searchTree(node, i, value, removeArr, replaceStr, regExp)
  }
  // 遍历删除不满足条件的节点
  console.log('delete : ', removeArr)
  for (let j = removeArr.length - 1; j >= 0; j--) {
    tree.splice(removeArr[j], 1)
  }
  // 方法执行完成后tree只留下符合搜索条件的节点
}

/*
*递归搜索
 * @param {object} node 树的一个节点Node
 * @param {nameumber} index 当前节点的数组索引
 * @param {string} value 搜索内容
 * @param {array} removeArr 待删除的元素的索引数组
 * @param {string} replaceStr 搜索到匹配内容后替换项
 * @param {object} regExp  replace正则匹配表达式，作为参数传入，避免每次执行时重复创建对象
 */
export function searchTree(node, index, value, removeArr, replaceStr, regExp) {
  const children = node.children
  // 针对非叶子节点，需要递归其children节点
  if (children && children.length > 0) {
    const innderArr = []
    for (let i = 0; i < children.length; i++) {
      searchTree(children[i], i, value, innderArr, replaceStr, regExp)
    }
    // 如果当前节点不满足搜索条件，则对其children不满足条件的节点执行删除操作
    if (node.name.indexOf(value) === -1) {
      for (let j = innderArr.length - 1; j >= 0; j--) {
        children.splice(innderArr[j], 1)
      }

      /*
			*children节点删除结束后，如果children length为0，
			*并且当前节点也不满足搜索条件，则当前节点也加入删除数组
			*/
      if (node.children.length === 0) {
        removeArr.push(index)
      }
    } else {
      for (let j = innderArr.length - 1; j >= 0; j--) {
        children.splice(innderArr[j], 1)
      }
      // 当前节点非叶子节点，将满足条件内容做标记显示
      if (replaceStr !== undefined) {
        node.name = node.name.replace(regExp, replaceStr)
      }
    }
  } else {
    // 叶子节点，直接进行匹配
    if (node.name.indexOf(value) === -1) {
      removeArr.push(index)
    } else {
      // 将满足条件内容做标记显示
      if (replaceStr !== undefined) {
        node.name = node.name.replace(regExp, replaceStr)
      }
    }
  }
}
