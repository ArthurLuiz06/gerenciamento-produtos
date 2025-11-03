const conexao = require('../db/conexao')
const bcrypt = require('bcrypt');

const loginUsuarioModel = {
    async buscarPorEmail(email) {
        const sql = 'SELECT * FROM USUARIOS WHERE email = ?';
        const [rows] = await conexao.query(sql, [email]);
        return rows[0]; //Retorna o perimeiro usuário que achar
    },

    async validarLogin(email, senha) {
        const usuario = await this.buscarPorEmail(email);
        if(!usuario) return null; //Email não exite

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida) return false; // Senha incorreta

        return usuario; // tudo certo
    }
}


module.exports = loginUsuarioModel