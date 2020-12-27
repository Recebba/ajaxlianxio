//引入mysql
const mysql = require('mysql');
//创建连接池对象
const pool = mysql.createPool({
    // host: '127.0.0.1',
    // port: '3306',
    // user: 'root',
    // password: '',
    // database: 'xz',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.ACCESSKEY,
    password: process.env.SECRETKEY,
    database: 'app_' + process.env.APPNAME,

    connectionLimit: 5
});
//导出连接池
module.exports = pool;