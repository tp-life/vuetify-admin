# admin

> 后台管理系统



### 基于 Vuetify

改后台基于 `vuetify` 进行开发，UI组件请访问 `vuetify` 官网进行查看



### 开发进度

目前为止该项目处于开发初始阶段，该项目主要基于用于实际运用项目，故很多开发方面都基于实际使用情况设置，并未照顾大部分场景。目前项目功能有：



* 1、权限管理。权限管理采用与后台同步管理方式，由前端与后台约定相关权限，前端根据登陆之后当前用户权限值就行动态管理。目前权限实现于：vue-router管控、菜单动态控制、视图操作按钮控制。
* 2、http请求封装。具体请看代码。基于`axios`
* 3、动态菜单。根据权限动态显示菜单
* 4、菜单标签缓存。
* 5、公共提示组件。
* 6、用户管理模块。



其他模块正在陆续进行当中。。。。。



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```





### 鸣谢

特别感谢 `[PanJiaChen](https://github.com/PanJiaChen)/**vue-element-admin**` 项目提供菜单标签缓存的灵感。