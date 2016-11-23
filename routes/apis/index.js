/**
* @Author: SplendourHui
* @Date:   2016-11-23 09:54
* @Last modified by:   SplendourHui
* @Last modified time: 2016-11-23 10:27
*/

'use strict';

const ctrl = require('./controller');
const apiAuthCheck = require('../../middlewares/api_auth_check');
const wechatCallback = require('../../middlewares/wechat_callback');

module.exports = (router) => {
  router.get('/apis/wechat-callback', wechatCallback);
  router.post('/apis/wechat-callback', wechatCallback);
};
