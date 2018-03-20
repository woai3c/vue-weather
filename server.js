const http = require('http')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const compiler = webpack(webpackConfig)
const app = express()
const server = new http.Server(app)
const io = require('socket.io')(server)
const cityData = require('./dist/cityData')
const phantom = require('phantom')
let url = 'http://www.weather.com.cn/weather1d/'

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true
    }
}))
app.use(require('webpack-hot-middleware')(compiler))
app.use(express.static('dist'))

server.listen(8080)

io.on('connection', socket => {
    socket.on('client', data => {
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
                            time: $('.sunUp span').text()
                        }
                        obj.night = {
                            temp: $('.t .clearfix li:last-child .tem span').text(),
                            status: $('.t .clearfix li:last-child .wea').text(),
                            time: $('.sunDown span').text()
                        }
                        obj.warn = $('.blue').text()
                        obj.wind = $('.sk .w').text()
                        obj.humidity = $('.sk .h em').text()
                        $('.livezs li').each(function(i, e) {
                            obj[arry[i]] = {
                                title: $(e).find('span').text(),
                                text: $(e).find('p').text()
                            }
                        })
                        return obj
                    }).then(function(obj){
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