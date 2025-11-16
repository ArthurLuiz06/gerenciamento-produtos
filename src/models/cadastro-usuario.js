const conexao = require('../db/conexao.js');

const usuarioModel = {
  async cadastrar(usuario) {
    const sql = 'INSERT INTO USUARIO (NOME, EMAIL, SENHA) VALUES (?, ?, ?)';

    const senhaBuffer = Buffer.from(usuario.senha, 'utf8');
    await conexao.execute(sql, [usuario.nome, usuario.email, senhaBuffer]);
  }
};

module.exports = usuarioModel;
