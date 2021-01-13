require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')

const app = new Koa()
const route = new Router()
const mongoose = require('mongoose')
const { connexionString } = require('./config/connect')
// const ro uting = require('./routes')
const port = process.env.PORT
const log = require('./middlewares/log')

mongoose.connect(connexionString)
// mongoose.connection.on('error', console.log.error)

app
  .use(cors())
  .use(bodyParser())
  .use(route.routes())
  .use(route.allowedMethods())
  .use(log)

app.listen(port, () => {
  console.log(`listening to ${port}`)
})