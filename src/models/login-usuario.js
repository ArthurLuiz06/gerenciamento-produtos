// Arquivo: model login (login-usuario.js)
const conexao = require('../db/conexao')

const loginUsuarioModel = {
    async buscarPorEmail(email) {
        const sql = 'SELECT * FROM USUARIOS WHERE email = ?';
        const [rows] = await conexao.query(sql, [email]);
        return rows[0];
    },

    async validarLogin(email, senha) {
        const usuario = await this.buscarPorEmail(email);
        
        if(!usuario) {
            return null; // Email não existe
        }
        const senhaSalva = String(usuario.SENHA).trim();
        const senhaDigitada = senha.trim();

        const senhaValida = (senhaDigitada === senhaSalva);
        
        if(!senhaValida) {
           return false; // Senha incorreta
        }

        return usuario; // tudo certo
    }
}

module.exports = loginUsuarioModel