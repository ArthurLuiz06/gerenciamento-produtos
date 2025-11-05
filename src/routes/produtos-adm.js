const express = require('express')
const router = express.Router();
const produtosAdmController = require('../controller/produtos-adm')

router.post('/admin/produtos', produtosAdmController.cadastrarProduto)

router.get('/admin/produtos/data', produtosAdmController.listarProdutosAdm)

module.exports = router;