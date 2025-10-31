const conexao = require('../db/conexao');
const bcrypt = require('bcrypt');

const usuarioCadastroModel = {
    async cadastrar(usuario) {
  try {
    const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
    const sql = 'INSERT INTO USUARIOS (nome, email, senha) VALUES (?,?,?)';
    const [result] = await conexao.query(sql, [
      usuario.nome,
      usuario.email,
      senhaCriptografada
    ]);
    return result;
  } catch (erro) {
    throw erro;
  }
}

}

module.exports = usuarioCadastroModel;