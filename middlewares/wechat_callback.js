/**
* @Author: SplendourHui
* @Date:   2016-11-23 09:55
* @Last modified by:   SplendourHui
* @Last modified time: 2016-11-23 10:54
*/

const request = require('superagent');
const wechat = require('co-wechat');
const getRawBody = require('raw-body');
const config = require('config');

module.exports = wechat(config.get('wechatConfigs').token).middleware(function*(next) {
  const ctx = this;
  const message = ctx.weixin;
  const openid = message.FromUserName;
  ctx.logger.log(`【Origin XML】
${ctx.weixin_xml.toString()}`);
  ctx.logger.log(`【Decode Message】
${JSON.stringify(message)}`);

  switch (message.MsgType) {
    case 'event':
    case 'text':
    default:
      ctx.body = '';
      break;
  }
});
