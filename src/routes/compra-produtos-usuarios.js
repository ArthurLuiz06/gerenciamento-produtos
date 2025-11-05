const express = require('express');
const router = express.Router();
const produtoUsuarioController = require('../controller/produtos-usuarios');

//  ROTA PARA PROCESSAR A COMPRA
router.post('/comprar', produtoUsuarioController.comprarProduto); 

module.exports = router;