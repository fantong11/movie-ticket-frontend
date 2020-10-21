// sql語句
var sqlMap = {
    // 使用者
    user: {
        add: "insert into user(name, password) values (?, ?)",
        select_name: "select * from user "
    }
}

module.exports = sqlMap;