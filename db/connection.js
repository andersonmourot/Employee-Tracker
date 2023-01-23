const sql = require("mysql12");

const connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees'
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;