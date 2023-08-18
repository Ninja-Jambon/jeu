var mysql = require('mysql');
require('dotenv').config();

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

function registerUser(username, userid, guildid) {
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO users (username, userid, guildid, money, level, xp) VALUES ("${username}", "${userid}", "${guildid}", 0, 1, 0)`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function registerGuild(guildname, guildid, adminrole) {
    return new Promise((resolve, reject) => {
        con.query(`INSERT INTO guilds (guildname, guildid, adminrole) VALUES ("${guildname}", "${guildid}", "${adminrole}")`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function getUser(userid, guildid) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users WHERE userid = "${userid}" AND guildid = "${guildid}"`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function getGuild(guildid) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM guilds WHERE guildid = "${guildid}"`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function setAdminRole(guildid, adminrole) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE guilds SET adminrole = "${adminrole}" WHERE guildid = "${guildid}"`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function addMoney(userid, money) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET money = money + ${money} WHERE userid = "${userid}"`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function addLevel(userid, level) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET level = level + ${level} WHERE userid = "${userid}"`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function addXP(userid, xp) {
    return new Promise((resolve, reject) => {
        con.query(`UPDATE users SET xp = xp + ${xp} WHERE userid = "${userid}"`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function getTopMoney(guildid) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users WHERE guildid = "${guildid}" ORDER BY money DESC LIMIT 10`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

function getTopLevel(guildid) {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM users WHERE guildid = "${guildid}" ORDER BY level DESC LIMIT 10`, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = { registerUser, registerGuild, getUser, getGuild, setAdminRole, addMoney, addLevel, getTopLevel, getTopMoney, addXP };