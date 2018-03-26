# vue-weather
最近在学习vue、webpack 看完了vue和webpack的教程之后 决定结合vue webpack node写一个应用 最后选了天气网站<br>
由于市面上没有好的免费天气API 所以决定用爬虫来爬取数据 爬取网站为[中国天气网](http://www.weather.com.cn/)
这个应用涉及了以下几个知识点
* [es6](http://es6.ruanyifeng.com/)
* [vue](https://cn.vuejs.org/v2/guide/)
* [vue-router](https://router.vuejs.org/zh-cn/)
* [webpack](https://doc.webpack-china.org/)
* [phantom](https://github.com/amir20/phantomjs-node)
* [socket.io](https://www.npmjs.com/package/socket.io)
* [vue-socket.io](https://github.com/MetinSeylan/Vue-Socket.io)

爬虫最大的缺点就是慢 这个天气网站平均查询一次数据要5-10秒 有时候网络慢 我还试过爬了半分钟 毫无实用性 不过非常适合作为练习的项目<br>
这个项目涉及到的知识点虽然比较多 但是并不难 代码简单明了 只是逻辑有点绕 每个知识点上我都放了一个介绍该知识点的网站链接<br>

### 项目流程走向
```
npm run dev
```
1. 开启服务器 监听端口
2. 读取webpack配置文件 构建项目 开启热更新
3. 打开localhost:8080 访问网站
4. 服务器端socket.io和前台网站的vue-socket.io建立双向连接
5. 网站根据IP地址得到城市名 传送给服务器 服务器接收到城市名 开启爬虫爬取数据
```
this.$socket.emit('client', this.city)
```
6. 服务器将数据传到前台
```
socket.emit('server', obj)
```
7. 前台渲染
8. 用户点击查询未来6天天气 服务器接收到城市名 开启爬虫爬取数据
```
this.$socket.emit('futureClient', this.params.city)	
```
9. 服务器将数据传到前台
```
socket.emit('futureServer', obj)
```

#### 你可以把代码克隆到自己的电脑上执行
```
git clone https://github.com/woai3c/vue-weather.git
```
#### 下载依赖包
```
npm install
```
#### 运行项目
```
npm run dev
```
#### 访问网站
```
localhost:8080
```
