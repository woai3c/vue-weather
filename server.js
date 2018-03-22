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
    socket.on('client', data => {
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
                        const arry = ['ray', 'blood', 'cold', 'clothes', 'car', 'pollute']
                        obj.time = $('.sk .time').text()
                        obj.temp = $('.sk .tem').text()
                        obj.day = {
                            temp: $('.t .clearfix li:first-child .tem span').text(),
                            status: $('.t .clearfix li:first-child .wea').text(),
                            time: $('.sunUp span').text().split(' ')[1]
                        }
                        obj.night = {
                            temp: $('.t .clearfix li:last-child .tem span').text(),
                            status: $('.t .clearfix li:last-child .wea').text(),
                            time: $('.sunDown span').text().split(' ')[1]
                        }
                        obj.warn = $('.blue').text()
                        obj.wind = $('.sk .w').text().replace('风', '风 ')
                        obj.humidity = $('.sk .h em').text()
                        $('.livezs li').each(function(i, e) {
                            obj[arry[i]] = {
                                title: $(e).find('span').text(),
                                text: $(e).find('p').text()
                            }
                        })
                        return obj
                    }).then(function(obj){
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
})

console.log(`正在监听${port}端口`)