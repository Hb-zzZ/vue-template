# 权限菜单

> 权限菜单默认由后台控制，默认在获取用户信息接口时一起返回权限菜单相关信息，并在 @/utils/getAsyncRoutes 进行处理返回异步菜单。(处理完毕后，在菜单数组的最后记得加入 404，便于找不到路径时导向 404)

## 常用的权限菜单加载方式(1)

根据后台传入的用户类型进行加载对应的整个异步菜单。

```
例：后台传入的用户类型为 'admin'，在 @/router/modules 下有 asyncAdminRoutes.js(对应着admin的所有菜单)。
这时候在处理异步菜单时就可以有以下代码

import asyncAdminRoutes from @/router/modules/asyncAdminRoutes

const userType = 'admin'  // 后台传入的值

const asyncTable = {
    admin: asyncAdminRoutes,
    ...
}

asyncRoutes = [...asyncRoutes,...asyncTable[userType]]
```

---

## 常用的权限菜单加载方式(2)

需要更高的菜单精细度，可以自由组合当前用户的菜单。

```
例：后台传入显示菜单 xxx 和 zzz ，在 @/router/modules 下有 asyncRoutes.js(对应着每个菜单的路由信息)。
这时候在处理异步菜单时就可以有以下代码

import asyncRoutes from @/router/modules/asyncRoutes

const menuRoutes = ['xxx','zzz']  // 后台传入的值

asyncRoutes = [...asyncRoutes,...menuRoutes.map((code)=> asyncRoutes[code] )]
```

以上只是举例说明，还是需要根据实际场景。
