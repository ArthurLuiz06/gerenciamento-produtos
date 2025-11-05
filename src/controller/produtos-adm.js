const produtosAdmModel = require('../models/produtos-adm')

exports.cadastrarProduto = async (req, res) => {
    const { nome, descricao, valor, quantidade, imagem_url } = req.body;

    if (!nome || !valor || !quantidade) {
        return res.status(400).json({ erro: 'Nome, valor e quantidade são obrigatórios.' })
    }

    try {
        await produtosAdmModel.cadastrar({ nome, descricao, valor, quantidade, imagem_url });
        res.status(201).json({ mensagem: 'Produto cadastrado com sucesso.' })
    } catch (erro) {
        console.error('Erro ao cadastrar o produto:', erro)
        res.status(500).json({ erro: 'Erro interno ao cadastrar o produto' })
    }
};

exports.listarProdutosAdm = async (req, res) => {
    try {
        const produtos = await produtosAdmModel.listarProdutos()
        res.status(200).json(produtos)
    } catch (erro) {
        console.error('Erro ao listar produtos ADM', erro)
        res.status(500).json({ erro: 'Erro interno ao listar produtos' })
    }
};

exports.atualizarProdutos = async (req, res) => {
    try {
        const atualizar = await produtosAdmModel.atualizar()
        res.status(200).json(atualizar)
    } catch (erro) {
        console.error('Erro ao atualizar os produtos')
        res.status(500).json({ erro: 'Erro interno ao atualizar os produtos.' })
    }
};


exports.excluirProdutos = async (req, res) => {
    try {
        const excluir = await produtosAdmModel.excluir()
        res.status(201).json(excluir)
    } catch(erro) {
        console.error('Erro ao excluir o produto')
        res.status(500).json({erro: 'Erro interno ao excluir o produto'})
    }
}