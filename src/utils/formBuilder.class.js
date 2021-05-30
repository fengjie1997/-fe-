
export class FormBuilder {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getFormRule() {
    return `${this.name}${this.age}岁了`
  }
}
