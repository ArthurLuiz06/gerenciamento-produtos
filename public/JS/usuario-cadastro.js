const form = document.getElementById('formCadastro');
const msg = document.getElementById('mensagem');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const resposta = await fetch('/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    const data = await resposta.json();

    if (resposta.ok) {
      msg.style.color = 'green';
      msg.textContent = data.mensagem;
      form.reset();
    } else {
      msg.style.color = 'red';
      msg.textContent = data.erro || 'Erro ao cadastrar.';
    }
  } catch (erro) {
    msg.style.color = 'red';
    msg.textContent = 'Falha de conexão com o servidor.';
    console.error('Erro na requisição:', erro);
  }
});

