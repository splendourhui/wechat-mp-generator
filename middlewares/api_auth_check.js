/**
* @Author: SplendourHui
* @Date:   2016-11-23 09:55
* @Last modified by:   SplendourHui
* @Last modified time: 2016-11-23 10:21
*/

'use strict';

const request = require('superagent');
const co = require('co');

const config = require('config');
const tools = require('../common/tools');
const constants = require('../common/constants');
const messageHelper = require('../common/message_helper');
const errorHelper = require('../common/error_helper');

module.exports = function*(next) {
  let ctx = this;
  let ip = ctx.req.headers['x-real-ip'] || getIp(ctx.request.ip);
  ctx.logger.log(`Request Ip: ${ip}`);

  let timestamp = ctx.query.timestamp;
  let authId = ctx.query.authId;
  let authorization = ctx.request.header.authorization;
  let path = ctx.request.path;

  if (!checkTimestamp(timestamp)) {
    throw new errorHelper.JsonError('no permission', constants.errCode.TIME_EXPIRED);
  } else if (!checkAuthorization(path, timestamp, authId, authorization, ctx)) {
    throw new errorHelper.JsonError('no permission', constants.errCode.AUTHORIZE_FAIL);
  } else {
    yield next;
  }
};

function getIp(ip) {
  if (ip.indexOf(':') !== -1) {
    return ip.substring(7, ip.length);
  }
  return ip;
}

function checkTimestamp(timestamp) {
  let requestTime = parseInt(timestamp);
  if (!requestTime) {
    return false;
  } else if (((new Date()).getTime() - requestTime) < (60 * 1000)) {
    return true;
  }
  return false;
}

function checkAuthorization(path, timestamp, authId, authorization, ctx) {
  ctx.logger.log(`path: ${path}`);
  ctx.logger.log(`timestamp: ${timestamp}`);
  ctx.logger.log(`authId: ${authId}`);
  ctx.logger.log(`authKey: ${config.authKey[authId]}`);
  ctx.logger.log(`authorization: ${authorization}`);
  ctx.logger.log(`correctKey: ${tools.getVerifyCode([path, timestamp, config.authKey[authId]])}`);
  if (!authId) {
    return false;
  }
  if (!authorization) {
    return false;
  }
  if (!config.authKey[authId]) {
    return false;
  }
  if (tools.getVerifyCode([path, timestamp, config.authKey[authId]]) === authorization) {
    return true;
  }
  return false;
}
