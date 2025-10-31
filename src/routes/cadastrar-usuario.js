const express = require('express')
const router = express.Router()
const usuarioController = require('../controller/usuarioCadastro')

router.post('/cadastro',usuarioController.cadastrar);

module.exports = router