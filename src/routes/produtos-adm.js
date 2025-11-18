const express = require('express');
const router = express.Router();
const produtosAdmController = require('../controller/produtos-adm.js')

router.post('/admin/produtos', produtosAdmController.cadastrarProduto)

router.get('/admin/produtos/data', produtosAdmController.listarProdutosAdm)

router.get('/admin/produtos/:idproduto', produtosAdmController.buscarProdutoPorId)

router.put('/admin/produtos/:idproduto', produtosAdmController.atualizarProdutos)

router.delete('/admin/produtos/:idproduto', produtosAdmController.excluirProduto)

router.post('/logout', (req, res) => {
    res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
});

module.exports = router;