const express = require('express')
const router = express.Router();
const produtoUsuarioController = require('../controller/produtos-usuarios')

router.get('/produtos/data', produtoUsuarioController.listarProdutosUsuarios)

module.exports = router