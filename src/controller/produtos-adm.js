const produtosAdmModel = require('../models/produtos-adm')

exports.cadastrarProduto = async (req, res) => {
    // Define '' como padrão para campos opcionais
    const {
        nome,
        descricao = '', // Se undefined, use ''
        valor,
        quantidade,
        imagem_url = '' // Se undefined, use ''
    } = req.body;

    if (!nome || !valor || !quantidade) {
        return res.status(400).json({ erro: 'Nome, valor e quantidade são obrigatórios.' })
    }

    try {

        const produtoParaCadastrar = {
            nome: nome,
            // Converte '' (string vazia) para null, se o campo for opcional
            descricao: descricao.trim() === '' ? null : descricao,
            valor: valor,
            quantidade: quantidade,
            // Converte '' (string vazia) para null, se o campo for opcional
            imagem_url: imagem_url.trim() === '' ? null : imagem_url
        };

        await produtosAdmModel.cadastrar(produtoParaCadastrar);
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
    // 1. Captura o ID da URL (da rota: router.put('/admin/produtos/:idproduto'))
    const idproduto = req.params.idproduto;

    // 2. Captura os dados do corpo da requisição
    const {
        nome,
        descricao = '',
        valor,
        quantidade,
        imagem_url = ''
    } = req.body;

    // 3. Validação
    if (!nome || !valor || !quantidade) {
        return res.status(400).json({ erro: 'Nome, valor e quantidade são obrigatórios.' });
    }

    try {
        const produtoParaAtualizar = {
            nome: nome,
            descricao: descricao.trim() === '' ? null : descricao,
            valor: valor,
            quantidade: quantidade,
            imagem_url: imagem_url.trim() === '' ? null : imagem_url
        };

        // 4. Chama o Model, passando o ID e os dados
        const [resultado] = await produtosAdmModel.atualizar(idproduto, produtoParaAtualizar);

        // Verifica se o produto foi realmente atualizado (se afetou 1 linha)
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado para atualização.' });
        }

        res.status(200).json({ mensagem: 'Produto atualizado com sucesso!' });
    } catch (erro) {
        console.error('Erro ao atualizar produto:', erro);
        res.status(500).json({ erro: 'Erro interno ao atualizar o produto.' });
    }
};


exports.excluirProduto = async (req, res) => {
    // Captura o ID do produto da URL (definido na rota como :idproduto)
    const idproduto = req.params.idproduto;

    try {
        // Chamar a função 'excluir' do objeto produtoAdmModel
        const [resultado] = await produtosAdmModel.excluir(idproduto);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });
    } catch (erro) {
        console.error('Erro ao excluir produto:', erro);
        res.status(500).json({ erro: 'Erro interno do servidor.' });
    }

}

 exports.buscarProdutoPorId = async (req, res) => {
        const idproduto = req.params.idproduto;

        try {
            const produto = await produtosAdmModel.buscarPorID(idproduto);

            if(!produto) {
                return res.status(404).json({erro: 'Produto não encontrado.'})
            }

            //Sucesso, retorna o objeto do produto
            res.status(200).json(produto);
        } catch (erro) {
           console.error('Erro ao buscar o produto por ID', erro)
           req.status(500).json({erro: 'Erro interno ao buscar o produto.'})
        }
    }