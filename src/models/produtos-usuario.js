const conexao = require('../db/conexao');

const produtoUsuarioModel = {
    //listar produtos disponiveis
    async listarDisponiveis() {
        const sql = 'SELECT IDPRODUTO, NOME, DESCRICAO, VALOR, IMAGEM_URL FROM PRODUTOS';
        const [rows] = await conexao.query(sql);
        return rows;
    },

    // Comprar
    async diminuirEstoque(idproduto, quantidade) {
        const sql = 'UPDATE PRODUTOS SET QUANTIDADE = QUANTIDADE - ? WHERE IDPRODUTO = ? AND QUANTIDADE >= ?'
        return conexao.execute(sql, [quantidade, idproduto, quantidade]);
    }
}

module.exports = produtoUsuarioModel