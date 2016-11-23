/**
* @Author: SplendourHui
* @Date:   2016-11-23 09:35
* @Last modified by:   SplendourHui
* @Last modified time: 2016-11-23 10:33
*/

'use strict';

module.exports = (router) => {
  require('./apis')(router);
  require('./pages')(router);
};
