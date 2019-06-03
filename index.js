const Koa = require('koa');
const config = require('./config/default.js');
const router = require('koa-router')
// const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa()
// app.use(cors());
app.use(bodyParser({
  formLimit: '1mb'
}))
app.use(require('./routers/signup.js').routes())
app.listen(config.port)