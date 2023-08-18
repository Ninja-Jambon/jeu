var mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE " + process.env.MYSQL_DATABASE, function (err, result) {
        if (err) {console.log(err); return;}
        console.log("Database created");
    });

    con.query("USE " + process.env.MYSQL_DATABASE, function (err, result) {
        if (err) {console.log(err); return;}
        console.log("Using database");
    });

    var sql = "drop table users, guilds;";

    con.query(sql, function (err, result) {
        if (err) {console.log(err); return;}
        console.log("Table dropped");
    });

    var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), userid VARCHAR(20), guildid VARCHAR(20), money INT, level INT, xp INT);";

    con.query(sql, function (err, result) {
        if (err) {console.log(err); return;}
        console.log("Table created");
    });

    var sql = "CREATE TABLE guilds (id INT AUTO_INCREMENT PRIMARY KEY, guildname VARCHAR(100), guildid VARCHAR(30), adminrole VARCHAR(30));";

    con.query(sql, function (err, result) {
        if (err) {console.log(err); return;}
        console.log("Table created");
    });
});