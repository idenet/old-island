# weapp-books

本地代码修改成了上传小程序腾讯云测试的版本，修改后可用本地测试

## 踩坑

```
登录失败 Error: 获取微信用户信息失败，请检查网络状态
    at n.fail (login.js:26)
    at Object.fail (WAService.js:3)
    at Function.<anonymous> (WAService.js:4)
    at n.function.setTimeout (appservice:1162)
    at WAService.js:3
    at WAService.js:8
```

微信的 wx.getUserInfo 不再弹窗授权，得修改为 button 弹窗获取用户信息

```
<div>
   <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button>
<div>
```

water2-clinet-sdk 升级为 2.0，使用新的语法登录

### 下拉刷新

需要将函数放到 methods 外面
