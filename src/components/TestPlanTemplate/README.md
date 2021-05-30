# 动态组件生成
动态组件生成主要是为了应付测试模板的动态需求，封装成动态生成组件，方便前端较为快速页面。
## 作者
  **Author：ccphamy**
## 界面绑定
数组，每一个元素为一行，span为每一个小块的大小，data代表每一个column的宽度，总共24
```js
[{
  span: 8,
  column: [{
    label: '设备类型',
    type: 'dict',
    dict: getCacheDict('deviceType'),
    model: 'model1'
  }, ...]
}, {
  span: 8,
  column: [...]
}]
```

## 类型字段
+ **普通文本**
  ```js
  {
    label: '啊实打实的',
    type: 'text',
    model: 'model2'
  }
  ```
+ **多行文本**
  ```js
  {
    label: '多行',
    type: 'textarea',
    model: 'textarea',
    autosize: { minRows: 2, maxRows: 4} // 可以设置为false 与 true
  }
  ```
+ **字典**
  ```js
    {
      label: '设备类型',
      type: 'dict',
      dict: getCacheDict('deviceType'),
      model: 'model1'
    }
  ```

+ **单选**
  ```js
  {
    label: '单选',
    type: 'radio',
    model: 'radio',
    value: 'asd',
    text: 'hahaha'
  }
  ```
+ **多选**，model对应的model数组中，需赋值 []
  ```js
  {
    label: '多选',
    type: 'check',
    model: 'check',
    value: 'sdfsdfsd',
    text: 'hahaha'
  }
  ``` 

+ **计数器**
  ```js
  {
    label: '计数器',
    type: 'number',
    model: 'number',
    max: 2,
    min: 1,
    text: '描述文字'
  }
  ```
  
 + **日期**
  ```js
  {
    label: '日期',
    type: 'date',
    model: 'date'
  }
  ```
 
 + ** 切换**
  ```js
  {
    type: 'switch',
    model: 'switch',
    activeText: '开 - 文字',
    inactiveText: '关 - 文字'
  }
  ```
## model

