import Koa from "koa";
import config from "./config";
import log4js from 'log4js';
import errorHandler from "./middlewares/errorHandler";
const app = new Koa();
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  });
const logger = log4js.getLogger('cheese');
errorHandler.error(app,logger);
// console.log(app, logger);
app.listen(config.port, () => {
    console.log(`Server is running at http://0.0.0.0${config.port}`);
});
