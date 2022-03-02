const {Router} = require('express')
const {verifyToken} = require('./middleware/auth')

const route = Router()

route.get("/home", verifyToken ,getHomeData)

module.exports = route