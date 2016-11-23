/**
* @Author: SplendourHui
* @Date:   2016-11-23 09:35
* @Last modified by:   SplendourHui
* @Last modified time: 2016-11-23 09:53
*/

'use strict';

const ctrl = require('./controller');

module.exports = (router) => {
  router.get('/', ctrl.index);
};
