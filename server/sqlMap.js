// sql語句
var sqlMap = {
    // 使用者
    user: {
        add: 'insert into user(id, name, age) values (0, ?, ?)'
    }
}

module.exports = sqlMap;