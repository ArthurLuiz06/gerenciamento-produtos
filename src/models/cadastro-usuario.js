const conexao = require('../db/conexao.js');

const usuarioModel = {
  async cadastrar(usuario) {
    const sql = 'INSERT INTO USUARIOS (nome, email, senha) VALUES (?, ?, ?)';
    await conexao.query(sql, [usuario.nome, usuario.email, usuario.senha]);
  }
};

module.exports = usuarioModel;
