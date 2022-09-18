const mysql = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : 33061,
    user     : 'admin',
    password : 'admin-pass',
    database : 'load_test'
});
module.exports=connection