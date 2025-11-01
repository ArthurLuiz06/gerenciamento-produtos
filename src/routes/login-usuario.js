const express = require('express')
const router = express.Router()
const usuarioLogin = require('../controller/usuarioLogin')

router.post('/login',usuarioLogin.login)

module.exports = router