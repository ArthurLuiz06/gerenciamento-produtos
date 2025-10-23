const usuario = require('../models/cadastro-usuario')

exports.cadastrar = (req, res) => {
    const {nome, email, senha} = req.body;

    if(!nome || !email || !senha) {
        return res.status(400).send('Prencha todos os campos obrigatórios')
    }

    const novoUsuario = {nome, email, senha}

    usuario.cadastrar(novoUsuario, (erro, resultado) => {
        if(erro) {
            console.log('Erro ao cadastrar usuário.')
            return res.status(500).send('Erro ao cadastrar usuário.')
        }
        res.status(201).send('Usuário cadastrado com sucesso!')
    })
}