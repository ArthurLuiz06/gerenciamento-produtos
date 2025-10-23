const conexao = require('../db/conexao');
const bcrypt = require('bcrypt');

const usuarioCadastroModel = {
    async cadastrar(usuario) {
        const senhaCriptografada = await bcrypt.hash(usuario.senha, 10);
        const sql = 'INSERT INTO USUARIOS (nome, email, senha) VALUES (?,?,?)';
        const [result] = await conexao.query(sql, [
            usuario.nome,
            usuario.email,
            usuario.senha,
            senhaCriptografada
        ])
        return result;
    }
}

module.exports = usuarioCadastroModel;