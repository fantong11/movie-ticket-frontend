var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 連線資料庫
var conn = mysql.createConnection(models.mysql);

conn.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("MySQL connected ~");
});

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失敗'
        });
    } else {
        res.json(ret);
    }
};

// 增加使用者介面
router.post('/addUser', (req, res) => {
    // 加入user的sql語法
    var sql = $sql.user.add;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.username, params.password], function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查詢使用者是否存在 回傳1, 0
router.post('/login', (req, res) => {
    var sql_name = $sql.user.select_name;
    var params = req.body;
    console.log(params);
    sql_name += "where name = '" + params.username + "'";
    conn.query(sql_name, params.username, (err, result) => {
        if (err) {
            console.log(err);
        }
        // 查詢結果沒東西回傳-1
        if (result[0] === undefined) {
            res.send("-1");
        }
        else {
            //
        }
    });
});

module.exports = router;