const conexao = require('../db/conexao')

const produtoAdmModel = {
    // Cadastrar produtos
    async cadastrar(produto) {
        const sql = 'INSERT INTO PRODUTOS (NOME, DESCRICAO, VALOR, QUANTIDADE, IMAGEM_URL) VALUES (?,?,?,?,?)';
        const params = [
            produto.nome,
            produto.descricao,
            produto.valor,
            produto.estoque,
            produto.imagem_url
        ];

        return conexao.execute(sql, params)
    },

    //Atualiza/ edita produto
    async atualizar(id, produto) {
        const sql = 'UPDATE PRODUTOS SET NOME=?, DESCRICAO=?, VALOR=?, QUANTIDADE=?, IMAGEM_URL=? WHERE IDPRODUTO=?'
        const params = [
            produto.nome,
            produto.descricao,
            produto.valor,
            produto.estoque,
            produto.imagem_url,
            id
        ];

        return conexao.execute(sql, params)
    },

    //Excluir produto
    async excluir (id) {
        const slq = 'DELETE FROM PRODUTOS WHERE IDPRODUTO = ?';
        return conexao.execute(slq, [id]);
    },

    //Listar produtos
    async listarProdutos () {
        const sql = 'SELECT * FROM PRODUTOS';
        const [rows] = await conexao.query(slq);
        return rows;
    }
}

module.exports = produtoAdmModel;