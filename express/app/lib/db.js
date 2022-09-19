const mysql = require('mysql2');
const connection = mysql.createConnection({
    host     : 'load-test-mysql',
    port     : 3306,
    user     : 'admin',
    password : 'admin-pass',
    database : 'load_test'
});
module.exports=connection