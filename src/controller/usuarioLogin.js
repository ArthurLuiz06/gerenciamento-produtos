const loginModel = require('../models/login-usuario')

exports.login = async (req, res) => {
    const {email, senha} = req.body;

    if(!email || !senha) {
        return res.status(400).json({erro: 'Preencha todos os campos.'})
    }

    try {
        const resultado = await loginModel.validarLogin(email, senha)

        if(resultado === null) {
            return res.status(404).json({erro: 'Usuario não encontrado.'})
        }

        if(resultado === false) {
           return res.status(401).json({erro: 'Senha incorreta.'})
        }

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            tipo: resultado.TIPO         
        })
            
    } catch(erro) {
        console.error('Erro no login:', erro)
        return res.status(500).json({erro: 'Erro interno no servidor'})
    }

}