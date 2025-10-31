const usuario = require('../models/cadastro-usuario')

exports.cadastrar = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios.' });
  }

  const novoUsuario = { nome, email, senha };

  try {
    await usuario.cadastrar(novoUsuario);
    return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
    }
    console.error('Erro ao cadastrar usuário:', erro);
    return res.status(500).json({ erro: 'Erro interno ao cadastrar usuário.' });
  }
};
