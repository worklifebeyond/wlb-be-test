'use strict';

require('dotenv').config();
const cors = require('kcors');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const loadRoutes = require('./routes');
const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3001;

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

loadRoutes(router);

app.listen(port, () => {
  console.log(`users service running at http://localhost:${port}`);
});
