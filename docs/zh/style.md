# 样式

### 目录

```
@/styles


├── styles
│   ├── element-ui.scss          # 全局自定义 element-ui 样式
│   ├── index.scss               # 全局通用样式
│   ├── mixin.scss               # 全局mixin
│   ├── sidebar.scss             # sidebar css
│   ├── transition.scss          # vue transition 动画
│   ├── need-load.scss           # 在里面引入的文件或者 css 在每一个scss下引入
│   ├── public.scss              # 公用样式(直接更改class起作用)
│   └── variables.scss           # 全局变量
```

---

### scss 自动引入

只要在 need-load.scss 文件下引入的文件或者存在 css，将会把这些在每一个 scss 中自动引入，所以在此文件中不要放置局部 css 或文件，引起冗余的 css 生成，一般放置 scss 不会被编译的变量以及@mixin 函数，这样每次编写其他 scss 就可以直接调用@mixin 函数和调用变量。

---

### 自定义 element-ui 样式

需要更改 element-ui 样式 ↓

#### 全局更改

如果更改的样式在多处通用，适用于全局更改，可以在 element 组件中增加一个自己特定的 class，然后再 element-ui.scss 文件中定义。

例：

```
.article-page {
  /* 你的命名空间 */
  .el-tag {
    /* element-ui 元素*/
    margin-right: 0px;
  }
}
```

#### 局部更改

如果更改的样式只有在这个文件下适用，应用范围小，适用于局部更改，可以使用[深度选择器]。

例：

```
.article-page {
  /* el-tag组件父级以上的元素并且最好为当前组件中的元素 */
  /deep/ .el-tag {
    /* element-ui 元素*/
    margin-right: 0px;
  }
}
```

---

### 增加 class 名直接获得样式

#### 用法

有时候一个 div 只需要宽度 100% 的样式，又不想专门取个 class 名时，可使用 public.scss 中的 w-full class 名即可。

例：

```
<div class="w-full"/>
```

#### 函数介绍

create-font-size // 生成常用字体大小

create-custom-css // 生成自定义样式

create-common-css // 生成常用样式 该方法内命名建议严格参照 [tailwindcss](https://tailwindcss.com/docs/display)
