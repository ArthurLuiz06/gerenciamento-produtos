const conexao = require('../db/conexao')

const produtoAdmModel = {
    // Cadastrar produtos
    async cadastrar(produto) {
        const sql = 'INSERT INTO PRODUTOS (NOME, DESCRICAO, VALOR, QUANTIDADE, IMAGEM_URL) VALUES (?,?,?,?,?)';
        const params = [
            produto.nome,
            produto.descricao,
            produto.valor,
            produto.quantidade,
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
            produto.quantidade,
            produto.imagem_url,
            id
        ];

        return conexao.execute(sql, params)
    },

    //Excluir produto
    async excluir (id) {
        const sql = 'DELETE FROM PRODUTOS WHERE IDPRODUTO = ?'; // 💡 CORREÇÃO: Variável SQL
        return conexao.execute(sql, [id]);
    },

    // Listar produtos (Mudei 'slq' para 'sql')
    async listarProdutos () {
        const sql = 'SELECT * FROM PRODUTOS';
        // 💡 CORREÇÃO: Usar a variável 'sql'
        const [rows] = await conexao.query(sql); 
        return rows;
    }
}


module.exports = produtoAdmModel;