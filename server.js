const http = require('http')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig)
const app = express()
const server = new http.Server(app)
const io = require('socket.io')(server)
const cityData = require('./src/cityData')
const phantom = require('phantom')
const port = 8080
let url = 'http://www.weather.com.cn/weather1d/'
let futureUrl = 'http://www.weather.com.cn/weather/'

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true
    }
}))
app.use(require('webpack-hot-middleware')(compiler))
app.use(express.static('dist'))

server.listen(port)

io.on('connection', socket => {
    socket.on('client', data => { // 查询当天天气
        console.log(data)
        let phInstance = null
        phantom.create()
            .then(instance => {
                phInstance = instance
                return instance.createPage()
            })
            .then(page => {
                page.open(url + cityData[data] + '.shtml').then(status => {
                    page.evaluate(function() {
                        const obj = {}
                        const re = /[\u4e00-\u9fa5]/g
                        const arry = ['ray', 'blood', 'cold', 'clothes', 'car', 'pollute']
                        obj.time = $('.sk .time').text()
                        obj.temp = $('.sk .tem').text()
                        obj.left = {
                            title: $('.t .clearfix li:first-child h1').text(),
                            temp: $('.t .clearfix li:first-child .tem span').text(),
                            status: $('.t .clearfix li:first-child .wea').text(),
                            time: $('.t .clearfix li:first-child .sun span').text().split(' ')
                        }
                        obj.right = {
                            title: $('.t .clearfix li:last-child h1').text(),
                            temp: $('.t .clearfix li:last-child .tem span').text(),
                            status: $('.t .clearfix li:last-child .wea').text(),
                            time: $('.t .clearfix li:last-child .sun span').text().split(' ')
                        }
                        obj.limit = $('.limit').text().trim()
                        const tempAqi = $(".pol a")
                        if (tempAqi.length) {
                            const str = tempAqi.text()
                            obj.aqi = {
                                num: parseFloat(str),
                                bgColor: tempAqi.css('color'),
                                text: str.match(re).join('')
                            }
                        } else {
                            obj.aqi = {
                                num: '',
                                bgColor: '',
                                text: ''
                            }
                        }              
                        obj.wind = $('.sk .w').text().replace('风', '风 ')
                        obj.humidity = $('.sk .h em').text()
                        $('.livezs li').each(function(i, e) {
                            obj[arry[i]] = {
                                title: $(e).find('span').text(),
                                text: $(e).find('p').text()
                            }
                        })
                        return obj
                    }).then(obj => {
                        if (obj) {
                            obj.serverTime = new Date().getHours()
                        }
                        socket.emit('server', obj)
                        phInstance.exit()
                    })
                })
            })
            .catch(error => {
                console.log(error)
                phInstance.exit()
            })
    }) 

    socket.on('futureClient', data => { // 查询未来6天天气
        let phInstance = null
        phantom.create()
            .then(instance => {
                phInstance = instance
                return instance.createPage()
            })
            .then(page => {
                page.open(futureUrl + cityData[data] + '.shtml').then(status => {
                    page.evaluate(function() {
                        const obj = []
                        $('.c7d .sky:nth-child(n+2)').each(function(i, e) {
                            const arry = []
                            $(e).find('.win span').each(function(j, ele) {
                                arry.push($(ele).attr('title')) 
                            }) 
                            obj.push({
                                bg: $(e).css('background'),
                                title: $(e).find('h1').text(),
                                status: $(e).find('.wea').text(),
                                temp: $(e).find('.tem').text().trim(),
                                wind: arry,
                                windLevel: $(e).find('.win i').text() 
                            })
                        })
                        return obj
                    }).then(obj => {
                        socket.emit('futureServer', obj)
                        phInstance.exit()
                    })
                })
            })
            .catch(error => {
                console.log(error)
                phInstance.exit()
            })
    }) 
})

console.log(`正在监听${port}端口`)