const express = require('express')
const router = express.Router();
const produtoUsuarioController = require('../controller/produtos-usuarios')

router.get('/produtos/data', produtoUsuarioController.listarProdutosUsuarios)

router.post('/comprar', produtoUsuarioController.comprarProduto)


module.exports = router