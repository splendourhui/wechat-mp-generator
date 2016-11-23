/**
* @Author: SplendourHui
* @Date:   2016-11-23 09:35
* @Last modified by:   SplendourHui
* @Last modified time: 2016-11-23 09:51
*/

'use strict';

const Sequelize = require('sequelize');
const dbConfig = require('config').get('db');

module.exports = new Sequelize(dbConfig.dbName,
  dbConfig.username,
  dbConfig.password, {
    host: dbConfig.dbUrl,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    pool: {
      max: dbConfig.pool.maxConnections,
      min: dbConfig.pool.minConnection
    },
    define: {
      timestamps: false
    }
  }
);
