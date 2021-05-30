
/**
 * 生成任务表单规则
 * @param Array op
 * @return Array array
 */

export const getFormCreateRule = op => {
  const rules = []
  op.forEach(item => {
    var basicRule = JSON.parse(localStorage.getItem(item))
    for (var i in basicRule) {
      rules.push(basicRule[i])
    }
  })
  return rules
}

