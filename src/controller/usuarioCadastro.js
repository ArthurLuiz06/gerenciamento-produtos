const usuarioModel = require('../models/cadastro-usuario');

exports.cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  try {
    
    await usuarioModel.cadastrar({
      nome,
      email,
      senha: senha // A senha é enviada em texto puro
    });

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (erro) {
    console.error('Erro ao cadastrar usuário:', erro);
    
    // Podemos verificar por erros de email duplicado aqui, mas manteremos o 500
    res.status(500).json({ erro: 'E-mail já existe.' });
  }
};