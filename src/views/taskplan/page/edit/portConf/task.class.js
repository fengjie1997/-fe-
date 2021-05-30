
/**
 * 任务规则生成类
 *
 */
import { taskFormRules } from './taskRule/index.js'
export default class BuildTask {
  constructor(op, x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')'
  }
  // 初始化表单规则

  // 构建
  getFormRule(name) {
    return taskFormRules[name]
  }
}
