// Arquivo: model login (login-usuario.js)
const conexao = require('../db/conexao')

const loginUsuarioModel = {
    async buscarPorEmail(email) {
        const sql = 'SELECT * FROM USUARIOS WHERE email = ?';
        const [rows] = await conexao.query(sql, [email]);
        return rows[0]; // Retorna o objeto do usuário ou undefined
    },

    async validarLogin(email, senha) {
        const usuario = await this.buscarPorEmail(email);
        
        // 1. Não encontrou o usuário
        if(!usuario) {
            return null;
        }

        // 2. Proteção contra valores nulos/undefined (CRÍTICO)
        // Garante que usuario.SENHA seja tratada como string vazia se for NULL
        const senhaSalva = String(usuario.SENHA ?? '').trim(); 
        const senhaDigitada = senha.trim();

        // 3. Verifica a senha
        if(senhaDigitada === senhaSalva) {
            return usuario; // Login OK: retorna o objeto completo
        } else {
            return false; // Senha incorreta
        }
    }
}

module.exports = loginUsuarioModel