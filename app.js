require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('kcors')

const app = new Koa()
const route = new Router()
const routing = require('./routes')
const port = process.env.PORT

app
  .use(cors())
  .use(bodyParser())
  .use(route.routes())
  .use(route.allowedMethods())

  routing(route)

app.listen(port, () => {
  console.log(`listening to ${port}`)
})