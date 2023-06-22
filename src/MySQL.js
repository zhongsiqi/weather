import mysql from 'mysql'

var mysql_user = {
    host:'localhost',//主机地址（默认为：localhost）
    user:'root',//用户名
    password:'zsq123456',//密码
    database:'city'//数据库名
};

var connection = mysql.createConnection(mysql_user,{multipleStatements: true});//创建一个连接
//multipleStatements: true  此功能打开可同时使用多条  查询语句




module.exports = {
    connection //将此模块给暴露出去
};
