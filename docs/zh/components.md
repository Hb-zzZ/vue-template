# 组件

### 目录

```
components                         # 公用组件
 │── _global                       # 全局注册组件
 │    │── CreateForm               # 表单生成器
 │    │── ElCustomDialog           # 定制弹窗组件
 │    │── ElCustomPagination       # 定制页码组件
 │    │── IconTitle                # 带 icon 的标题
 │    │── ReconfirmButton          # 二次确认按钮
 │    │── Search                   # 搜索框
 │    │── TableWithPagination      # 表格附带页码
 │    └── Upload                   # 上传组件
 │── _regional                     # 需要手动引入组件
 │    │── Breadcrumb               # 面包屑
 │    │── CheapStep                # 自制步骤条
 │    │── ElCustomTooltip          # 定制提示组件
 │    │── Hamburger                # 汉堡包
 │    │── ImageVerification        # 图片验证码
 │    └── MobileCodeButton         # 手机获取验证码按钮
 │── ElCustomTable.js              # 定制 el-table 组件
 │── SvgIcon.js                    # svg-icon 组件
 │── globalComponents.js           # 自动全局注册 _global 下组件
 └── index.js                      # 自动导出 _regional 下组件
```

---

### CheapStep

#### Steps Attributes

| 参数   | 说明             | 类型   | 可选值 | 默认值 |
| :----- | :--------------- | :----- | :----- | :----- |
| active | 设置当前激活步骤 | number | —      | —      |

#### Steps Slot

| name | 说明     |
| :--- | :------- |
| —    | 步骤内容 |

---

### ElCustomTooltip

#### Attributes

| 参数      | 说明               | 类型   | 可选值                                                                                                    | 默认值 |
| :-------- | :----------------- | :----- | :-------------------------------------------------------------------------------------------------------- | :----- |
| content   | Tooltip 的内容     | String | —                                                                                                         | —      |
| placement | Tooltip 的出现位置 | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | right  |

#### Slot

| name | 说明         |
| :--- | :----------- |
| —    | 正常显示内容 |

---

### ImageVerification

#### Attributes

| 参数    | 说明   | 类型   | 可选值 | 默认值 |
| :------ | :----- | :----- | :----- | :----- |
| v-model | 绑定值 | String | —      | —      |

#### Event

| 事件名称 | 说明             | 回调参数         |
| :------- | :--------------- | :--------------- |
| change   | 随机码更新时触发 | (value: string ) |

---

### GetCodeButton

#### Attributes

| 参数      | 说明                                                                 | 类型    | 可选值 | 默认值 |
| :-------- | :------------------------------------------------------------------- | :------ | :----- | :----- |
| disabled  | 是否可获取 code，必须绑定.sync                                       | Boolean | —      | —      |
| isMemory  | 是否记忆上一次倒计时剩余时间                                         | Boolean | —      | true   |
| codeKey   | isMemory 为 true 时，必须填入并且要保证刷新页面 codeKey 和上一次一致 | String  | —      | false  |
| initCount | 获取 code 间隔，1 代表一秒,必须填入正整数                            | Number  | —      | 60     |

#### Event

| 事件名称 | 说明                                                                             | 回调参数 |
| :------- | :------------------------------------------------------------------------------- | :------- |
| getCode  | 点击获取 code 按钮时触发，事件处理完毕后，可操作属性值[disabled]更改按钮状态 | -        |

---
