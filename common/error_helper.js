/**
* @Author: SplendourHui
* @Date:   2016-11-23 09:35
* @Last modified by:   SplendourHui
* @Last modified time: 2016-11-23 09:51
*/

'use strict';

class JsonError extends Error {
  constructor(msg, status) {
    super(msg);
    this.message = msg || 'server error';
    this.status = status || 500;
  }
}
exports.JsonError = JsonError;

class PageError extends Error {
  constructor(msg, status) {
    super(msg);
    this.message = msg || 'server error';
    this.status = status || 500;
  }
}
exports.PageError = PageError;
