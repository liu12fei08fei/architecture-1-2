"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
  "env": process.env.NODE_ENV //"development" 、"production"

};

if (false) {
  console.log(123);
} //开发环境下


if (process.env.NODE_ENV == "development") {
  const localConfig = {
    port: 8081
  };
  config = _lodash2.default.extend(config, localConfig); // console.log(config);//{ env: 'development', port: 8081 }
} //上线环境下


if (process.env.NODE_ENV == "production") {
  const proConfig = {
    port: 8081
  };
  config = _lodash2.default.extend(config, proConfig);
}

exports.default = config;