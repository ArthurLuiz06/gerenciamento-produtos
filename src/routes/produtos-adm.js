const express = require('express');
const router = express.Router();
const produtosAdmController = require('../controller/produtos-adm.js')
const {verificarPermissaoAdmin} = require('../utils/segurança_admin.js')

router.post('/admin/produtos',verificarPermissaoAdmin, produtosAdmController.cadastrarProduto)

router.get('/admin/produtos/:idproduto',verificarPermissaoAdmin, produtosAdmController.buscarProdutoPorId)

router.put('/admin/produtos/:idproduto',verificarPermissaoAdmin, produtosAdmController.atualizarProdutos)

router.delete('/admin/produtos/:idproduto',verificarPermissaoAdmin, produtosAdmController.excluirProduto)

module.exports = router;