const bcrypt = require('bcrypt');
const usuarioModel = require('../models/cadastro-usuario');

exports.cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    
    await usuarioModel.cadastrar({
      nome,
      email,
      senha: senhaCriptografada
    });

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (erro) {
    console.error('Erro ao cadastrar usuário:', erro);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
};
