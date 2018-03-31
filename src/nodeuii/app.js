import Koa from "koa";
import config from "./config";
import router from 'koa-simple-router';
import render from "koa-swig";
import co from 'co';
import serve from 'koa-static';
import controllerInit from './controllers/controllerInit';
import log4js from 'log4js';//非常优秀的库，即前端的专卖店，牌子
import errorHandler from "./middlewares/errorHandler";
const app = new Koa();

app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false 
    ext: 'html',
    varControls: ["[[", "]]"],
    writeBody: false
}));
// 生成错误日志，方便排错
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './log/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  });
const logger = log4js.getLogger('cheese');
// 错误处理，需要使用await next();的洋葱特性来进行管理
errorHandler.error(app, logger);
// 初始化模板
app.use(serve(config.staticDir));
// 初始化所有路由
controllerInit.getAllrouters(app, router);
// 绑定指定端口号，项目过多的时候，可以对端口好进行动态判断
app.listen(config.port, () => {
    console.log(`Server is running at http://0.0.0.0:${config.port}`);
});
module.exports = app;