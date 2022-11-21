const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'rest-api-express-mysql'
});

module.exports = pool.promise()