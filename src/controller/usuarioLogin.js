const loginModel = require('../models/login-usuario')

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
    }

    try {
        const resultado = await loginModel.validarLogin(email, senha);
        console.log('Objeto do Usuário Retornado:', resultado);

        if (resultado === null) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        if (resultado === false) {
            return res.status(401).json({ erro: 'Senha incorreta.' });
        }

        const tipoUsuario = resultado.TIPO || resultado.tipo || 'usuario';

        //  CRIAR SESSÃO AQUI
        req.session.usuario = {
            id: resultado.ID || resultado.id,
            nome: resultado.NOME || resultado.nome,
            email: resultado.EMAIL || resultado.email,
        };

        req.session.tipo = tipoUsuario;

        console.log("Sessão criada:", req.session);

        return res.status(200).json({
            mensagem: 'Login realizado com sucesso!',
            tipo: tipoUsuario
        });

    } catch (erro) {
        console.error('Erro no login:', erro);
        return res.status(500).json({ erro: 'Erro interno no servidor' });
    }
}
