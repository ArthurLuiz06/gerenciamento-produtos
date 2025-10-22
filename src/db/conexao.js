const mysql = require('mysql2/promise');

const conexao = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'SISTEMA_PRODUTOS'
});


module.exports = conexao