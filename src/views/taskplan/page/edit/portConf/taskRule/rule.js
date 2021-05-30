/**
 * 测试任务表单规则
 * @param rule[{label:value[]}]
 */
import { basic } from './rules/basic'
import { fixedTimeSetting } from './rules/fixedTimeSetting'
// common rule
var ruleType = [
  {
    name: 'basic',
    rule: basic
  },
  {
    name: 'fixedTimeSetting',
    rule: fixedTimeSetting
  }
]

// 初始化
export const initTaskFormRule = (rules = ruleType) => {
  var key = 'TASK'
  rules.forEach(item => {
    console.log(item)
    localStorage.setItem(key + item.name, JSON.stringify(item.rule))
  })
}
