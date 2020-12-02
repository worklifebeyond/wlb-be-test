'use strict';

require('dotenv').config();
const cors = require('kcors');
const mongoose = require('mongoose');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const loadRoutes = require('./routes');
const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3002;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(result => {
    console.log('successfully connected to the database');
    app.listen(port, () => {
      console.log(`logs service running at http://localhost:${port}`);
    });
  })
  .catch(err => console.log(err));

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

loadRoutes(router);
