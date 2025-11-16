const mysql = require('mysql2/promise');

const conexao = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'sistema_produto',
    charset: 'utf8mb4' 
});

module.exports = conexao