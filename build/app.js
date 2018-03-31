"use strict";

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _controllerInit = require("./controllers/controllerInit");

var _controllerInit2 = _interopRequireDefault(_controllerInit);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _errorHandler = require("./middlewares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//非常优秀的库，即前端的专卖店，牌子
const app = new _koa2.default();
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir,
  autoescape: true,
  cache: 'memory',
  // disable, set to false 
  ext: 'html',
  varControls: ["[[", "]]"],
  writeBody: false
})); // 生成错误日志，方便排错

_log4js2.default.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: './log/yd.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});

const logger = _log4js2.default.getLogger('cheese'); // 错误处理，需要使用await next();的洋葱特性来进行管理


_errorHandler2.default.error(app, logger); // 初始化模板


app.use((0, _koaStatic2.default)(_config2.default.staticDir)); // 初始化所有路由

_controllerInit2.default.getAllrouters(app, _koaSimpleRouter2.default); // 绑定指定端口号，项目过多的时候，可以对端口好进行动态判断


app.listen(_config2.default.port, () => {
  console.log(`Server is running at http://0.0.0.0:${_config2.default.port}`);
});
module.exports = app;