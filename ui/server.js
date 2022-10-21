require('dotenv').config()
var proxy = require('express-http-proxy')
var express = require('express')
var path = require('path')

const BUILD_DIR = path.join(__dirname, 'build')
const PORT = process.env.REACT_APP_PORT
const API_URL = process.env.REACT_APP_API_URL

var app = express()

//setup proxy
console.log(`setup api proxy: /api -> ${API_URL}`)
app.use('/api', proxy(API_URL))

//Serve files in the build folder
app.use(express.static(BUILD_DIR))

//Send index.html to the user
app.get('*', function (req, res) {
    res.sendFile(path.join(BUILD_DIR, 'index.html'))
})

app.listen(PORT, () => console.log(`PROD APP STARTED ON PORT ${PORT}`))
