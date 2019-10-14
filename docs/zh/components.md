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
