const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const Router = require('koa-router');
const Data = require('./Data');

const data = new Data();

const app = new Koa();
const port = process.env.PORT || 9050;

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(async (ctx, next) => {
    const origin = ctx.request.get('Origin');
    if (!origin) {
      return await next();
    }
  
    const headers = { 'Access-Control-Allow-Origin': '*', };
  
    if (ctx.request.method !== 'OPTIONS') {
      ctx.response.set({ ...headers });
      try {
        return await next();
      } catch (e) {
        e.headers = { ...e.headers, ...headers };
        throw e;
      }
    }
  
    if (ctx.request.get('Access-Control-Request-Method')) {
      ctx.response.set({
        ...headers,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
      });
  
      if (ctx.request.get('Access-Control-Request-Headers')) {
        ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
      }
  
      ctx.response.status = 204;
    }
  });

const router = new Router();

router.get('/messages/unread', async (ctx) => {
    ctx.response.body = data.generate()
  });

app.use(router.routes()).use(router.allowedMethods());

const server = http.createServer(app.callback());
server.listen(port);
