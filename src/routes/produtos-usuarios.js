const express = require('express')
const router = express.Router();
const produtoUsuarioController = require('../controller/produtos-usuarios')

router.get('/produtos/data', produtoUsuarioController.listarProdutosUsuarios)

router.post('/comprar', produtoUsuarioController.comprarProduto)

router.post('/logout', (req, res) => {
    res.status(200).json({ mensagem: 'Logout realizado com sucesso.' });
});

module.exports = router