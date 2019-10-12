# 介绍

### 快速开始

> 项目在 [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template/) 模版的基础上进行改造。

#### Build Setup

```bash
# 克隆项目
git clone https://github.com/Hb-zzZ/vue-template.git

# 进入项目目录
cd vue-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

#### 发布

```bash
# 构建测试环境
npm run build:stage

# 构建现代浏览器生产环境
npm run build

# 构建生产环境 (生产环境版本会构建传统浏览器和现代浏览器两个版本，代码包会大一些)
npm run build:prod
```

#### 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

### 目录结构

```
├── build                                 # 构建相关
├── docs                                  # 文档
├── mock                                  # 项目 mock 模拟数据
├── public                                # 静态资源
│   │── favicon.ico                       # favicon图标
│   └── index.html                        # html模板
├── src                                   # 源代码
│   ├── api   
│   │    │── index.js                     # 自动注册 modules 下所有请求
│   │    └── modules                      # 所有请求
│   ├── assets                            # 共用图片等静态资源
│   ├── components                        # 公用组件
│   │   │── _global                       # 放置全局注册组件
│   │   │── _regional                     # 放置需要手动引入组件
│   │   │── globalComponents.js           # 自动全局注册 _global 下组件
│   │   └── index.js                      # 自动导出 _regional 下组件
│   ├── icons                             # 项目所有 svg icons
│   ├── layout                            # 全局 layout
│   ├── router                            # 路由
│   ├── store                             # 全局 store 管理
│   ├── styles                            # 全局样式
│   ├── utils                             # 全局公用方法
│   │   │── filters.js                    # 全局过滤器
│   │   │── optimizeRequest.js            # 请求优化
│   │   │── request.js                    # 配置请求文件
│   │   └── support.js                    # 浏览器支持检测
│   ├── views                             # views 所有页面
│   ├── App.vue                           # 入口页面
│   ├── main.js                           # 入口文件 加载组件 初始化等
│   └── permission.js                     # 权限管理
├── theme                                 # element-ui 自定义theme
├── tests                                 # 测试
├── .env.xxx                              # 环境变量配置
├── .eslintrc.js                          # eslint 配置项
├── .babelrc                              # babel-loader 配置
├── .travis.yml                           # 自动化CI配置
├── .prettierrc.js                        # prettierrc 格式化配置
├── vue.config.js                         # vue-cli 配置
├── postcss.config.js                     # postcss 配置
└── package.json                          # package.json
```