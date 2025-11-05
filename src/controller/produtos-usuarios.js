const produtoUsuarioModel = require('../models/produtos-usuario');

exports.listarProdutosUsuarios = async (req, res) => {
      try {
        const produtos = await produtoUsuarioModel.listarDisponiveis();
        res.status(200).json(produtos);
      } catch (erro) {
        console.error('Erro ao listar produtos para usuário:',erro);
        res.status(500).json({erro: 'Erro interno ao listar produtos.'})
      }
}

exports.comprarProduto = async (req, res) => {

  const { idproduto, quantidade } = req.body; 

    // Validação básica
    if (!idproduto || !quantidade || quantidade <= 0) {
        return res.status(400).json({ erro: 'ID do produto e quantidade são obrigatórios.' });
    }

    try {
        // Chamada ao Model para diminuir o estoque
        const resultado = await produtoUsuarioModel.diminuirEstoque(idproduto, quantidade);
        
        // Verifica se alguma linha foi afetada (se a compra foi bem sucedida)
        if (resultado[0].affectedRows === 0) {
            return res.status(400).json({ erro: 'Produto indisponível ou quantidade insuficiente.' });
        }
        
        res.status(200).json({ mensagem: 'Compra realizada com sucesso!' });
    } catch (erro) {

      console.error('Erro ao processar a compra:', erro); 
        res.status(500).json({ erro: 'Erro interno ao processar a compra.' });
    }
}
