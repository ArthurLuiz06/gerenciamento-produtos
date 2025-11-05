const express = require('express');
const router = express.Router();
const produtosAdmController = require('../controller/produtos-adm')

router.post('/admin/produtos', produtosAdmController.cadastrarProduto)

router.get('/admin/produtos/data', produtosAdmController.listarProdutosAdm)

router.delete('/admin/produtos/:idproduto', produtosAdmController.excluirProduto)

module.exports = router;