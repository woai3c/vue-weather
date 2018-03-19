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
let url = 'http://www.weather.com.cn/weather1dn/'
const arry = ['ray', 'blood', 'cold', 'clothes', 'car', 'wind']

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
        console.log(data)
        console.log(getData(data))
        
    })
});

async function getData(data) {
    const instance = await phantom.create();
  const page = await instance.createPage();

  const status = await page.open(url + cityData[data] + '.shtml');
  const html = await page.evaluate(function() {
    return document.getElementById('temp').innerHTML;
    })



  await instance.exit();
  return html
}